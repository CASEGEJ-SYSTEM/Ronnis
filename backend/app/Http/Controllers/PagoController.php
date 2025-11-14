<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pago;

class PagoController extends Controller
{
    public function index()
    {
        return response()->json(Pago::with('cliente')->get());
    }

    public function show($id)
    {
        $pago = Pago::with('cliente')->find($id);
        if (!$pago) return response()->json(['message'=>'Pago no encontrado'],404);
        return response()->json($pago);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'cliente_id' => 'required|exists:clientes,id',
            'monto' => 'required|numeric',
            'fecha' => 'nullable|date',
            'monto_pendiente' => 'nullable|numeric'
        ]);

        $pago = Pago::create($validated);
        return response()->json($pago, 201);
    }

    public function update(Request $request, $id)
    {
        $pago = Pago::find($id);
        if (!$pago) return response()->json(['message'=>'Pago no encontrado'],404);

        $pago->update($request->all());
        return response()->json($pago);
    }

    public function destroy($id)
    {
        $pago = Pago::find($id);
        if (!$pago) return response()->json(['message'=>'Pago no encontrado'],404);

        $pago->delete();
        return response()->json(['message'=>'Pago eliminado correctamente']);
    }
}
