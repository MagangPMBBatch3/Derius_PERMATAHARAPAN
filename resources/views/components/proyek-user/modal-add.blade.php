<div id="modalAdd" class="hidden fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-screen overflow-y-auto transform transition-all">
        <div class="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-t-2xl">
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                    </div>
                    <h2 class="text-2xl font-bold text-white">Tambah Proyek User</h2>
                </div>
                <button type="button" onclick="closeAddModal()"
                        class="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2 transition-colors">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
        </div>

        <div class="p-6">
            <form id="formAddProyekUser" onsubmit="event.preventDefault(); createProyekUser();" class="space-y-6">
                @csrf

                <!-- Users Profile -->
                <div>
                    <label class="block text-gray-700 font-semibold mb-2 flex items-center space-x-1">
                        <span>Pilih Users Profile</span>
                        <span class="text-red-500">*</span>
                    </label>
                    <select id="addUsersProfileId" name="users_profile_id"
                            class="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors">
                        <option value="">Pilih Users Profile</option>
                        <!-- Options will be populated by JS -->
                    </select>
                    <span id="errorAddUsersProfileId" class="text-red-500 text-sm mt-1 block"></span>
                </div>

                <!-- Proyek -->
                <div>
                    <label class="block text-gray-700 font-semibold mb-2 flex items-center space-x-1">
                        <span>Pilih Proyek</span>
                        <span class="text-red-500">*</span>
                    </label>
                    <select id="addProyekId" name="proyek_id"
                            class="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors">
                        <option value="">Pilih Proyek</option>
                        <!-- Options will be populated by JS -->
                    </select>
                    <span id="errorAddProyekId" class="text-red-500 text-sm mt-1 block"></span>
                </div>

                <!-- Action Buttons -->
                <div class="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                    <button type="button" onclick="closeAddModal()"
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
                        Tambah Proyek User
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
