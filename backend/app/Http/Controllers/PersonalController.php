<?php

namespace App\Http\Controllers;

use App\Models\Personal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PersonalController extends Controller
{
    public function index(Request $request)
    {
        $query = Personal::query();

        // Filtrar por sede si se pasa como query (opcional)
        if ($request->has('sede')) {
            $sede = $request->query('sede');
            $query->where('sede', $sede);
        }

        return response()->json($query->get());
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
            'ruta_imagen' => 'nullable|string',
            'sede' => 'required|string|max:30',
            'rol' => 'nullable|string|max:30'
        ]);

        $validated['rol'] = $validated['rol'] ?? 'personal';

        $personal = null;

        DB::transaction(function () use (&$personal, $validated) {

            // Obtener el número mayor después de los primeros 4 caracteres (PERS)
            $lastNumber = DB::table('personal')
                ->selectRaw("MAX(CAST(SUBSTRING(clave_personal FROM 5) AS INTEGER)) AS max_num")
                ->value('max_num');

            $newNumber = $lastNumber ? $lastNumber + 1 : 1;

            // Generar clave PERS001, PERS002...
            $validated['clave_personal'] = 'PERS' . str_pad($newNumber, 3, '0', STR_PAD_LEFT);

            // Insertar registro
            $personal = Personal::create($validated);
        });

        return response()->json([
            'message' => 'Personal registrado correctamente',
            'personal' => $personal
        ], 201);
    }




    public function update(Request $request, $id)
    {
        $item = Personal::find($id);
        if (!$item) return response()->json(['message' => 'Registro no encontrado'], 404);

        $item->update($request->all());
        return response()->json(['message' => 'Actualizado correctamente', 'data' => $item]);
    }

    public function destroy($id)
    {
        $item = Personal::find($id);
        if (!$item) return response()->json(['message' => 'Registro no encontrado'], 404);

        $item->delete();
        return response()->json(['message' => 'Eliminado correctamente']);
    }

    // Opcional: búsqueda por texto
    public function buscar(Request $request)
    {
        $texto = $request->input('texto', '');
        $result = Personal::where('nombre_completo', 'LIKE', "%$texto%")
            ->orWhere('puesto', 'LIKE', "%$texto%")
            ->get();

        return response()->json($result);
    }
}
