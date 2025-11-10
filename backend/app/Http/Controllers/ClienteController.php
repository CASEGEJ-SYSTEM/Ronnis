<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cliente;
use App\Models\Rol; 
use Illuminate\Support\Facades\Hash;

class ClienteController extends Controller
{
    // GET /api/clientes
    public function index()
    {
        return response()->json(Cliente::all());
    }

    // GET /api/clientes/{id}
    public function show($id)
    {
        $cliente = Cliente::find($id);

        if (!$cliente) {
            return response()->json(['message' => 'Cliente no encontrado'], 404);
        }

        return response()->json($cliente);
    }

    // POST /api/clientes
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombres' => 'required|string|max:60',
            'apellidos' => 'required|string|max:60',
            'fecha_nacimiento' => 'required|date',
            'telefono' => 'required|string|max:20',
            'email' => 'required|email|unique:clientes,email',
            'contraseña' => 'required|string|min:6',
            'sede' => 'required|string|max:60',
            'ruta_imagen' => 'nullable|string',
            'qr_imagen' => 'nullable|string',
        ]);

        // Encriptar contraseña
        $validated['contraseña'] = Hash::make($validated['contraseña']);
        $validated['status'] = 'activo';

        // Crear cliente
        $cliente = Cliente::create($validated);

        // Crear rol asociado automáticamente
        Rol::create([
            'email' => $cliente->email,
            'contraseña' => $cliente->contraseña, // ya está encriptada
            'rol' => 'cliente'
        ]);

        return response()->json([
            'message' => 'Cliente registrado correctamente y rol asignado.',
            'cliente' => $cliente
        ], 201);
    }

    // PUT/PATCH /api/clientes/{id}
    public function update(Request $request, $id)
    {
        $cliente = Cliente::find($id);

        if (!$cliente) {
            return response()->json(['message' => 'Cliente no encontrado'], 404);
        }

        $validated = $request->validate([
            'nombres' => 'sometimes|string|max:60',
            'apellidos' => 'sometimes|string|max:60',
            'fecha_nacimiento' => 'sometimes|date',
            'telefono' => 'sometimes|string|max:20',
            'email' => 'sometimes|email|unique:clientes,email,' . $cliente->id,
            'contraseña' => 'sometimes|string|min:6',
            'sede' => 'sometimes|string|max:60',
            'status' => 'sometimes|string|max:20',
            'ruta_imagen' => 'nullable|string',
            'qr_imagen' => 'nullable|string',
        ]);

        // Si se actualiza la contraseña, volver a encriptarla
        if (isset($validated['contraseña'])) {
            $validated['contraseña'] = Hash::make($validated['contraseña']);
        }

        // Actualizar cliente
        $cliente->update($validated);

        // Si se cambió email o contraseña, actualizar también el rol
        $rol = Rol::where('email', $cliente->email)->first();
        if ($rol) {
            $rol->update([
                'contraseña' => $cliente->contraseña,
            ]);
        }

        return response()->json([
            'message' => 'Cliente actualizado correctamente',
            'cliente' => $cliente
        ]);
    }

    // DELETE /api/clientes/{id}
    public function destroy($id)
    {
        $cliente = Cliente::find($id);

        if (!$cliente) {
            return response()->json(['message' => 'Cliente no encontrado'], 404);
        }

        // Eliminar el rol asociado (por email)
        Rol::where('email', $cliente->email)->delete();

        // Eliminar cliente
        $cliente->delete();

        return response()->json(['message' => 'Cliente y su rol eliminado correctamente']);
    }

    // GET /api/clientes/buscar?sede=Puebla&status=activo
    public function buscar(Request $request)
    {
        $query = Cliente::query();

        if ($request->has('sede')) {
            $query->where('sede', $request->sede);
        }

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        if ($request->has('nombre')) {
            $query->where('nombres', 'ilike', '%' . $request->nombre . '%');
        }

        return response()->json($query->get());
    }
}
