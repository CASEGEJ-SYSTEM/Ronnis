<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombres',
        'apellidos',
        'fecha_nacimiento',
        'telefono',
        'email',
        'contraseña',
        'sede',
        'status',
        'ruta_imagen',
        'qr_imagen'
    ];

    // Oculta la contraseña al devolver datos JSON
    protected $hidden = ['contraseña'];
}
