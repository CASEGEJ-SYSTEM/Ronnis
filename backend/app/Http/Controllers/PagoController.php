<?php
namespace App\Http\Controllers;

use App\Models\Pago;
use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Models\Usuario;

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

        // Solo actualiza los campos permitidos
        $pago->update($request->only([
            'fecha_ingreso',
            'fecha_corte',
            'Tipo_pago',
            'monto_pagado',
            'monto_pendiente',
            'monto_recargo'
        ]));

        // Retornar un mensaje limpio, sin URLs completas
        return response()->json([
            'message' => 'Pago actualizado correctamente',
            'pago' => [
                'clave_cliente' => $pago->clave_cliente,
                'monto_pagado' => $pago->monto_pagado,
                'monto_pendiente' => $pago->monto_pendiente,
                'fecha_corte' => $pago->fecha_corte
            ]
        ]);
    }
    public function destroy($id)
    {
        Pago::where('clave_cliente', $id)->delete();
        return response()->json(['message' => 'Registro(s) de pago eliminado(s)']);
    }


    public function actualizarEstadosYRecargos()
    {
        $hoy = Carbon::now();
        $pagos = Pago::with('usuario')->get();

        foreach ($pagos as $pago) {
            $usuario = $pago->usuario;
            if (!$usuario || !$pago->fecha_corte) continue;
            if ($usuario->status === 'eliminado') continue;

            $fechaCorte = Carbon::parse($pago->fecha_corte);
            $diasDiff = $hoy->diffInDays($fechaCorte, false); // positivo si falta

            // Inactivo y aplicar recargo si pasó más de 3 días
            if ($diasDiff < -3) {
                $usuario->status = 'inactivo';
                $semanasRetraso = ceil(abs($diasDiff) / 7);
                $montoBase = 500;
                $pago->monto_pendiente = $montoBase + ($semanasRetraso * 100);
                $pago->save();
            }
            // Pendiente hasta 3 días después
            elseif ($diasDiff < 0 && $diasDiff >= -3) {
                $usuario->status = 'pendiente';
            }
            // Próximo a vencer 5 días antes hasta el día de corte
            elseif ($diasDiff <= 5 && $diasDiff >= 0) {
                $usuario->status = 'proximo a vencer';
            }
            // Ya pagó → activo
            elseif ($pago->monto_pagado >= ($pago->monto_pendiente ?? 0)) {
                $usuario->status = 'activo';
                $pago->monto_pendiente = $pago->monto_pendiente ?? 500; // base si quieres
            }
            // Fecha futura, sin pago aún
            else {
                $usuario->status = 'activo';
            }

            $usuario->save();
        }

        return true;
    }


    
    public function actualizarPagos()
    {
        $this->actualizarEstadosYRecargos();

        return response()->json([
            'status' => 'ok',
            'message' => 'Pagos actualizados correctamente'
        ]);
    }


    public function bitacora()
    {
        $pagos = Pago::with('usuario')
            ->orderBy('id', 'desc')
            ->get()
            ->map(function($pago) {
                return [
                    'clave'     => $pago->clave_cliente,
                    'nombre'    => $pago->usuario->nombres ?? 'Sin nombre',
                    'apellido'  => $pago->usuario->apellidos ?? '',
                    'tipo_pago' => $pago->Tipo_pago,
                    'monto'     => $pago->monto_pagado,
                    'fecha_corte'  => $pago->fecha_corte,
                    'monto_recargo'  => $pago->monto_recargo,
                    'telefono'  => $pago->usuario->telefono,
                    'email'  => $pago->usuario->email,
                ];
            });

        return response()->json([
            'status' => true,
            'data' => $pagos
        ]);
    }
    
}
