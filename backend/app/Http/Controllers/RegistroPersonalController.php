<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\RegistroPersonal;

class RegistroPersonalController extends Controller
{
    public function index()
    {
        return response()->json(RegistroPersonal::all());
    }

    public function show($id)
    {
        $personal = RegistroPersonal::find($id);
        if (!$personal) return response()->json(['message'=>'Personal no encontrado'],404);
        return response()->json($personal);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre_completo' => 'required|string|max:150',
            'puesto' => 'required|string|max:50',
            'descripcion' => 'nullable|string|max:255',
            'ruta_imagen' => 'nullable|string'
        ]);

        $personal = RegistroPersonal::create($validated);
        return response()->json($personal, 201);
    }

    public function update(Request $request, $id)
    {
        $personal = RegistroPersonal::find($id);
        if (!$personal) return response()->json(['message'=>'Personal no encontrado'],404);

        $personal->update($request->all());
        return response()->json($personal);
    }

    public function destroy($id)
    {
        $personal = RegistroPersonal::find($id);
        if (!$personal) return response()->json(['message'=>'Personal no encontrado'],404);

        $personal->delete();
        return response()->json(['message'=>'Personal eliminado correctamente']);
    }
}
