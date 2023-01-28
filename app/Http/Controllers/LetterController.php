<?php

namespace App\Http\Controllers;

use App\Models\Letter;
use Illuminate\Http\Request;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Inertia\Inertia;
use Cloudinary;
use App\Http\Requests\LetterRequest;

class LetterController extends Controller
{
    public function index()
    {
        //
    }

    public function create(Letter $letter)
    {
        return Inertia::render("Letter/Create",['letter' => $letter->get()]);
    }

    public function store(LetterRequest $request)
    {
        $image_url = Cloudinary::upload($request->file('letter')[0]->getRealPath())->getSecurePath();
        $letter = Letter::create([
            "id" => str()->uuid(),
            "image_url" => $image_url
        ]);

        QrCode::generate("https://ar-choco.herokuapp.com/valentine/".strval($letter->id), '../public/QR/' . strval($letter->id) . '.svg');
        return redirect(route("letters.show", $letter->id));
    }

    public function show(Letter $letter)
    {
        return Inertia::render("Letter/Show", ["letter" => $letter]);
    }

    public function edit(Letter $letter)
    {
        //
    }

    public function update(Request $request, Letter $letter)
    {
        //
    }

    public function destroy(Letter $letter)
    {
        //
    }

    public function valentine(Letter $letter)
    {
        return view('valentine',compact('letter'));
    }
}
