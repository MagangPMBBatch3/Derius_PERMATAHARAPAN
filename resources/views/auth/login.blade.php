<x-layouts.auth title="Login">
    <form action="{{ route('login.post') }}" method="POST" class="bg-white p-6 rounded shadow-md w-96">
        @csrf
        <h1 class="text-2xl font-bold mb-4 text-center">Login</h1>

        @if ($errors->any())
            <div class="bg-red-100 text-red-700 p-2 rounded mb-4">
                {{ $errors->first() }}
            </div>
        @endif

        <div class="mb-4">
            <label class="block mb-2">Email</label>
            <input type="email" name="email" class="border w-full p-2 rounded" required>
        </div>

        <div class="mb-4">
            <label class="block mb-2">Password</label>
            <input type="password" name="password" class="border w-full p-2 rounded" required>
        </div>

        <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white w-full p-2 rounded transition">
            Login
        </button>
    </form>
</x-layouts.auth>