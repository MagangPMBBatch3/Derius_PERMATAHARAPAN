{{-- filepath: resources/views/components/bagian/modal-edit.blade.php --}}
<div id="modalEdit" class="hidden fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
    <div class="bg-white rounded-lg shadow-lg w-96">
        <div class="p-6">
            <h2 class="text-xl font-bold mb-4">Edit Data Bagian</h2>
            
            <form id="formEditBagian" onsubmit="event.preventDefault(); updateBagian();">
                @csrf
                <input type="hidden" id="editId">
                
                <div class="mb-4">
                    <label class="block text-gray-700 mb-2">Nama Bagian</label>
                    <input type="text" id="editName" name="nama"
                           class="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <span id="errorEditName" class="text-red-500 text-sm"></span>
                </div>

                <div class="flex justify-end space-x-2">
                    <button type="button" onclick="closeEditModal()"
                            class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition">
                        Batal
                    </button>
                    <button type="submit"
                            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                        Update
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>

{{-- Script hanya untuk open/close modal --}}
<script>
    function openEditModal(id, name) {
        document.getElementById('editId').value = id;
        document.getElementById('editName').value = name;
        document.getElementById('modalEdit').classList.remove('hidden');
    }

    function closeEditModal() {
        document.getElementById('modalEdit').classList.add('hidden');
        document.getElementById('editName').value = '';
        document.getElementById('errorEditName').textContent = '';
    }
</script>