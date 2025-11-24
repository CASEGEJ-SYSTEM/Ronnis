<?php
namespace App\Http\Controllers;

use App\Models\Pago;
use Illuminate\Http\Request;

class PagoController extends Controller
{
   public function index(Request $request)
    {
        $query = Pago::with('usuario');

        // Filtrar por tipo de pago
        if ($request->has('tipo') && strtolower($request->tipo) !== 'todos') {
            $query->where('Tipo_pago', $request->tipo); // "Mensual" o "Quincenal"
        }

        // Filtrar por sede
        if ($request->has('sede') && $request->sede !== '') {
            $query->whereHas('usuario', function($q) use ($request){
                $q->where('sede', $request->sede);
            });
        }

        return response()->json($query->get());
    }

    public function show($id)
    {
        $pago = Pago::with('usuario')->where('clave_cliente', $id)->first();
        return $pago ? response()->json($pago)
                     : response()->json(['message' => 'Pago no encontrado'], 404);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'clave_cliente' => 'required|string|exists:usuarios,clave_usuario',
            'fecha_ingreso' => 'nullable|date',
            'fecha_corte' => 'nullable|date',
            'Tipo_pago' => 'nullable|string|max:20',
            'monto_pagado' => 'nullable|numeric',
            'monto_pendiente' => 'nullable|numeric',
            'monto_recargo' => 'nullable|numeric',
        ]);

        $pago = Pago::create($validated);

        return response()->json(['message' => 'Pago registrado', 'pago' => $pago], 201);
    }

    public function update(Request $request, $id)
    {
        $pago = Pago::where('clave_cliente', $id)->first();
        if (!$pago) return response()->json(['message' => 'Pago no encontrado'], 404);

        $pago->update($request->all());
        return response()->json(['message' => 'Pago actualizado', 'pago' => $pago]);
    }

    public function destroy($id)
    {
        Pago::where('clave_cliente', $id)->delete();
        return response()->json(['message' => 'Registro(s) de pago eliminado(s)']);
    }
}
