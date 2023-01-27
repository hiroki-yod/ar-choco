<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

use Cloudinary;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

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
}
