<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cliente;
use App\Models\Rol;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'contraseña' => 'required|string'
        ]);

        // Buscar el rol (con su cliente)
        $rol = Rol::where('email', $request->email)->first();

        if (!$rol) {
            return response()->json(['message' => 'Correo no encontrado.'], 404);
        }

        // Buscar el cliente para comparar la contraseña
        $cliente = Cliente::where('email', $request->email)->first();

        if (!$cliente || !Hash::check($request->contraseña, $cliente->contraseña)) {
            return response()->json(['message' => 'Contraseña incorrecta.'], 401);
        }

        // Si todo es correcto, devolver el rol
        return response()->json([
            'message' => 'Inicio de sesión exitoso.',
            'rol' => $rol->rol,
            'cliente' => $cliente
        ]);
    }
}
