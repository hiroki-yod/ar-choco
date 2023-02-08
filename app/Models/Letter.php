<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

use Cloudinary;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Ramsey\Uuid\Uuid;
use Intervention\Image\Facades\Image;

class Letter extends Model
{
    use HasFactory;
    use HasUuids;

    protected $fillable = [
        "id",
        "image_url"
    ];

    public function storeImage($request_image)
    {
        $image_url = Cloudinary::upload($request_image)->getSecurePath();
        $image = Letter::create([
            "id" => str()->uuid(),
            "image_url" => $image_url
        ]);
        if(is_file($request_image)){
            unlink($request_image);
        }
        return $image;
    }

    public function createQRcode($image)
    {
        QrCode::generate("https://afa7-125-102-201-146.jp.ngrok.io/valentine/".strval($image->id), '../public/QR/' . strval($image->id) . '.svg');
    }

    public function getBodyArray($width, $input_body)
    {
        $result = [];
        $oneline = "";
        $cnt = 0;
        $new_line = [PHP_EOL, "\n", "\r"];
        $prev_char = "";
        foreach($this->mb_wordwrap($input_body, 1) as $char) {
            if (in_array($char, $new_line) || ($cnt >= $width && !($char == "、" || $char == "。"))) {
                if ($char == "\n" && $prev_char == "\r") {
                    $prev_char = $char;
                    continue;
                }
                $result[] = $oneline;
                $oneline = "";
                $cnt = 0;
                $prev_char = $char;
                if (in_array($char, $new_line)) {
                    continue;
                }
            }
            $oneline = $oneline . $char;
            $cnt += 1;
        }
        if ($cnt != 0) $result[] = $oneline;
        return $result;
    }

    public function mb_wordwrap( $str, $width=35, $encode="UTF-8")
    {
        $c = mb_strlen($str, $encode);
        $arr = [];
        for ($i=0; $i<=$c; $i+=$width) {
            $arr[] = mb_substr($str, $i, $width, $encode);
        }
        return $arr;
    }

    public function createLetter($input_letter)
    {
        // テンプレートを取得
        // $template_path = public_path('images/letter.png');
        $template_path = $input_letter["template"];
        $letter = Image::make($template_path);
        // フォント、色などを設定
        $fonts = ['font/mogihaPen.ttf', 'font/beautiful_font.ttf', 'font/shokakisarari.ttf', 'font/acgyosyo.ttf'];
        $font_path = public_path($fonts[array_rand($fonts, 1)]);
        $colors = ['#000000', '#281a14', '#0d0015', '#16160e', '#333631', '#250d00'];
        $color = $colors[array_rand($colors,1)];
        if($template_path=='images/letter_template/chocolate.png'){
            $color = '#ffffff';
        }

        // 本文を取得
        $body = $this->getBodyArray(15, $input_letter["body"]);
        $x = 90;
        // 画像と合成
        for($i = 0; $i < count($body); $i++) {
            $y = 180 + $i * 50;
            $word = $body[$i];
            $letter->text($word, $x, $y, function($font) use ($font_path, $color){
                $font->file($font_path); // 日本語フォントファイル
                $font->size(50); // 文字サイズ
                $font->color($color); // 文字色
            });
        }
        // 一時保存
        $file_name = Uuid::uuid4()->toString();
        $save_path = storage_path('app/public/images/'. $file_name . '.png');
        $letter->save($save_path);
        return $save_path;
    }

    public function createLetterForLine($text)
    {
        // テンプレートを取得
        $template_path = public_path('images/letter_template/ribbon.png');
        $letter = Image::make($template_path);
        // フォント、色などを設定
        $fonts = ['font/mogihaPen.ttf', 'font/beautiful_font.ttf', 'font/shokakisarari.ttf', 'font/acgyosyo.ttf'];
        $font_path = public_path($fonts[array_rand($fonts, 1)]);
        $colors = ['#000000', '#281a14', '#0d0015', '#16160e', '#333631', '#250d00'];
        $color = $colors[array_rand($colors,1)];

        // 本文を取得
        $body = $this->getBodyArray(15, $text);
        $x = 90;
        // 画像と合成
        for($i = 0; $i < count($body); $i++) {
            $y = 180 + $i * 50;
            $word = $body[$i];
            $letter->text($word, $x, $y, function($font) use ($font_path, $color){
                $font->file($font_path); // 日本語フォントファイル
                $font->size(50); // 文字サイズ
                $font->color($color); // 文字色
            });
        }
        // 一時保存
        $file_name = Uuid::uuid4()->toString();
        $save_path = storage_path('app/public/images/'. $file_name . '.png');
        $letter->save($save_path);
        return $save_path;
    }
}
