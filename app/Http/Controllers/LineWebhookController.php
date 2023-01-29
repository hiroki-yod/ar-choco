<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;
use App\Models\Letter;

use Cloudinary;

use App\Services\LineBotService as LINEBot;
use LINE\LINEBot\HTTPClient\CurlHTTPClient;
use LINE\LINEBot\MessageBuilder\ImageMessageBuilder;
use LINE\LINEBot\MessageBuilder\MultiMessageBuilder;
use LINE\LINEBot\MessageBuilder\TextMessageBuilder;

class LineWebhookController extends Controller
{
    public function message2(Request $request) {
        $data = $request->all();
        $events = $data['events'];

        $httpClient = new CurlHTTPClient(config('services.line.message.channel_token'));
        $bot = new LINEBot($httpClient, ['channelSecret' => config('services.line.message.channel_secret')]);

        foreach ($events as $event) {
            $response = $bot->replyText($event['replyToken'], 'メッセージ送信完了');
        }
        return;
    }

    public function message(Request $request, Letter $letter) {
        $data = $request->all();
        $events = $data['events'];

        $httpClient = new CurlHTTPClient(config('services.line.message.channel_token'));
        $bot = new LINEBot($httpClient, ['channelSecret' => config('services.line.message.channel_secret')]);

        foreach ($events as $event) {
            switch ($event['message']['type']) {
                case 'text':
                    $t =  $event['message']['text'];
                    if($t === '画像でARを生成'){
                        $response = $bot->replyText($event['replyToken'], '画像を送信してください！'.PHP_EOL.'すると、ARを読み取るためのマーカーや、読み取ることでカメラが起動するQRコードが発行されます。');
                    } elseif ($t === '文章でARを生成') {
                        $response = $bot->replyText($event['replyToken'], 'ARレターに載せたい文章を送信してください！'.PHP_EOL.'すると、ARを読み取るためのマーカーや、読み取ることでカメラが起動するQRコードが発行されます。');
                    } else {
                        $lettere_instance = new Letter;
                        $input_letter = $request->all();
                        $create_letter = $lettere_instance->createLetterForLine($t);
                        $letter = $lettere_instance->storeImage(($create_letter));
                        $lettere_instance->createQRcode($letter);

                        $messageBuilder = new MultiMessageBuilder();
                        $messageBuilder->add(new ImageMessageBuilder(
                            asset('pattern-ar.png'),
                            asset('pattern-ar.png')
                        ));
                        $messageBuilder->add(new ImageMessageBuilder(
                            "https://chart.apis.google.com/chart?chs=500x500&cht=qr&chl=https://hiroki-yod.com/valentine/{$letter->id}",
                            "https://chart.apis.google.com/chart?chs=240x240&cht=qr&chl=https://hiroki-yod.com/valentine/{$letter->id}"
                        ));
                        $messageBuilder->add(new TextMessageBuilder('マーカーとQRコードを発行したよ！手作りのチョコを渡したい場合は↑の画像を印刷してチョコに貼ってね♪'.PHP_EOL.'lineギフトでアーモンドチョコを相手に贈りたい場合は、相手にギフトを送った後、以下のメッセージを転送してね！'));
                        $messageBuilder->add(new TextMessageBuilder('プレゼント🎁'.PHP_EOL.'下のURLにアクセスしてカメラを起動してね！そのカメラで明治アーモンドチョコを見ると良いことがあるかも!?!?'.PHP_EOL."https://hiroki-yod.com/valentine/{$letter->id}"));
                        // $response = $bot->replyText($event['replyToken'], '画像を受け取ったよ');
                        $bot->replyMessage($event['replyToken'], $messageBuilder);
                    }
                    break;

                case 'image':
                    $response = $bot->getMessageContent($event['message']['id']);
                    if ($response->isSucceeded()) {

                        //画像をstorageに保存
                        $contentType = $response->getHeader('content-type');
                        $arrayContentType = explode('/', $contentType);
                        $ext = end($arrayContentType);
                        $path = 'public/line/' .$event['message']['id'] .'.' .$ext;
                        Storage::put($path, $response->getRawBody());

                        //cloudinaryに保存
                        $image_url = Cloudinary::upload(public_path(Storage::url($path)))->getSecurePath();

                        //DBに保存
                        $letter = Letter::create([
                            "id" => str()->uuid(),
                            "image_url" => $image_url
                        ]);

                        //ローカルに保存したファイルを削除
                        Storage::delete($path);

                        $messageBuilder = new MultiMessageBuilder();
                        $messageBuilder->add(new ImageMessageBuilder(
                            asset('pattern-ar.png'),
                            asset('pattern-ar.png')
                        ));
                        $messageBuilder->add(new ImageMessageBuilder(
                            "https://chart.apis.google.com/chart?chs=500x500&cht=qr&chl=https://hiroki-yod.com/valentine/{$letter->id}",
                            "https://chart.apis.google.com/chart?chs=240x240&cht=qr&chl=https://hiroki-yod.com/valentine/{$letter->id}"
                        ));
                        $messageBuilder->add(new TextMessageBuilder('マーカーとQRコードを発行したよ！手作りのチョコを渡したい場合は↑の画像を印刷してチョコに貼ってね♪'.PHP_EOL.'lineギフトでアーモンドチョコを相手に贈りたい場合は、相手にギフトを送った後、以下のメッセージを転送してね！'));
                        $messageBuilder->add(new TextMessageBuilder('プレゼント🎁'.PHP_EOL.'下のURLにアクセスしてカメラを起動してね！そのカメラで明治アーモンドチョコを見ると良いことがあるかも!?!?'.PHP_EOL."https://hiroki-yod.com/valentine/{$letter->id}"));
                        // $response = $bot->replyText($event['replyToken'], '画像を受け取ったよ');
                        $bot->replyMessage($event['replyToken'], $messageBuilder);
                    } else {
                        error_log($response->getHTTPStatus());
                    }
                    break;

                case 'sticker':
                    // スタンプが送信された場合
                    break;
            }
        }
        return;
    }
}
