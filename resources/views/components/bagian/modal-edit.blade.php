<div id="modalEdit" class="hidden fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-screen overflow-y-auto transform transition-all">
        <div class="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-t-2xl">
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                    </div>
                    <h2 class="text-2xl font-bold text-white">Edit Bagian</h2>
                </div>
                <button type="button" onclick="closeEditModal()"
                        class="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2 transition-colors">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
        </div>

        <div class="p-6">
            <form id="formEditBagian" onsubmit="event.preventDefault(); updateBagian();" class="space-y-6">
                @csrf
                <input type="hidden" id="editId">

                <!-- Nama -->
                <div>
                    <label class="block text-gray-700 font-semibold mb-2 flex items-center space-x-1">
                        <span>Nama Bagian</span>
                        <span class="text-red-500">*</span>
                    </label>
                    <input type="text" id="editName" name="nama" placeholder="Masukkan nama bagian"
                           class="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors">
                    <span id="errorEditName" class="text-red-500 text-sm mt-1 block"></span>
                </div>

                <!-- Action Buttons -->
                <div class="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                    <button type="button" onclick="closeEditModal()"
                            class="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg">
                        <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                        Batal
                    </button>
                    <button type="submit"
                            class="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300">
                        <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                        </svg>
                        Update Bagian
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
