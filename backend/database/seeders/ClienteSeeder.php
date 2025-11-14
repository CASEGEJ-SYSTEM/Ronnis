<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class ClienteSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('clientes')->insert([
            [
                'nombres' => 'Juan',
                'apellidos' => 'Pérez López',
                'fecha_nacimiento' => '1990-05-20',
                'telefono' => '5551234567',
                'email' => 'juan@example.com',
                'contraseña' => Hash::make('123456'),
                'sede' => 'Centro',
                'status' => 'activo',
                'ruta_imagen' => null,
                'qr_imagen' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombres' => 'Ana',
                'apellidos' => 'García Torres',
                'fecha_nacimiento' => '1995-09-10',
                'telefono' => '5543210987',
                'email' => 'ana@example.com',
                'contraseña' => Hash::make('654321'),
                'sede' => 'Norte',
                'status' => 'activo',
                'ruta_imagen' => null,
                'qr_imagen' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombres' => 'Admin',
                'apellidos' => 'Principal',
                'fecha_nacimiento' => '1985-01-01',
                'telefono' => '5550000000',
                'email' => 'admin@factorfit.com',
                'contraseña' => Hash::make('admin123'),
                'sede' => 'Central',
                'status' => 'activo',
                'ruta_imagen' => null,
                'qr_imagen' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],

        ]);
    }
}
