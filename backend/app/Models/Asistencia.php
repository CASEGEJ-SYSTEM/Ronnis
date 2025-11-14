<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Asistencia extends Model
{
    use HasFactory;

    protected $fillable = [
        'cliente_id',
        'nombres',
        'apellidos',
        'plan_pago',
        'fecha_llegada'
    ];

    public function cliente()
    {
        return $this->belongsTo(Cliente::class);
    }
}
