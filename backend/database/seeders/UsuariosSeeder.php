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
                'nombres' => '',
                'apellidos' => '',
                'fecha_nacimiento' => '1992-08-22',
                'telefono' => '',
                'email' => 'emiliano@factorfit.com',
                'password' => Hash::make('emiliano123'),
                'sede' => 'Emiliano',
                'status' => 'activo',
                'ruta_imagen' => null,
                'qr_imagen' => null,
                'rol' => 'admin1',
                'peso_inicial' => '',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'clave_usuario' => 'CLI002',
                'nombres' => '',
                'apellidos' => '',
                'fecha_nacimiento' =>'1992-08-22',
                'telefono' => '',
                'email' => 'obrera@factorfit.com',
                'password' => Hash::make('obrera123'),
                'sede' => 'Obrera',
                'status' => 'activo',
                'ruta_imagen' => null,
                'qr_imagen' => null,
                'rol' => 'admin2',
                'peso_inicial' => '',
                'created_at' => now(),
                'updated_at' => now()
            ],            
            [
                'clave_usuario' => 'CLI003',
                'nombres' => '',
                'apellidos' => '',
                'fecha_nacimiento' => '1992-08-22',
                'telefono' => '',
                'email' => 'factorfit@factorfit.com',
                'password' => Hash::make('factorfit123'),
                'sede' => 'Emiliano,Obrera',
                'status' => 'activo',
                'ruta_imagen' => null,
                'qr_imagen' => null,
                'rol' => 'superadmin',
                'peso_inicial' => '',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'clave_usuario' => 'CLI004',
                'nombres' => 'María',
                'apellidos' => 'Lopez Perez',
                'fecha_nacimiento' => '1992-08-22',
                'telefono' => '5523456789',
                'email' => 'maria@example.com',
                'password' => Hash::make('123456'),
                'sede' => 'Emiliano',
                'status' => 'activo',
                'ruta_imagen' => null,
                'qr_imagen' => null,
                'rol' => 'cliente',
                'peso_inicial' => '85 Kg',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'clave_usuario' => 'CLI005',
                'nombres' => 'Carlos',
                'apellidos' => 'Lopez Perez',
                'fecha_nacimiento' => '1992-08-22',
                'telefono' => '5523456789',
                'email' => 'carlos@example.com',
                'password' => Hash::make('123456789'),
                'sede' => 'Obrera',
                'status' => 'activo',
                'ruta_imagen' => null,
                'qr_imagen' => null,
                'rol' => 'cliente',
                'peso_inicial' => '85 Kg',
                'created_at' => now(),
                'updated_at' => now()
            ]
        ]);
    }
}
