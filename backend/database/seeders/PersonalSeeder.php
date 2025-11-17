<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PersonalSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('personal')->insert([
            [
                'nombre_completo' => 'Luis Hernández',
                'puesto' => 'Entrenador',
                'descripcion' => 'Entrenador certificado con 5 años de experiencia',
                'ruta_imagen' => null,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'nombre_completo' => 'Ana Torres',
                'puesto' => 'Recepcionista',
                'descripcion' => 'Atención al cliente y soporte',
                'ruta_imagen' => null,
                'created_at' => now(),
                'updated_at' => now()
            ]
        ]);
    }
}
