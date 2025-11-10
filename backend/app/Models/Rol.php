<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rol extends Model
{
    use HasFactory;

    protected $table = 'roles';
    public $timestamps = false; // Si no tienes created_at / updated_at

    protected $fillable = [
        'email',
        'contraseña',
        'rol',
    ];
}
