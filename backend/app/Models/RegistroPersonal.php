<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RegistroPersonal extends Model
{
    use HasFactory;

    protected $table = 'registro_personal';

    protected $fillable = [
        'nombre_completo',
        'puesto',
        'descripcion',
        'ruta_imagen'
    ];
}
