<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('pagos', function (Blueprint $table) {
            $table->id(); // PK
            $table->unsignedBigInteger('cliente_id'); // FK
            $table->float('monto');
            $table->timestamp('fecha')->nullable();
            $table->float('monto_pendiente')->nullable();
            $table->timestamps();

            $table->foreign('cliente_id')->references('id')->on('clientes')->onDelete('cascade');
        });
    }

    public function down(): void {
        Schema::dropIfExists('pagos');
    }
};
