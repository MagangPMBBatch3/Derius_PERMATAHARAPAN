<x-layouts.auth title="Register">
    <div class="bg-gradient-to-br from-gray-800 to-black p-8 rounded-2xl shadow-2xl w-full max-w-md border border-blue-500">
        <h1 class="text-3xl font-bold mb-6 text-center text-white">Register</h1>

        <form action="{{ route('register.post') }}" method="POST" class="space-y-6">
            @csrf

            <div>
                <label class="block text-blue-300 font-semibold mb-2">Name</label>
                <input type="text" name="name" value="{{ old('name') }}" class="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" placeholder="Masukkan nama" required>
                @error('name')
                    <span class="text-red-400 text-sm mt-1 block">{{ $message }}</span>
                @enderror
            </div>

            <div>
                <label class="block text-blue-300 font-semibold mb-2">Email</label>
                <input type="email" name="email" value="{{ old('email') }}" class="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" placeholder="Masukkan email" required>
                @error('email')
                    <span class="text-red-400 text-sm mt-1 block">{{ $message }}</span>
                @enderror
            </div>

            <div>
                <label class="block text-blue-300 font-semibold mb-2">Password</label>
                <input type="password" name="password" class="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" placeholder="Masukkan password" required>
                @error('password')
                    <span class="text-red-400 text-sm mt-1 block">{{ $message }}</span>
                @enderror
            </div>

            <div>
                <label class="block text-blue-300 font-semibold mb-2">Confirm Password</label>
                <input type="password" name="password_confirmation" class="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" placeholder="Konfirmasi password" required>
                @error('password_confirmation')
                    <span class="text-red-400 text-sm mt-1 block">{{ $message }}</span>
                @enderror
            </div>

            <button type="submit" class="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300">
                Register
            </button>
        </form>

        <div class="mt-6 text-center">
            <p class="text-gray-400">Sudah punya akun? <a href="{{ route('login') }}" class="text-blue-400 hover:text-blue-300 font-semibold">Login di sini</a></p>
        </div>
    </div>
</x-layouts.auth>
