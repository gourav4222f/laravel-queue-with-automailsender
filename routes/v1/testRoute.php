<?php

namespace App\Routes\V1;

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\V1\TestController;

Route::get('/test', [TestController::class, 'test']);
Route::get('/page', function () {
    return view('index');
});
