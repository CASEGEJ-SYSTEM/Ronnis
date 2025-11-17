<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use App\Models\Rol;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;


class UsuarioController extends Controller
{
    public function index()
    {
        return response()->json(Usuario::with('rol')->get());
    }

    public function show($id)
    {
        $usuario = Usuario::with(['rol', 'pagos', 'asistencias'])->find($id);
        return $usuario ? response()->json($usuario) 
                        : response()->json(['message' => 'Usuario no encontrado'], 404);
    }

    // POST /api/usuarios
 public function store(Request $request)
{
    $validated = $request->validate([
        'nombres' => 'required|string|max:40',
        'apellidos' => 'required|string|max:40',
        'fecha_nacimiento' => 'required|date',
        'telefono' => 'required|string|max:15',
        'email' => 'required|email|unique:usuarios,email',
        'password' => 'required|string|min:6',
        'sede' => 'nullable|string|max:30',
        'status' => 'nullable|string|max:30',
        'ruta_imagen' => 'nullable|string',
        'qr_imagen' => 'nullable|string',
    ]);

    $validated['status'] = $validated['status'] ?? 'pendiente';
    $validated['sede'] = $validated['sede'] ?? 'ninguno';
    $validated['password'] = bcrypt($validated['password']);

    $usuario = null;

    DB::transaction(function() use ($validated, &$usuario) {
        // Obtener último número de clave_usuario en PostgreSQL
        $lastNumber = DB::table('usuarios')
            ->selectRaw('MAX(CAST(SUBSTRING(clave_usuario FROM 4) AS INTEGER)) as max_num')
            ->value('max_num');

        $newNumber = $lastNumber ? $lastNumber + 1 : 1;
        $validated['clave_usuario'] = 'CLI' . str_pad($newNumber, 4, '0', STR_PAD_LEFT);

        $usuario = Usuario::create($validated);

        Rol::create([
            'clave_usuario' => $usuario->clave_usuario,
            'email' => $usuario->email,
            'password' => $usuario->password,
            'rol' => 'cliente',
        ]);
    });

    return response()->json([
        'message' => 'Usuario registrado correctamente con rol asignado',
        'usuario' => $usuario
    ], 201);
}



    public function update(Request $request, $id)
    {
        $usuario = Usuario::find($id);
        if (!$usuario) return response()->json(['message' => 'Usuario no encontrado'], 404);

        $validated = $request->validate([
            'nombres' => 'sometimes|string|max:40',
            'apellidos' => 'sometimes|string|max:40',
            'fecha_nacimiento' => 'sometimes|date',
            'telefono' => 'sometimes|string|max:15',
            'email' => 'sometimes|email|unique:usuarios,email,' . $id . ',clave_usuario',
            'password' => 'sometimes|string|min:6',
            'sede' => 'sometimes|string|max:30',
            'status' => 'sometimes|string|max:30',
            'ruta_imagen' => 'nullable|string',
            'qr_imagen' => 'nullable|string',
        ]);

        if (isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        }

        $usuario->update($validated);

        if ($usuario->rol) {
            $usuario->rol->update([
                'password' => $usuario->password,
                'email' => $usuario->email
            ]);
        }

        return response()->json(['message' => 'Usuario actualizado', 'usuario' => $usuario]);
    }

    public function destroy($id)
    {
        $usuario = Usuario::find($id);
        if (!$usuario) return response()->json(['message' => 'Usuario no encontrado'], 404);

        $usuario->rol()->delete();
        $usuario->delete();

        return response()->json(['message' => 'Usuario y rol eliminados correctamente']);
    }

    public function buscar(Request $request)
    {
        $query = Usuario::query();

        if ($request->sede) $query->where('sede', $request->sede);
        if ($request->status) $query->where('status', $request->status);
        if ($request->nombre) $query->where('nombres', 'LIKE', '%' . $request->nombre . '%');

        return response()->json($query->get());
    }
    public function buscarUsuarios(Request $request)
    {
        $texto = $request->input('texto');

        $usuarios = Usuarios::where('clave_usuario', 'LIKE', "%$texto%")
            ->orWhere('nombres', 'LIKE', "%$texto%")
            ->orWhere('apellidos', 'LIKE', "%$texto%")
            ->orWhere('telefono', 'LIKE', "%$texto%")
            ->orWhere('email', 'LIKE', "%$texto%")
            ->orWhere('status', 'LIKE', "%$texto%")
            ->get();

        return response()->json($usuarios);
    }

}
