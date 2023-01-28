<?php

namespace App\Http\Controllers;

use App\Models\Letter;
use Illuminate\Http\Request;
use Inertia\Inertia;

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

    public function handwrite_letter(Letter $letter)
    {
        return Inertia::render("Letter/HandwriteLetter",['letter' => $letter->get()]);
    }

    public function store(Request $request)
    {
        $lettere_instance = new Letter();
        $letter = $lettere_instance->storeImage(($request->file('letter')[0]->getRealPath()));
        $lettere_instance->createQRcode($letter);
        return redirect(route("letters.show", $letter->id));
    }

    public function create_letter()
    {
        return Inertia::render("Letter/CreateLetter");
    }

    public function store_create_letter(Request $request, Letter $letter)
    {
        $lettere_instance = new Letter;
        $input_letter = $request->all();
        $create_letter = $lettere_instance->createLetter($input_letter);
        $letter = $lettere_instance->storeImage(($create_letter));
        $lettere_instance->createQRcode($letter);
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
