<div id="modalAddStatus" class="hidden fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
    <div class="bg-white rounded-lg shadow-lg w-96">
        <div class="p-6">
            <h2 class="text-xl font-bold mb-4">Tambah Status</h2>
            <form id="formAddStatus" onsubmit="event.preventDefault(); createStatus();">
                @csrf
                <div class="mb-4">
                    <label class="block text-gray-700 mb-2">Nama Status</label>
                    <input type="text" id="addStatusName" name="nama"
                           class="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <span id="errorAddStatusName" class="text-red-500 text-sm"></span>
                </div>
                <div class="flex justify-end space-x-3">
                    <button type="button" onclick="closeAddStatusModal()"
                            class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-gray-400 to-gray-500 text-white font-semibold rounded-lg shadow-md hover:from-gray-500 hover:to-gray-600 transform hover:scale-105 transition-all duration-200 ease-in-out border-0 focus:outline-none focus:ring-2 focus:ring-gray-300">
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                        Batal
                    </button>
                    <button type="submit"
                            class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 ease-in-out border-0 focus:outline-none focus:ring-2 focus:ring-blue-300">
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        Simpan
                    </button>
                </div>
            </form>
        </div>
    </div>
</div> 