<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\LineBotService as LINEBot;
use LINE\LINEBot\HTTPClient\CurlHTTPClient;

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
                        $response = $bot->replyText($event['replyToken'], '画像を受け取ったよ');
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
