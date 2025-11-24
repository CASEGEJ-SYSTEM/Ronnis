<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PagosSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('pagos')->insert([
            [
                'clave_cliente' => 'CLI004',
                'fecha_ingreso' => now()->subDays(30),
                'fecha_corte' => now()->addDays(10),
                'Tipo_pago' => 'Mensual',
                'monto_pagado' => 500,
                'monto_pendiente' => 0,
                'monto_recargo' => 0,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'clave_cliente' => 'CLI005',
                'fecha_ingreso' => now()->subDays(15),
                'fecha_corte' => now()->addDays(15),
                'Tipo_pago' => 'Quincenal',
                'monto_pagado' => 300,
                'monto_pendiente' => 200,
                'monto_recargo' => 50,
                'created_at' => now(),
                'updated_at' => now()
            ]
        ]);
    }
}
