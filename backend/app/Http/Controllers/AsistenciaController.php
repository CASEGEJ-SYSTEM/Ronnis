<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Asistencia;

class AsistenciaController extends Controller
{
    public function index()
    {
        return response()->json(Asistencia::with('cliente')->get());
    }

    public function show($id)
    {
        $asistencia = Asistencia::with('cliente')->find($id);
        if (!$asistencia) return response()->json(['message'=>'Asistencia no encontrada'],404);
        return response()->json($asistencia);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'cliente_id' => 'required|exists:clientes,id',
            'nombres' => 'required|string|max:60',
            'apellidos' => 'required|string|max:60',
            'plan_pago' => 'required|string|max:20',
            'fecha_llegada' => 'nullable|date'
        ]);

        $asistencia = Asistencia::create($validated);
        return response()->json($asistencia, 201);
    }

    public function update(Request $request, $id)
    {
        $asistencia = Asistencia::find($id);
        if (!$asistencia) return response()->json(['message'=>'Asistencia no encontrada'],404);

        $asistencia->update($request->all());
        return response()->json($asistencia);
    }

    public function destroy($id)
    {
        $asistencia = Asistencia::find($id);
        if (!$asistencia) return response()->json(['message'=>'Asistencia no encontrada'],404);

        $asistencia->delete();
        return response()->json(['message'=>'Asistencia eliminada correctamente']);
    }
}
