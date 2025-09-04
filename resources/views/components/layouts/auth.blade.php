<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{{ $title ?? 'Login' }}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @vite('resources/css/app.css')
</head>
<body class="bg-black min-h-screen flex items-center justify-center">
    <div class="w-full max-w-md">
        {{ $slot }}
    </div>
</body>
</html>
