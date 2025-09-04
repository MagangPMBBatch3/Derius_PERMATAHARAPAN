<div id="modalAddUserProfile" class="hidden fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-screen overflow-y-auto transform transition-all">
        <div class="sticky top-0 bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-t-2xl">
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                    </div>
                    <h2 class="text-2xl font-bold text-white">Buat User Profile</h2>
                </div>
                <button type="button" onclick="closeAddUserProfileModal()" 
                        class="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2 transition-colors">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
        </div>

        <div class="p-6">
            <!-- Selected User Info (appears when called from users page) -->
            <input type="hidden" id="selectedUserId">
            <div id="selectedUserInfo"></div>

            <form id="formAddUserProfile" onsubmit="event.preventDefault(); createUserProfile();" enctype="multipart/form-data" class="space-y-6">
                @csrf

                @if(isset($users) && count($users))
                <div>
                    <label class="block text-gray-700 font-semibold mb-2 flex items-center space-x-1">
                        <span>Pilih User</span>
                        <span class="text-red-500">*</span>
                    </label>
                    <select id="addUserProfileUserId" name="user_id" class="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors">
                        <option value="">Pilih User</option>
                        @foreach($users as $user)
                            <option value="{{ $user->id }}">{{ $user->id }} - {{ $user->email }}</option>
                        @endforeach
                    </select>
                    <span id="errorAddUserProfileUserId" class="text-red-500 text-sm mt-1 block"></span>
                </div>
                @endif
                
                <!-- Photo Upload Section -->
                <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                    <label class="block text-gray-800 font-semibold mb-4 flex items-center space-x-2">
                        <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        <span>Foto Profile</span>
                        <span class="text-red-500">*</span>
                    </label>
                    <div class="flex items-start space-x-4">
                        <div class="w-24 h-24 bg-gray-100 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                            <img id="previewAddPhoto" src="" alt="Preview" class="w-full h-full object-cover object-fit-cover hidden">
                            <svg id="placeholderAddIcon" class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>
                        </div>
                        <div class="flex-1">
                            <input type="file" id="addUserProfileFoto" name="foto" accept="image/*" onchange="previewImage(this, 'previewAddPhoto', 'placeholderAddIcon')"
                                   class="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100">
                            <p class="text-sm text-gray-500 mt-2">JPG, PNG, GIF hingga 2MB</p>
                        </div>
                    </div>
                    <span id="errorAddUserProfileFoto" class="text-red-500 text-sm mt-2 block"></span>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Nama Lengkap -->
                    <div>
                        <label class="block text-gray-700 font-semibold mb-2 flex items-center space-x-1">
                            <span>Nama Lengkap</span>
                            <span class="text-red-500">*</span>
                        </label>
                        <input type="text" id="addUserProfileNamaLengkap" name="nama_lengkap" placeholder="Masukkan nama lengkap"
                               class="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors">
                        <span id="errorAddUserProfileNamaLengkap" class="text-red-500 text-sm mt-1 block"></span>
                    </div>

                    <!-- NRP -->
                    <div>
                        <label class="block text-gray-700 font-semibold mb-2 flex items-center space-x-1">
                            <span>NRP</span>
                            <span class="text-red-500">*</span>
                        </label>
                        <input type="text" id="addUserProfileNrp" name="nrp" placeholder="Masukkan NRP"
                               class="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors">
                        <span id="errorAddUserProfileNrp" class="text-red-500 text-sm mt-1 block"></span>
                    </div>

                    <!-- Bagian -->
                    <div>
                        <label class="block text-gray-700 font-semibold mb-2">Bagian</label>
                        <select id="addUserProfileBagianId" name="bagian_id"
                                class="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors">
                            <option value="">Pilih Bagian</option>
                            @foreach($bagians ?? [] as $bagian)
                                <option value="{{ $bagian->id }}">{{ $bagian->nama }}</option>
                            @endforeach
                        </select>
                    </div>

                    <!-- Level -->
                    <div>
                        <label class="block text-gray-700 font-semibold mb-2">Level</label>
                        <select id="addUserProfileLevelId" name="level_id"
                                class="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors">
                            <option value="">Pilih Level</option>
                            @foreach($levels ?? [] as $level)
                                <option value="{{ $level->id }}">{{ $level->nama }}</option>
                            @endforeach
                        </select>
                    </div>

                    <!-- Status -->
                    <div>
                        <label class="block text-gray-700 font-semibold mb-2">Status</label>
                        <select id="addUserProfileStatusId" name="status_id"
                                class="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors">
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
                    <textarea id="addUserProfileAlamat" name="alamat" rows="4" placeholder="Masukkan alamat lengkap"
                              class="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors resize-none"></textarea>
                    <span id="errorAddUserProfileAlamat" class="text-red-500 text-sm mt-1 block"></span>
                </div>

                <!-- Action Buttons -->
                <div class="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                    <button type="button" onclick="closeAddUserProfileModal()"
                            class="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg">
                        <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                        Batal
                    </button>
                    <button type="submit"
                            class="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg focus:outline-none focus:ring-4 focus:ring-indigo-300">
                        <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        Simpan Profile
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