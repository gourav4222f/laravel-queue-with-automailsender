<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Routes\V1\TestRoute;

Route::prefix('/v1')->group(function () {
    require __DIR__ . '/v1/testRoute.php';
});

Route::prefix('/v2')->group(function () {
    require __DIR__ . '/v2/testRoute.php';
});



Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
