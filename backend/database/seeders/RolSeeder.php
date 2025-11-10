<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class RolSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('roles')->insert([
            [
                'email' => 'juan@example.com',
                'contraseña' => Hash::make('123456'),
                'rol' => 'cliente',
            ],
            [
                'email' => 'ana@example.com',
                'contraseña' => Hash::make('654321'),
                'rol' => 'cliente',
            ],
            [
                'email' => 'admin@factorfit.com',
                'contraseña' => Hash::make('admin123'),
                'rol' => 'administrador',
            ],
        ]);
    }
}
