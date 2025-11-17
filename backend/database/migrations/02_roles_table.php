<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('roles', function (Blueprint $table) {
            $table->string('clave_usuario', 20)->primary();
            $table->string('email', 60)->unique();
            $table->string('password', 255);
            $table->string('rol', 30);

            // Relación con la tabla clientes (referencia por email)
            $table->foreign('email')->references('email')->on('usuarios')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('roles');
    }
};
