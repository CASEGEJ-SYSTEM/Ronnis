<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsuariosSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('usuarios')->insert([
            [
                'clave_usuario' => 'CLI001',
                'nombres' => 'Carlos',
                'apellidos' => 'Gómez Ruiz',
                'fecha_nacimiento' => '1995-04-15',
                'telefono' => '5512345678',
                'email' => 'admin@factorfit.com',
                'password' => Hash::make('admin123'),
                'sede' => 'Emiliano',
                'status' => 'activo',
                'ruta_imagen' => null,
                'qr_imagen' => null,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'clave_usuario' => 'CLI002',
                'nombres' => 'María',
                'apellidos' => 'Lopez Perez',
                'fecha_nacimiento' => '1992-08-22',
                'telefono' => '5523456789',
                'email' => 'maria@example.com',
                'password' => Hash::make('123456'),
                'sede' => 'Norte',
                'status' => 'activo',
                'ruta_imagen' => null,
                'qr_imagen' => null,
                'created_at' => now(),
                'updated_at' => now()
            ]
        ]);
    }
}
