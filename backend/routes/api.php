<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RegistroClienteController;
use App\Http\Controllers\PagoController;
use App\Http\Controllers\RegistroPersonalController;
use App\Http\Controllers\AsistenciaController;


Route::get('/clientes', [ClienteController::class, 'index']);
Route::get('/clientes/{id}', [ClienteController::class, 'show']);
Route::post('/clientes', [ClienteController::class, 'store']);
Route::put('/clientes/{id}', [ClienteController::class, 'update']);
Route::patch('/clientes/{id}', [ClienteController::class, 'update']);
Route::delete('/clientes/{id}', [ClienteController::class, 'destroy']);
Route::get('/clientes/buscar', [ClienteController::class, 'buscar']);

Route::post('/login', [AuthController::class, 'login']);


Route::apiResource('registro-clientes', RegistroClienteController::class);
Route::apiResource('pagos', PagoController::class);
Route::apiResource('registro-personal', RegistroPersonalController::class);
Route::apiResource('asistencias', AsistenciaController::class);
