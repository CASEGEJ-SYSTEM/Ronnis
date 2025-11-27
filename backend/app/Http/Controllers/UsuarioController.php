<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class UsuarioController extends Controller
{
    public function index(Request $request)
    {
        $query = Usuario::with(['pagos', 'asistencias']);

        $query->whereNotIn('rol', ['admin', 'superadmin']);


        if ($request->has('sede')) {
            $query->where('sede', $request->sede);
        }

        return response()->json($query->get());
    }




    public function show($clave_usuario)
    {
        $usuario = Usuario::with(['pagos', 'asistencias'])
            ->where('clave_usuario', $clave_usuario)
            ->first();

        return $usuario
            ? response()->json($usuario)
            : response()->json(['message' => 'Usuario no encontrado'], 404);
    }


    // POST /api/usuarios
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombres'            => 'required|string|max:40',
            'apellidos'          => 'required|string|max:40',
            'fecha_nacimiento'   => 'required|date',
            'telefono'           => 'required|string|max:15',
            'email'              => 'required|email|unique:usuarios,email',
            'password'           => 'required|string|min:6',
            'sede'               => 'nullable|string|max:30',
            'status'             => 'nullable|string|max:30',
            'ruta_imagen'        => 'nullable|string',
            'qr_imagen'          => 'nullable|string',
            'rol'                => 'nullable|string|max:30',
            'peso_inicial' => 'required|string|max:8'
        ]);

        // Valores por defecto
        $validated['status'] = $validated['status'] ?? 'pendiente';
        $validated['sede']   = $validated['sede'] ?? 'ninguno';
        $validated['password'] = bcrypt($validated['password']);

        $usuario = null;

        DB::transaction(function() use (&$usuario, $validated) {

            // Obtener último número de clave
            $lastNumber = DB::table('usuarios')
                ->selectRaw("MAX(CAST(SUBSTRING(clave_usuario FROM 4) AS INTEGER)) AS max_num")
                ->value('max_num');

            $newNumber = $lastNumber ? $lastNumber + 1 : 1;

            $validated['clave_usuario'] = 'CLI' . str_pad($newNumber, 3, '0', STR_PAD_LEFT);

            // Crear usuario
            $usuario = Usuario::create($validated);
        });

        return response()->json([
            'message' => 'Usuario registrado correctamente',
            'usuario' => $usuario
        ], 201);
    }

    public function update(Request $request, $clave)
    {
        // Buscar usuario por clave_usuario
        $usuario = Usuario::where('clave_usuario', $clave)->first();

        if (!$usuario) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        $validated = $request->validate([
            'nombres'          => 'sometimes|string|max:40',
            'apellidos'        => 'sometimes|string|max:40',
            'fecha_nacimiento' => 'sometimes|date',
            'telefono'         => 'sometimes|string|max:15',
            'email'            => 'sometimes|email|unique:usuarios,email,' . $usuario->clave_usuario . ',clave_usuario',
            'password'         => 'sometimes|string|min:6',
            'sede'             => 'sometimes|string|max:30',
            'status'           => 'sometimes|string|max:30',
            'rol'              => 'sometimes|string|max:30',
            'peso_inicial' => 'required|string|max:8',
            'ruta_imagen'      => 'nullable|string',
            'qr_imagen'        => 'nullable|string',
        ]);

        // Si mandan password, se encripta
        if (isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        }

        $usuario->update($validated);

        return response()->json([
            'message' => 'Usuario actualizado correctamente',
            'usuario' => $usuario
        ]);
    }
    public function destroy($id)
    {
        $usuario = Usuario::find($id);

        if (!$usuario) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        $usuario->delete();

        return response()->json(['message' => 'Usuario eliminado correctamente']);
    }

    // Búsqueda con filtros
    public function buscar($texto)
    {
        $usuarios = Usuario::where('clave_usuario', 'LIKE', "%$texto%")
            ->orWhere('nombres', 'LIKE', "%$texto%")
            ->orWhere('apellidos', 'LIKE', "%$texto%")
            ->orWhere('telefono', 'LIKE', "%$texto%")
            ->orWhere('email', 'LIKE', "%$texto%")
            ->take(10)
            ->get();

        return response()->json($usuarios);
    }

    // Búsqueda general por texto
    public function buscarUsuarios(Request $request)
    {
        $texto = $request->input('texto');

        $usuarios = Usuario::where('clave_usuario', 'LIKE', "%$texto%")
            ->orWhere('nombres', 'LIKE', "%$texto%")
            ->orWhere('apellidos', 'LIKE', "%$texto%")
            ->orWhere('telefono', 'LIKE', "%$texto%")
            ->orWhere('email', 'LIKE', "%$texto%")
            ->orWhere('status', 'LIKE', "%$texto%")
            ->orWhere('rol', 'LIKE', "%$texto%")
            ->get();

        return response()->json($usuarios);
    }

    public function login(Request $request)
    {
        // Validar datos recibidos
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string'
        ]);

        // Buscar usuario por correo
        $usuario = Usuario::where('email', $request->email)->first();

        if (!$usuario) {
            return response()->json([
                'message' => 'Correo o contraseña incorrectos'
            ], 401);
        }

        // Validar contraseña
        if (!Hash::check($request->password, $usuario->password)) {
            return response()->json([
                'message' => 'Correo o contraseña incorrectos'
            ], 401);
        }

        // Usuario válido
        return response()->json([
            'message' => 'Inicio de sesión correcto',
            'usuario' => $usuario,
            'rol'     => $usuario->rol   
        ], 200);
    }

    public function eliminarUsuario($clave)
    {
        $usuario = Usuario::where('clave_usuario', $clave)->first();

        if (!$usuario) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        $usuario->status = 'eliminado';
        $usuario->save();

        return response()->json(['message' => 'Usuario marcado como eliminado']);
    }

    public function usuariosPorSede(Request $request)
    {
        $sede = $request->query('sede');

        $query = Usuario::query();

        // Excluir admins
        $query->whereNotIn('rol', ['admin', 'admin1', 'admin2', 'superadmin']);

        // No mostrar eliminados
        $query->where(function($q){
            $q->whereNull('status')
            ->orWhere('status', '!=', 'eliminado');
        });

        // FILTRO DE SEDE CORRECTO
        if ($sede) {
            $query->where(function ($q) use ($sede) {
                $q->where('sede', $sede)
                ->orWhereNull('sede')
                ->orWhere('sede', '')
                ->orWhere('sede', 'ninguno');
            });
        }

        return $query->get();
    }

    public function buscarUsuariosPorSede(Request $request)
    {
        $texto = $request->input('texto');
        $sede = $request->input('sede');

        $usuarios = Usuario::where('sede', $sede)
            ->whereNotIn('rol', ['admin', 'admin1', 'admin2', 'superadmin'])
            ->where(function($q) use ($texto) {
                $q->where('clave_usuario', 'LIKE', "%$texto%")
                ->orWhere('nombres', 'LIKE', "%$texto%")
                ->orWhere('apellidos', 'LIKE', "%$texto%")
                ->orWhere('telefono', 'LIKE', "%$texto%")
                ->orWhere('email', 'LIKE', "%$texto%");
            })
            ->take(10)
            ->get();
            

        return response()->json($usuarios);
    }


public function subirFoto(Request $request, $clave)
{
    $request->validate([
        'foto' => 'required|image|max:2048'
    ]);

    $usuario = Usuario::where('clave_usuario', $clave)->firstOrFail();

    // Guardar imagen
    $path = $request->file('foto')->store('usuarios', 'public');

    // Eliminar foto anterior correctamente
    if ($usuario->ruta_imagen) {
        $oldPath = str_replace('storage/', '', $usuario->ruta_imagen);
        if (\Storage::disk('public')->exists($oldPath)) {
            \Storage::disk('public')->delete($oldPath);
        }
    }

    // Guardar solo la ruta interna
    $usuario->ruta_imagen = 'storage/' . $path;
    $usuario->save();

    return response()->json([
        'ruta_imagen' => $usuario->ruta_imagen
    ]);
}

}
