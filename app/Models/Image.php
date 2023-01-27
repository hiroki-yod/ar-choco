<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

use Cloudinary;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Intervention\Image\Facades\Image;

class Image extends Model
{
    use HasFactory;
    use HasUuids;

    protected $fillable = [
        "id",
        "image_url"
    ];

    public function storeImage($request_image)
    {
        $image_url = Cloudinary::upload($request_image[0]->getRealPath())->getSecurePath();
        $image = Image::create([
            "id" => str()->uuid(),
            "image_url" => $image_url
        ]);
        return $image;
    }

    public function createQRcode($image)
    {
        QrCode::generate("https://ar-choco.herokuapp.com/valentine/".strval($image->id), '../public/QR/' . strval($image->id) . '.svg');
    }

    public function createLetter()
    {
        $template_path = public_path('images/letter.png');
        $img = Image::make($template_path);
        $fonts = ['font/mogihaPen.ttf', 'font/beautiful_font.ttf', 'font/shokakisarari.ttf', 'font/acgyosyo.ttf'];
        $font_path = public_path($fonts[array_rand($fonts, 1)]);
        $colors = ['#000000', '#281a14', '#0d0015', '#16160e', '#333631', '#250d00'];
        $color = $colors[array_rand($colors,1)];

        // 本文
        $body = $this->getBodyArray(15);
        $x = 90;
        for($i = 0; $i < count($body); $i++) {
            $y = 280 + $i * 33;
            $word = $body[$i];
            $img->text($word, $x, $y, function($font) use ($font_path, $color){
                $font->file($font_path); // 日本語フォントファイル
                $font->size(22); // 文字サイズ
                $font->color($color); // 文字色
            });
        }
        // 保存
        $file_name = Uuid::uuid4()->toString();
        $img->save(storage_path('/app/public/images/diaries/' . $file_name . '.jpg'));
        $this->image_path = 'images/diaries/' . $file_name . '.jpg';
        //$img->save(public_path('/images/diaries/' . $file_name . '.jpg'));
        //$this->image_path = '/images/diaries/' . $file_name . '.jpg';

        $image_url = Cloudinary::upload($request->file('image')[0]->getRealPath())->getSecurePath();
        $image = Image::create([
            "id" => str()->uuid(),
            "image_url" => $image_url
        ]);

        QrCode::generate("https://ar-choco.herokuapp.com/valentine/".strval($image->id), '../public/QR/' . strval($image->id) . '.svg');

        return $this;
    }
}
