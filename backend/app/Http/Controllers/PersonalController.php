<?php

namespace App\Http\Controllers;

use App\Models\Personal;
use Illuminate\Http\Request;

class PersonalController extends Controller
{
    public function index()
    {
        return response()->json(Personal::all());
    }

    public function show($id)
    {
        $item = Personal::find($id);
        return $item ? response()->json($item)
                     : response()->json(['message' => 'Registro no encontrado'], 404);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre_completo' => 'required|string|max:150',
            'puesto' => 'required|string|max:50',
            'descripcion' => 'nullable|string',
            'ruta_imagen' => 'nullable|string'
        ]);

        $item = Personal::create($validated);

        return response()->json(['message' => 'Registro creado', 'data' => $item], 201);
    }

    public function update(Request $request, $id)
    {
        $item = Personal::find($id);
        if (!$item) return response()->json(['message' => 'Registro no encontrado'], 404);

        $item->update($request->all());
        return response()->json(['message' => 'Actualizado', 'data' => $item]);
    }

    public function destroy($id)
    {
        Personal::destroy($id);
        return response()->json(['message' => 'Eliminado']);
    }
}
