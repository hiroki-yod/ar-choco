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

    public function message(Request $request) {
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
                        $response = $bot->replyText($event['replyToken'], 'まだ文章でARの生成はできないよ！！！ゴメンね！！！！');
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
                            "https://chart.apis.google.com/chart?chs=500x500&cht=qr&chl=https://4971-2400-2411-13e1-8700-a550-ab18-cc19-b936.jp.ngrok.io/valentine/{$letter->id}",
                            "https://chart.apis.google.com/chart?chs=240x240&cht=qr&chl=https://4971-2400-2411-13e1-8700-a550-ab18-cc19-b936.jp.ngrok.io/valentine/{$letter->id}"
                        ));
                        $messageBuilder->add(new TextMessageBuilder('マーカーとQRコードを印刷してチョコレートに貼ってね！'.PHP_EOL.'明治のチョコレートでARを出現させたい場合はこのURLを相手に送ってね！'.PHP_EOL."https://6010-2400-2411-13e1-8700-a550-ab18-cc19-b936.jp.ngrok.io/valentine/{$letter->id}".PHP_EOL.'このURLを読み取るとカメラが起動するよ！'));
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
