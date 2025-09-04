<div id="modalAddUser" class="hidden fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-screen overflow-y-auto transform transition-all">
        <div class="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-t-2xl">
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                    </div>
                    <h2 class="text-2xl font-bold text-white">Tambah User Baru</h2>
                </div>
                <button type="button" onclick="closeAddUserModal()"
                        class="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2 transition-colors">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
        </div>

        <div class="p-6">
            <form id="formAddUser" onsubmit="event.preventDefault(); createUser();" class="space-y-6">
                @csrf

                <!-- Name -->
                <div>
                    <label class="block text-gray-700 font-semibold mb-2 flex items-center space-x-1">
                        <span>Nama</span>
                        <span class="text-red-500">*</span>
                    </label>
                    <input type="text" id="addUserName" name="name" placeholder="Masukkan nama lengkap"
                           class="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors">
                    <span id="errorAddUserName" class="text-red-500 text-sm mt-1 block"></span>
                </div>

                <!-- Email -->
                <div>
                    <label class="block text-gray-700 font-semibold mb-2 flex items-center space-x-1">
                        <span>Email</span>
                        <span class="text-red-500">*</span>
                    </label>
                    <input type="email" id="addUserEmail" name="email" placeholder="Masukkan alamat email"
                           class="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors">
                    <span id="errorAddUserEmail" class="text-red-500 text-sm mt-1 block"></span>
                </div>

                <!-- Password -->
                <div>
                    <label class="block text-gray-700 font-semibold mb-2 flex items-center space-x-1">
                        <span>Password</span>
                        <span class="text-red-500">*</span>
                    </label>
                    <input type="password" id="addUserPassword" name="password" placeholder="Masukkan password"
                           class="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors">
                    <span id="errorAddUserPassword" class="text-red-500 text-sm mt-1 block"></span>
                </div>

                <!-- Action Buttons -->
                <div class="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                    <button type="button" onclick="closeAddUserModal()"
                            class="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg">
                        <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                        Batal
                    </button>
                    <button type="submit"
                            class="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300">
                        <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        Tambah User
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
