<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\LineBotService as LINEBot;
use LINE\LINEBot\HTTPClient\CurlHTTPClient;
use LINE\LINEBot\MessageBuilder\ImageMessageBuilder;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Cloudinary;
use Illuminate\Support\Facades\Storage;
use App\Models\Image;

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
                    $response = $bot->replyText($event['replyToken'], 'メッセージ送信完了');
                    break;

                case 'image':
                    $response = $bot->getMessageContent($event['message']['id']);
                    if ($response->isSucceeded()) {
                        $contentType = $response->getHeader('content-type');
                        $arrayContentType = explode('/', $contentType);
                        $ext = end($arrayContentType);

                        $contentType = $response->getHeader('content-type');
                        $arrayContentType = explode('/', $contentType);
                        $ext = end($arrayContentType);
                        $path = 'public/line/' .$event['message']['id'] .'.' .$ext;
                        Storage::put($path, $response->getRawBody());
                        Storage::url($path);

                        $image_url = Cloudinary::upload(url(Storage::url($path)))->getSecurePath();
                        // $image = Image::create([
                        //     "id" => str()->uuid(),
                        //     "image_url" => $image_url
                        // ]);
                        // $qr = QrCode::format('png')->size(300)->generate("https://ar-choco.herokuapp.com/valentine/".strval($image->id), '../public/QR/' . strval($image->id) . '.png');

                        $replying_message = new ImageMessageBuilder(
                            'https://chart.apis.google.com/chart?chs=500x500&cht=qr&chl=https://a452-125-102-201-146.jp.ngrok.io/storage/line/17535944173884.jpeg',
                            'https://chart.apis.google.com/chart?chs=240x240&cht=qr&chl=https://a452-125-102-201-146.jp.ngrok.io/storage/line/17535944173884.jpeg'
                        );
                        // $response = $bot->replyText($event['replyToken'], '画像を受け取ったよ');
                        $bot->replyMessage($event['replyToken'], $replying_message);
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
