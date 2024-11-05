<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class gourav extends Model
{
    protected $table = 'gouravs';

    protected $fillable = [
        'name',
        'class',
        'rollnumber',
    ];
}
