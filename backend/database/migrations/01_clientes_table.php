<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('clientes', function (Blueprint $table) {
            $table->id();
            $table->string('nombres', 60);
            $table->string('apellidos', 60);
            $table->date('fecha_nacimiento');
            $table->string('telefono', 20);
            $table->string('email', 60)->unique();
            $table->string('contraseña', 60);
            $table->string('sede', 30);
            $table->string('status', 30)->default('activo');
            $table->text('ruta_imagen')->nullable();
            $table->text('qr_imagen')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('clientes');
    }
};
