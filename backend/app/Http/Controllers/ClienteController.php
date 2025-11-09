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

        $validated['contraseña'] = Hash::make($validated['contraseña']);
        $validated['status'] = 'activo';

        $cliente = Cliente::create($validated);

        return response()->json([
            'message' => 'Cliente registrado correctamente',
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

        if (isset($validated['contraseña'])) {
            $validated['contraseña'] = Hash::make($validated['contraseña']);
        }

        $cliente->update($validated);

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

        $cliente->delete();

        return response()->json(['message' => 'Cliente eliminado correctamente']);
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
