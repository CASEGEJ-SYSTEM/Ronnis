<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('asistencias', function (Blueprint $table) {
            $table->id(); // PK
            $table->unsignedBigInteger('cliente_id'); // FK
            $table->string('nombres', 60);
            $table->string('apellidos', 60);
            $table->string('plan_pago', 20);
            $table->timestamp('fecha_llegada')->nullable();
            $table->timestamps();

            $table->foreign('cliente_id')->references('id')->on('clientes')->onDelete('cascade');
        });
    }

    public function down(): void {
        Schema::dropIfExists('asistencias');
    }
};
