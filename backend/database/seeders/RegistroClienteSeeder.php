<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RegistroClienteSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('registro_clientes')->insert([
            [
                'cliente_id' => 1,
                'fecha_ingreso' => now(),
                'fecha_pago' => now()->subDays(10),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'cliente_id' => 2,
                'fecha_ingreso' => now(),
                'fecha_pago' => now()->subDays(5),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
