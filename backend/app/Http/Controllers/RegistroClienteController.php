<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\RegistroCliente;

class RegistroClienteController extends Controller
{
    public function index()
    {
        return response()->json(RegistroCliente::with('cliente')->get());
    }

    public function show($id)
    {
        $registro = RegistroCliente::with('cliente')->find($id);
        if (!$registro) return response()->json(['message'=>'Registro no encontrado'],404);
        return response()->json($registro);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'cliente_id' => 'required|exists:clientes,id',
            'fecha_ingreso' => 'nullable|date',
            'fecha_pago' => 'nullable|date'
        ]);

        $registro = RegistroCliente::create($validated);
        return response()->json($registro, 201);
    }

    public function update(Request $request, $id)
    {
        $registro = RegistroCliente::find($id);
        if (!$registro) return response()->json(['message'=>'Registro no encontrado'],404);

        $registro->update($request->all());
        return response()->json($registro);
    }

    public function destroy($id)
    {
        $registro = RegistroCliente::find($id);
        if (!$registro) return response()->json(['message'=>'Registro no encontrado'],404);

        $registro->delete();
        return response()->json(['message'=>'Registro eliminado correctamente']);
    }
}
