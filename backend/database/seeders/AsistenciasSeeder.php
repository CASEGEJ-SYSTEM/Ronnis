<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AsistenciasSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('asistencias')->insert([
            [
                'clave_cliente' => 'CLI004',
                'fecha_diario' => now(),
                'porcentaje' => '100%',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'clave_cliente' => 'CLI005',
                'fecha_diario' => now()->subDay(),
                'porcentaje' => '75%',
                'created_at' => now(),
                'updated_at' => now()
            ]
        ]);
    }
}
