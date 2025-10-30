<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cliente;
use Illuminate\Support\Facades\Hash;

class ClienteController extends Controller
{
    public function index()
    {
        $clientes = Cliente::all();
        return view('clientes.index', compact('clientes'));
    }

    public function create()
    {
        return view('clientes.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'nombres' => 'required|string',
            'apellidos' => 'required|string',
            'fecha_nacimiento' => 'required|date',
            'telefono' => 'required|string',
            'email' => 'required|email|unique:clientes,email',
            'contraseña' => 'required|string|min:6',
            'sede' => 'required|string',
            'status' => 'required|in:activo,inactivo',
        ]);

        Cliente::create([
            'nombres' => $request->nombres,
            'apellidos' => $request->apellidos,
            'fecha_nacimiento' => $request->fecha_nacimiento,
            'telefono' => $request->telefono,
            'email' => $request->email,
            'contraseña' => Hash::make($request->contraseña),
            'sede' => $request->sede,
            'status' => $request->status,
        ]);

        return redirect()->route('clientes.index')->with('success', 'Cliente creado correctamente.');
    }
}
