<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RegistroPersonalSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('registro_personal')->insert([
            [
                'nombre_completo' => 'Carlos Ramírez',
                'puesto' => 'Entrenador',
                'descripcion' => 'Especialista en musculación y resistencia.',
                'ruta_imagen' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre_completo' => 'Laura Martínez',
                'puesto' => 'Nutrióloga',
                'descripcion' => 'Asesora en planes alimenticios personalizados.',
                'ruta_imagen' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
