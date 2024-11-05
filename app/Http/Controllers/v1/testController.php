<?php

namespace App\Http\Controllers\V1;

use App\Jobs\SendEmailJob;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Bus;

class TestController extends Controller
{
    public function test()
    {
        $validated = [
            'name' => 'gourav',
            'class' => '120000th',
            'rollnumber' => '21',
        ];

        // Instead of creating a stdClass, let's use an associative array or object 
        // for simplicity here.
        $userData = new \stdClass();
        $userData->name = 'John Doe';
        $userData->class = '10th Grade';
        $userData->email = 'xijek35397@opposir.com';

        // Dispatch the SendEmailJob to send the email in the background

        Bus::dispatch(new SendEmailJob($userData));



        return response()->json(['message' => 'User created and email is being sent in the background!'], 200);
    }
}
