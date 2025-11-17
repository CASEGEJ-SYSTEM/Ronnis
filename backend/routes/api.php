<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\RolController;
use App\Http\Controllers\PagoController;
use App\Http\Controllers\PersonalController;
use App\Http\Controllers\AsistenciaController;
use App\Http\Middleware\CorsMiddleware;
/*
|--------------------------------------------------------------------------
| API RUTAS
|--------------------------------------------------------------------------
*/

// ---------- USUARIOS ----------

Route::get('/usuarios', [UsuarioController::class, 'index']);
Route::get('/usuarios/{clave_usuario}', [UsuarioController::class, 'show']);
Route::post('/usuarios', [UsuarioController::class, 'store']);
Route::put('/usuarios/{clave_usuario}', [UsuarioController::class, 'update']);
Route::delete('/usuarios/{clave_usuario}', [UsuarioController::class, 'destroy']);
Route::get('/buscar/usuarios/{texto}', [UsuarioController::class, 'buscar']);


// ---------- ROLES ----------
Route::get('/roles', [RolController::class, 'index']);
Route::get('/roles/{clave_usuario}', [RolController::class, 'show']);
Route::post('/roles', [RolController::class, 'store']);
Route::put('/roles/{clave_usuario}', [RolController::class, 'update']);
Route::delete('/roles/{clave_usuario}', [RolController::class, 'destroy']);
Route::get('/buscar/roles/{texto}', [RolController::class, 'buscar']);
Route::post('/login', [RolController::class, 'login']);

// ---------- PAGOS ----------
Route::get('/pagos', [PagoController::class, 'index']);
Route::get('/pagos/{clave_cliente}', [PagoController::class, 'show']);
Route::post('/pagos', [PagoController::class, 'store']);
Route::put('/pagos/{clave_cliente}', [PagoController::class, 'update']);
Route::delete('/pagos/{clave_cliente}', [PagoController::class, 'destroy']);
Route::get('/buscar/pagos/{texto}', [PagoController::class, 'buscar']);

// ---------- PERSONAL ----------
Route::get('/personal', [PersonalController::class, 'index']);
Route::get('/personal/{id}', [PersonalController::class, 'show']);
Route::post('/personal', [PersonalController::class, 'store']);
Route::put('/personal/{id}', [PersonalController::class, 'update']);
Route::delete('/personal/{id}', [PersonalController::class, 'destroy']);
Route::get('/buscar/personal/{texto}', [PersonalController::class, 'buscar']);

// ---------- ASISTENCIAS ----------
Route::get('/asistencias', [AsistenciaController::class, 'index']);
Route::get('/asistencias/{clave_cliente}', [AsistenciaController::class, 'show']);
Route::post('/asistencias', [AsistenciaController::class, 'store']);
Route::put('/asistencias/{clave_cliente}', [AsistenciaController::class, 'update']);
Route::delete('/asistencias/{clave_cliente}', [AsistenciaController::class, 'destroy']);
Route::get('/buscar/asistencias/{texto}', [AsistenciaController::class, 'buscar']);
