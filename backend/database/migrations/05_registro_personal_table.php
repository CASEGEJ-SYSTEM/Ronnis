<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('registro_personal', function (Blueprint $table) {
            $table->id(); // PK
            $table->string('nombre_completo', 150);
            $table->string('puesto', 50);
            $table->string('descripcion', 255)->nullable();
            $table->text('ruta_imagen')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('registro_personal');
    }
};
