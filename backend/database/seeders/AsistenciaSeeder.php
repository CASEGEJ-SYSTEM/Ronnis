<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AsistenciaSeeder extends Seeder  
{
    public function run(): void
    {
        DB::table('asistencias')->insert([
            [
                'cliente_id' => 1,
                'nombres' => 'Juan',
                'apellidos' => 'Pérez López',
                'plan_pago' => 'Mensual',
                'fecha_llegada' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'cliente_id' => 2,
                'nombres' => 'Ana',
                'apellidos' => 'García Torres',
                'plan_pago' => 'Anual',
                'fecha_llegada' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
