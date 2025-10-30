<!DOCTYPE html>
<html>
<head>
    <title>Crear Cliente</title>
</head>
<body>
<h1>Crear Cliente</h1>

@if ($errors->any())
    <div style="color:red;">
        <ul>
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif

<form action="{{ route('clientes.store') }}" method="POST">
    @csrf
    <label>Nombres:</label>
    <input type="text" name="nombres"><br>
    <label>Apellidos:</label>
    <input type="text" name="apellidos"><br>
    <label>Fecha Nacimiento:</label>
    <input type="date" name="fecha_nacimiento"><br>
    <label>Teléfono:</label>
    <input type="text" name="telefono"><br>
    <label>Email:</label>
    <input type="email" name="email"><br>
    <label>Contraseña:</label>
    <input type="password" name="contraseña"><br>
    <label>Sede:</label>
    <input type="text" name="sede"><br>
    <label>Status:</label>
    <select name="status">
        <option value="activo">Activo</option>
        <option value="inactivo">Inactivo</option>
    </select><br><br>
    <button type="submit">Crear Cliente</button>
</form>
</body>
</html>
