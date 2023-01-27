<?php

namespace App\Http\Controllers;

use App\Models\Letter;
use Illuminate\Http\Request;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Inertia\Inertia;
use Cloudinary;
use App\Http\Requests\LetterRequest;

class ImageController extends Controller
{
    public function index()
    {
        //
    }

    public function create(Letter $image)
    {
        return Inertia::render("Image/Create",['image' => $image->get()]);
    }

    public function store(LetterRequest $request)
    {
        $image_url = Cloudinary::upload($request->file('image')[0]->getRealPath())->getSecurePath();
        $image = Letter::create([
            "id" => str()->uuid(),
            "image_url" => $image_url
        ]);

        QrCode::generate("https://ar-choco.herokuapp.com/valentine/".strval($image->id), '../public/QR/' . strval($image->id) . '.svg');
        return redirect(route("images.show", $image->id));
    }

    public function show(Letter $image)
    {
        return Inertia::render("Image/Show", ["image" => $image]);
    }

    public function edit(Letter $image)
    {
        //
    }

    public function update(Request $request, Letter $image)
    {
        //
    }

    public function destroy(Letter $image)
    {
        //
    }

    public function valentine(Letter $image)
    {
        return view('valentine',compact('image'));
    }
}
