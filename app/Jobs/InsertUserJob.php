<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use App\Models\Gourav; // Corrected model namespace to follow PSR-12 convention

class InsertUserJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $userData;

    /**
     * Create a new job instance.
     *
     * @param array $userData
     * @return void
     */
    public function __construct($userData)
    {
        $this->userData = $userData;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        Gourav::create([
            'name' => $this->userData['name'],
            'class' => $this->userData['class'],
            'rollnumber' => $this->userData['rollnumber'],
        ]);

    }
}
