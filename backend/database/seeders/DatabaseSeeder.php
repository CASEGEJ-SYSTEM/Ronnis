<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            ClienteSeeder::class,
            RolSeeder::class,
            RegistroClienteSeeder::class,
            RegistroPersonalSeeder::class,
            AsistenciaSeeder::class,
            PagoSeeder::class, 
        ]);
    }
}
