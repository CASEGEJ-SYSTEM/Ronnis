<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClienteController;

Route::get('/clientes', [ClienteController::class, 'index'])->name('clientes.index');
Route::get('/clientes/create', [ClienteController::class, 'create'])->name('clientes.create');
Route::post('/clientes', [ClienteController::class, 'store'])->name('clientes.store');

Route::get('/ver-tablas', function () {
    // Para PostgreSQL
    $tablas = DB::select("SELECT table_name FROM information_schema.tables WHERE table_schema='public'");
    return response()->json($tablas);
});

