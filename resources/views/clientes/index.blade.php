<!DOCTYPE html>
<html>
<head>
    <title>Lista de Clientes</title>
</head>
<body>
<h1>Clientes</h1>
<a href="{{ route('clientes.create') }}">Crear Cliente</a>
<table border="1" cellpadding="5">
    <thead>
        <tr>
            <th>ID</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Sede</th>
            <th>Status</th>
        </tr>
    </thead>
    <tbody>
        @foreach($clientes as $cliente)
            <tr>
                <td>{{ $cliente->id }}</td>
                <td>{{ $cliente->nombres }}</td>
                <td>{{ $cliente->apellidos }}</td>
                <td>{{ $cliente->email }}</td>
                <td>{{ $cliente->telefono }}</td>
                <td>{{ $cliente->sede }}</td>
                <td>{{ $cliente->status }}</td>
            </tr>
        @endforeach
    </tbody>
</table>
</body>
</html>
