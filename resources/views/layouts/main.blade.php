<!DOCTYPE html>
<html>
<head>
    <title>{{ $title ?? 'Dashboard' }}</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-300 flex">
    <aside class="w-64 bg-blue-600 text-white h-screen p-4">
        <h2 class="text-xl font-bold mb-6">Menu</h2>
        <ul>
            <li>
                <a href="/dashboard" class="block py-2 px-2 rounded {{ request()->is('dashboard') ? 'bg-blue-800 font-semibold' : 'hover:bg-blue-500' }}">
                    Dashboard
                </a>
            </li>
            <li class="mb-2">
                <a href="{{ route('bagian.index') }}" class="block p-2 rounded {{ request()->routeIs('bagian.*') ? 'bg-blue-800 font-semibold' : 'hover:bg-cyan-400' }}">
                    Bagian
                </a>
            </li>
            <li class="mb-2">
                <a href="{{ route('level.index') }}" class="block p-2 rounded {{ request()->routeIs('level.*') ? 'bg-blue-800 font-semibold' : 'hover:bg-cyan-400' }}">
                    Level
                </a>
            </li>
            <li>
                <form action="/logout" method="POST">
                    @csrf
                    <button type="submit" class="w-full text-left py-2 hover:bg-red-500 rounded px-2">Logout</button>
                </form>
            </li>
        </ul>
    </aside>

    <div class="flex-1 p-6">
        @include('components.navbar')
        {{ $slot }}
    </div>
</body>
</html>