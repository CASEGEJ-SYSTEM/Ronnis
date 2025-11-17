<?php

namespace App\Http\Controllers;

use App\Models\Asistencia;
use Illuminate\Http\Request;

class AsistenciaController extends Controller
{
    public function index()
    {
        return response()->json(Asistencia::with('usuario')->get());
    }

    public function show($id)
    {
        $data = Asistencia::where('clave_cliente', $id)->get();
        return $data->count() > 0 ? response()->json($data)
                                  : response()->json(['message' => 'Sin asistencias'], 404);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'clave_cliente' => 'required|string|exists:usuarios,clave_usuario',
            'fecha_diario' => 'nullable|date',
            'porcentaje' => 'nullable|string|max:8'
        ]);

        $asistencia = Asistencia::create($validated);

        return response()->json(['message' => 'Asistencia registrada', 'data' => $asistencia], 201);
    }

    public function update(Request $request, $id)
    {
        $asistencia = Asistencia::find($id);
        if (!$asistencia) return response()->json(['message' => 'No encontrado'], 404);

        $asistencia->update($request->all());
        return response()->json(['message' => 'Actualizado', 'data' => $asistencia]);
    }

    public function destroy($id)
    {
        Asistencia::destroy($id);
        return response()->json(['message' => 'Eliminado']);
    }
}
