<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('personal', function (Blueprint $table) {
            $table->string('clave_personal', 8)->primary();
            $table->string('nombre_completo', 60);
            $table->string('puesto', 30);
            $table->text('descripcion')->nullable();
            $table->text('ruta_imagen')->nullable();
            $table->string('sede', 20);
            $table->string('rol', 20);
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('personal');
    }
};
