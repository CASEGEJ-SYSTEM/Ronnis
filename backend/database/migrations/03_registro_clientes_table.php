<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('registro_clientes', function (Blueprint $table) {
            $table->id(); // PK
            $table->unsignedBigInteger('cliente_id'); // FK
            $table->timestamp('fecha_ingreso')->nullable();
            $table->timestamp('fecha_pago')->nullable();
            $table->timestamps();

            // Relación con clientes
            $table->foreign('cliente_id')->references('id')->on('clientes')->onDelete('cascade');
        });
    }

    public function down(): void {
        Schema::dropIfExists('registro_clientes');
    }
};
