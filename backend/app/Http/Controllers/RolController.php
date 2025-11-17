<?php

namespace App\Http\Controllers;

use App\Models\Rol;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class RolController extends Controller
{
    public function index()
    {
        return response()->json(Rol::with('usuario')->get());
    }

    public function show($id)
    {
        $rol = Rol::with('usuario')->find($id);
        return $rol ? response()->json($rol) 
                    : response()->json(['message' => 'Rol no encontrado'], 404);
    }

public function store(Request $request)
{
    $validated = $request->validate([
        'clave_usuario' => 'required|string|max:20|unique:roles,clave_usuario',
        'email' => 'required|email|unique:roles,email',
        'password' => 'required|string|min:6',
        'rol' => 'required|string|max:30'
    ]);

    // Encriptar contraseña
    $validated['password'] = Hash::make($validated['password']);

    $rol = Rol::create($validated);

    return response()->json(['message' => 'Rol creado', 'rol' => $rol], 201);
}


    public function update(Request $request, $id)
    {
        $rol = Rol::find($id);
        if (!$rol) return response()->json(['message' => 'Rol no encontrado'], 404);

        $validated = $request->validate([
            'email' => 'sometimes|email|unique:roles,email,' . $id . ',clave_usuario',
            'password' => 'sometimes|string|min:6',
            'rol' => 'sometimes|string|max:30'
        ]);

        if (isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        }

        $rol->update($validated);

        return response()->json(['message' => 'Rol actualizado', 'rol' => $rol]);
    }

    public function destroy($id)
    {
        $rol = Rol::find($id);
        if (!$rol) return response()->json(['message' => 'Rol no encontrado'], 404);

        $rol->delete();
        return response()->json(['message' => 'Rol eliminado']);
    }

    public function login(Request $request) {
        $rolUser = Rol::where('email', $request->email)->first();

        if (!$rolUser) {
            return response()->json(['message' => 'Usuario no encontrado'], 401);
        }

        if (!Hash::check($request->password, $rolUser->password)) {
            return response()->json(['message' => 'Contraseña incorrecta'], 401);
        }

        return response()->json([
            'rol' => $rolUser->rol,
            'usuario' => $rolUser->usuario ?? null
        ]);
    }

}
