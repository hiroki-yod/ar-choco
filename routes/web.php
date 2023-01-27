<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ImageController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get("/", [ImageController::class, "create"]);
Route::resource("images", ImageController::class)->except("create");

Route::post("/store", [ImageController::class, "store"])->name('letters.store');

Route::get("/create_letter", [ImageController::class, "create_letter"]);
Route::get("/handwrite_letter", [ImageController::class, "handwrite_letter"]);

Route::post("/store_create_letter", [ImageController::class, "store_create_letter"])->name('images.store_create_letter');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/valentine/{image}', [ImageController::class, "valentine"]);

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
