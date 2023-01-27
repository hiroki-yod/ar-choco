<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Inertia\Inertia;
use Cloudinary;
use App\Http\Requests\ImageRequest;
use Illuminate\Support\Facades\Auth;

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

    public function create(Image $image)
    {
        return Inertia::render("Image/Create",['image' => $image->get()]);
    }

    public function handwrite_letter()
    {
        return Inertia::render("Image/HandwriteLetter");
    }

    public function store(ImageRequest $request )
    {
        $image_instance = new Image;
        $image = $image_instance->storeImage(($request->file('image')));
        $image_instance->createQRcode($image);
        return redirect(route("images.show", $image->id));
    }

    public function create_letter()
    {
        return Inertia::render("Image/CreateLetter");
    }

    public function store_create_letter(Request $request)
    {
        $image_instance = new Image;
        $input_image = $request->all();
        $image = $image_instance->fill($input_image)->createLetter()->save();
        
        // ------------------------------------------------------------------------------------------------------------------------------------
        dd($image);
        // return redirect(route("images.show", $image->id));
    }
    
    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Image  $image
     * @return \Illuminate\Http\Response
     */
    public function show(Image $image)
    {
        return Inertia::render("Image/Show", ["image" => $image]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Image  $image
     * @return \Illuminate\Http\Response
     */
    public function edit(Image $image)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Image  $image
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Image $image)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Image  $image
     * @return \Illuminate\Http\Response
     */
    public function destroy(Image $image)
    {
        //
    }

    public function valentine(Image $image)
    {
        return view('valentine',compact('image'));
    }
}
