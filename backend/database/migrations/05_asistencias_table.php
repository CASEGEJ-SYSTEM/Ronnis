<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('asistencias', function (Blueprint $table) {
            $table->string('clave_cliente', 20); 
            $table->timestamp('fecha_diario')->nullable();
            $table->string('porcentaje', 8)->nullable(); 
            $table->timestamps();

            $table->foreign('clave_cliente')->references('clave_usuario')->on('usuarios')->onDelete('cascade');
        });
    }

    public function down(): void {
        Schema::dropIfExists('asistencias');
    }
};
