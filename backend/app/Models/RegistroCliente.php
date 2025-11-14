<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RegistroCliente extends Model
{
    use HasFactory;

    protected $table = 'registro_clientes';

    protected $fillable = [
        'cliente_id',
        'fecha_ingreso',
        'fecha_pago'
    ];

    public function cliente()
    {
        return $this->belongsTo(Cliente::class);
    }
}
