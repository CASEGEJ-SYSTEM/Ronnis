<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class RolesSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('roles')->insert([
            [
                'clave_usuario' => 'CLI001',
                'email' => 'admin@factorfit.com',
                'password' => Hash::make('admin123'),
                'rol' => 'admin'
            ],
            [
                'clave_usuario' => 'CLI002',
                'email' => 'maria@example.com',
                'password' => Hash::make('123456'),
                'rol' => 'cliente'
            ]
        ]);
    }
}
