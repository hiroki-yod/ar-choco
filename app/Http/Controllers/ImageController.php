<?php

namespace App\Http\Controllers;

use App\Models\Letter;
use Illuminate\Http\Request;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Inertia\Inertia;
use Cloudinary;
use App\Http\Requests\ImageRequest;
use Illuminate\Support\Facades\Auth;
use Cloudinary\Api\Upload\UploadApi;

class ImageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    public function create(Letter $image)
    {
        return Inertia::render("Image/Create",['image' => $image->get()]);
    }

    public function handwrite_letter()
    {
        return Inertia::render("Image/HandwriteLetter");
    }

    public function store(Request $request )
    {
        $image_instance = new Letter();
        $image = $image_instance->storeImage(($request->file('image')[0]->getRealPath()));
        $image_instance->createQRcode($image);
        return redirect(route("images.show", $image->id));
    }

    public function create_letter()
    {
        return Inertia::render("Image/CreateLetter");
    }

    public function store_create_letter(Request $request, Letter $letter)
    {
        $lettere_instance = new Letter;
        $input_letter = $request->all();
        // dd($input_letter["body"]);
        $create_letter = $lettere_instance->createLetter($input_letter);

        // $create_letter = $lettere_instance->createLetter();
        dd($create_letter);
        dd($lettere_instance->fill($input_letter)->createLetter());

        // $image = $lettere_instance->storeImage($create_letter);
        // $image = $lettere_instance->fill($input_letter)->createLetter()->save();
    
        // return redirect(route("images.show", $image->id));
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
