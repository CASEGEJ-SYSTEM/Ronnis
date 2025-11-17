<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('usuarios', function (Blueprint $table) {
            $table->string('clave_usuario', 20)->primary();
            $table->string('nombres', 40);
            $table->string('apellidos', 40);
            $table->date('fecha_nacimiento');
            $table->string('telefono', 15);
            $table->string('email', 60)->unique();
            $table->string('password', 255);
            $table->string('sede', 30);
            $table->string('status', 30)->default('activo');
            $table->text('ruta_imagen')->nullable();
            $table->text('qr_imagen')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('usuarios');
    }
};
