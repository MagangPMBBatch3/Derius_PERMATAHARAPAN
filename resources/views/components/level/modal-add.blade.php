<div id="modalAddLevel" class="hidden fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
    <div class="bg-white rounded-lg shadow-lg w-96">
        <div class="p-6">
            <h2 class="text-xl font-bold mb-4">Tambah Data Level</h2>
            <form id="formAddLevel" onsubmit="event.preventDefault(); createLevel();">
                @csrf
                <div class="mb-4">
                    <label class="block text-gray-700 mb-2">Nama Level</label>
                    <input type="text" id="addLevelNama" name="nama"
                           class="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                           maxlength="255" placeholder="Masukkan nama level...">
                    <span id="errorAddLevelNama" class="text-red-500 text-sm"></span>
                </div>
                <div class="flex justify-end space-x-2">
                    <button type="button" onclick="closeAddLevelModal()"
                            class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition">
                        Batal
                    </button>
                    <button type="submit"
                            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                        Simpan
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>