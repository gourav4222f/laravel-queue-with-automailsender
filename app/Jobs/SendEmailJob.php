<?php


namespace App\Jobs;

use App\Mail\SendWelcomeEmail;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Support\Facades\Mail;

class SendEmailJob implements ShouldQueue
{
    use Queueable;

    public $user;

    // Accept user data in the constructor
    public function __construct($user)
    {
        $this->user = $user;
    }

    // Handle the job
    public function handle()
    {

        echo "Name: " . $this->user->name . PHP_EOL;
        echo "Class: " . $this->user->class . PHP_EOL;
        echo "Email: " . $this->user->email . PHP_EOL;

        // Send the email using the passed user data
        Mail::to($this->user->email) // Access email from $user
            ->send(new SendWelcomeEmail($this->user));
    }
}
