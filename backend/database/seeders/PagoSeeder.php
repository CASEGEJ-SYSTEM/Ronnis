<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PagoSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('pagos')->insert([
            [
                'cliente_id' => 1,
                'monto' => 300.00,
                'fecha' => now(),
                'monto_pendiente' => 0.00,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'cliente_id' => 2,
                'monto' => 500.00,
                'fecha' => now(),
                'monto_pendiente' => 100.00,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
