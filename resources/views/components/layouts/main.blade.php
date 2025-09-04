{{-- filepath: resources/views/layouts/main.blade.php --}}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{{ $title ?? 'Dashboard' }}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    @vite('resources/css/app.css')
    @stack('scripts')
</head>
<body class="bg-gray-100 min-h-screen">
    <div class="flex min-h-screen">
        <!-- Sidebar -->
        <aside class="w-64 bg-blue-600 text-white p-4 flex-shrink-0">
            <h2 class="text-xl font-bold mb-6">Menu</h2>
            <ul>
                <li class="mb-2">
                    <a href="{{ route('dashboard') }}" class="block py-2 px-2 rounded {{ request()->routeIs('dashboard') ? 'bg-blue-800 font-semibold' : 'hover:bg-blue-500' }}">
                        Dashboard
                    </a>
                </li>
                <li class="mb-2">
                    <a href="{{ route('bagian') }}" class="block py-2 px-2 rounded {{ request()->routeIs('bagian') ? 'bg-blue-800 font-semibold' : 'hover:bg-blue-500' }}">
                        Bagian
                    </a>
                </li>
                <li class="mb-2">
                    <a href="{{ route('level') }}" class="block py-2 px-2 rounded {{ request()->routeIs('level') ? 'bg-blue-800 font-semibold' : 'hover:bg-blue-500' }}">
                        Level
                    </a>
                </li>
                <li class="mb-2">
                    <a href="{{ route('proyek') }}" class="block py-2 px-2 rounded {{ request()->routeIs('proyek') ? 'bg-blue-800 font-semibold' : 'hover:bg-blue-500' }}">
                        Proyek
                    </a>
                </li>
                <li class="mb-2">
                    <a href="{{ route('proyek-user') }}" class="block py-2 px-2 rounded {{ request()->routeIs('proyek-user') ? 'bg-blue-800 font-semibold' : 'hover:bg-blue-500' }}">
                        Proyek User
                    </a>
                </li>
                <li class="mb-2">
                    <a href="{{ route('statuses') }}" class="block py-2 px-2 rounded {{ request()->routeIs('statuses') ? 'bg-blue-800 font-semibold' : 'hover:bg-blue-500' }}">
                        Statuses
                    </a>
                </li>
                <li class="mb-2">
                    <a href="{{ route('users') }}" class="block py-2 px-2 rounded {{ request()->routeIs('users') ? 'bg-blue-800 font-semibold' : 'hover:bg-blue-500' }}">
                        Users
                    </a>
                </li>
                <li class="mb-2">
                    <a href="{{ route('users-profile') }}" class="block py-2 px-2 rounded {{ request()->routeIs('users-profile') ? 'bg-blue-800 font-semibold' : 'hover:bg-blue-500' }}">
                        Users Profile
                    </a>
                </li>
                <li>
                    <form action="{{ route('logout') }}" method="POST">
                        @csrf
                        <button type="submit" class="w-full text-left py-2 hover:bg-red-500 rounded px-2">Logout</button>
                    </form>
                </li>
            </ul>
        </aside>
        <!-- Main Content -->
        <main class="flex-1 p-6">
            <x-navbar :pageTitle="$pageTitle ?? $title ?? 'Dashboard'" />
            {{ $slot }}
        </main>
    </div>
</body>
</html> 