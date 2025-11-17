<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rol extends Model
{
    use HasFactory;

    protected $table = 'roles';
    protected $primaryKey = 'clave_usuario';
    public $timestamps = false; 

    protected $fillable = [
        'clave_usuario',
        'email',
        'password',
        'rol'
    ];
    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'clave_usuario', 'clave_usuario');
    }


}
