<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cliente;
use Illuminate\Support\Facades\Hash;

class ClienteController extends Controller
{
    // GET /api/clientes
    public function index()
    {
        $clientes = Cliente::all();
        return response()->json($clientes);
    }

    // POST /api/clientes
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombres' => 'required|string|max:255',
            'apellidos' => 'required|string|max:255',
            'fecha_nacimiento' => 'required|date',
            'telefono' => 'required|string|max:20',
            'email' => 'required|email|unique:clientes,email',
            'contraseña' => 'required|string|min:6',
            'sede' => 'required|string|max:255',
        ]);

        $cliente = Cliente::create([
            'nombres' => $validated['nombres'],
            'apellidos' => $validated['apellidos'],
            'fecha_nacimiento' => $validated['fecha_nacimiento'],
            'telefono' => $validated['telefono'],
            'email' => $validated['email'],
            // ⚠️ Encriptamos la contraseña
            'contraseña' => Hash::make($validated['contraseña']),
            'sede' => $validated['sede'],
            'status' => 'activo',
        ]);

        return response()->json([
            'message' => 'Cliente registrado correctamente',
            'cliente' => $cliente
        ], 201);
    }
}
