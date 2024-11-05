<?php

namespace App\Routes\V1;

use Illuminate\Support\Facades\Route;


Route::get('/test', function(){
    return response()->json(['message' => 'server is running v2']);
});
