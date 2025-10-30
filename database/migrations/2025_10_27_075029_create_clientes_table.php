<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('clientes', function (Blueprint $table) {
            $table->id(); // id primary key
            $table->string('nombres');
            $table->string('apellidos');
            $table->date('fecha_nacimiento');
            $table->string('telefono');
            $table->string('email')->unique();
            $table->string('contraseña'); // si quieres almacenar hash, luego usar bcrypt
            $table->string('sede');
            $table->enum('status', ['activo', 'inactivo'])->default('activo');
            $table->timestamps(); // created_at y updated_at
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('clientes');
    }
};
