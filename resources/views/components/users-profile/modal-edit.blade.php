<div id="modalEditUserProfile" class="hidden fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-screen overflow-y-auto transform transition-all">
        <div class="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-t-2xl">
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                    </div>
                    <h2 class="text-2xl font-bold text-white">Edit User Profile</h2>
                </div>
                <button type="button" onclick="closeEditUserProfileModal()" 
                        class="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2 transition-colors">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
        </div>

        <div class="p-6">
            <form id="formEditUserProfile" onsubmit="event.preventDefault(); updateUserProfile();" enctype="multipart/form-data" class="space-y-6">
                @csrf
                <input type="hidden" id="editUserProfileId">
                
                <!-- Photo Upload Section -->
                <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                    <label class="block text-gray-800 font-semibold mb-4 flex items-center space-x-2">
                        <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        <span>Foto Profile Baru</span>
                    </label>
                    <div class="flex items-start space-x-4">
                        <div class="w-24 h-24 bg-gray-100 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                            <img id="previewEditPhoto" src="" alt="Preview" class="w-full h-full object-cover object-fit-cover hidden">
                            <svg id="placeholderEditIcon" class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>
                        </div>
                        <div class="flex-1">
                            <input type="file" id="editUserProfileFoto" name="foto" accept="image/*" onchange="previewImage(this, 'previewEditPhoto', 'placeholderEditIcon')"
                                   class="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100">
                            <p class="text-sm text-gray-500 mt-2">JPG, PNG, GIF hingga 2MB • Kosongkan jika tidak ingin mengubah foto</p>
                        </div>
                    </div>
                    <span id="errorEditUserProfileFoto" class="text-red-500 text-sm mt-2 block"></span>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Nama Lengkap -->
                    <div>
                        <label class="block text-gray-700 font-semibold mb-2 flex items-center space-x-1">
                            <span>Nama Lengkap</span>
                            <span class="text-red-500">*</span>
                        </label>
                        <input type="text" id="editUserProfileNamaLengkap" name="nama_lengkap" placeholder="Masukkan nama lengkap"
                               class="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors">
                        <span id="errorEditUserProfileNamaLengkap" class="text-red-500 text-sm mt-1 block"></span>
                    </div>

                    <!-- NRP -->
                    <div>
                        <label class="block text-gray-700 font-semibold mb-2 flex items-center space-x-1">
                            <span>NRP</span>
                            <span class="text-red-500">*</span>
                        </label>
                        <input type="text" id="editUserProfileNrp" name="nrp" placeholder="Masukkan NRP"
                               class="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors">
                        <span id="errorEditUserProfileNrp" class="text-red-500 text-sm mt-1 block"></span>
                    </div>

                    <!-- Bagian -->
                    <div>
                        <label class="block text-gray-700 font-semibold mb-2">Bagian</label>
                        <select id="editUserProfileBagianId" name="bagian_id"
                                class="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors">
                            <option value="">Pilih Bagian</option>
                            @foreach($bagians ?? [] as $bagian)
                                <option value="{{ $bagian->id }}">{{ $bagian->nama }}</option>
                            @endforeach
                        </select>
                    </div>

                    <!-- Level -->
                    <div>
                        <label class="block text-gray-700 font-semibold mb-2">Level</label>
                        <select id="editUserProfileLevelId" name="level_id"
                                class="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors">
                            <option value="">Pilih Level</option>
                            @foreach($levels ?? [] as $level)
                                <option value="{{ $level->id }}">{{ $level->nama }}</option>
                            @endforeach
                        </select>
                    </div>

                    <!-- Status -->
                    <div>
                        <label class="block text-gray-700 font-semibold mb-2">Status</label>
                        <select id="editUserProfileStatusId" name="status_id"
                                class="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors">
                            <option value="">Pilih Status</option>
                            @foreach($statuses ?? [] as $status)
                                <option value="{{ $status->id }}">{{ $status->nama }}</option>
                            @endforeach
                        </select>
                    </div>
                </div>

                <!-- Alamat -->
                <div>
                    <label class="block text-gray-700 font-semibold mb-2 flex items-center space-x-1">
                        <span>Alamat</span>
                        <span class="text-red-500">*</span>
                    </label>
                    <textarea id="editUserProfileAlamat" name="alamat" rows="4" placeholder="Masukkan alamat lengkap"
                              class="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"></textarea>
                    <span id="errorEditUserProfileAlamat" class="text-red-500 text-sm mt-1 block"></span>
                </div>

                <!-- Action Buttons -->
                <div class="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                    <button type="button" onclick="closeEditUserProfileModal()"
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
                        Update Profile
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>

<script>
function previewImage(input, previewId, placeholderId) {
    const preview = document.getElementById(previewId);
    const placeholder = document.getElementById(placeholderId);
    
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            preview.src = e.target.result;
            preview.classList.remove('hidden');
            placeholder.classList.add('hidden');
        }
        
        reader.readAsDataURL(input.files[0]);
    } else {
        preview.classList.add('hidden');
        placeholder.classList.remove('hidden');
    }
}
</script>