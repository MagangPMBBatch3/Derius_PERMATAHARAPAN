// filepath: public/js/users-profile/users-profile.js

function getCsrfToken() {
    const meta = document.querySelector('meta[name="csrf-token"]');
    return meta ? meta.getAttribute('content') : '';
}

window.loadUserProfileData = async function() {
    try {
        // Get selected user ID from the page (can be from URL parameter or current user)
        const selectedUserId = document.getElementById('selectedUserId')?.value;
        if (!selectedUserId) {
            console.error('Selected user ID not found');
            return;
        }

        const query = `
            query {
                userProfileByUserId(user_id: ${selectedUserId}) {
                    id
                    user_id
                    nama_lengkap
                    nrp
                    alamat
                    foto
                    bagian_id
                    level_id
                    status_id
                    created_at
                    updated_at
                    user {
                        id
                        name
                        email
                    }
                    bagian {
                        id
                        nama
                    }
                    level {
                        id
                        nama
                    }
                    status {
                        id
                        nama
                    }
                }
            }
        `;
        
        const res = await fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': getCsrfToken() },
            body: JSON.stringify({ query })
        });
        const data = await res.json();
        
        if (data?.data?.userProfileByUserId) {
            renderUserProfile(data.data.userProfileByUserId);
        } else {
            // If no profile exists, show empty form
            renderEmptyProfile();
        }
    } catch (e) {
        console.error('Error loading user profile:', e);
    }
}

function escapeHtml(text) {
    return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function renderUserProfile(profile) {
    const container = document.getElementById('userProfileContainer');
    if (!container) return;
    
    const user = profile.user || {};
    const foto = profile.foto ? `/storage/${profile.foto}` : '/images/default-avatar.svg';
    const bagianNama = profile.bagian?.nama || 'Tidak ada bagian';
    const levelNama = profile.level?.nama || 'Tidak ada level';
    const statusNama = profile.status?.nama || 'Tidak ada status';
    
    container.innerHTML = `
        <div class="relative bg-gradient-to-br from-white via-blue-50 to-indigo-50 rounded-3xl shadow-xl p-8 border border-blue-200 overflow-hidden">
            <!-- Decorative background pattern -->
            <div class="absolute inset-0 opacity-5">
                <div class="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                <div class="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-indigo-400 to-pink-400 rounded-full transform translate-x-1/3 translate-y-1/3"></div>
            </div>
            
            <div class="relative z-10 flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8">
                <!-- Profile Photo -->
                <div class="flex-shrink-0 relative group">
                    <div class="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white shadow-2xl overflow-hidden transform group-hover:scale-105 transition-all duration-300">
                        <img src="${foto}" alt="Foto ${escapeHtml(profile.nama_lengkap || user.name)}" 
                             class="w-full h-full object-cover object-center">
                    </div>
                    <div class="absolute -bottom-1.5 -right-1.5 w-8 h-8 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center shadow-lg">
                        <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                </div>
                
                <!-- Profile Information -->
                <div class="flex-1 w-full">
                    <div class="mb-3 md:mb-4">
                        <h2 class="text-xl md:text-2xl font-bold text-gray-900 mb-1">${escapeHtml(profile.nama_lengkap || user.name)}</h2>
                        <p class="text-sm md:text-base text-blue-600 font-medium">${escapeHtml(user.email)}</p>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4 mb-5 md:mb-6">
                        <div class="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-md border border-blue-100">
                            <div class="flex items-center space-x-3">
                                <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <p class="text-xs md:text-sm text-gray-600 font-medium">NRP</p>
                                    <p class="text-base md:text-lg font-semibold text-gray-900">${escapeHtml(profile.nrp || 'Tidak ada NRP')}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-md border border-blue-100">
                            <div class="flex items-center space-x-3">
                                <div class="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                                    </svg>
                                </div>
                                <div>
                                    <p class="text-xs md:text-sm text-gray-600 font-medium">Bagian</p>
                                    <p class="text-base md:text-lg font-semibold text-gray-900">${escapeHtml(bagianNama)}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-md border border-blue-100">
                            <div class="flex items-center space-x-3">
                                <div class="w-10 h-10 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <p class="text-xs md:text-sm text-gray-600 font-medium">Level</p>
                                    <p class="text-base md:text-lg font-semibold text-gray-900">${escapeHtml(levelNama)}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-md border border-blue-100">
                            <div class="flex items-center space-x-3">
                                <div class="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <p class="text-xs md:text-sm text-gray-600 font-medium">Status</p>
                                    <p class="text-base md:text-lg font-semibold text-gray-900">${escapeHtml(statusNama)}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-md border border-blue-100 md:col-span-2">
                            <div class="flex items-start space-x-3">
                                <div class="w-10 h-10 bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 111.314 0z"></path>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    </svg>
                                </div>
                                <div class="min-w-0">
                                    <p class="text-xs md:text-sm text-gray-600 font-medium mb-1">Alamat</p>
                                    <p class="text-sm md:text-base text-gray-900 leading-relaxed">${escapeHtml(profile.alamat || 'Tidak ada alamat')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Action Buttons -->
                    <div class="flex flex-wrap gap-3 md:gap-4">
                        <button onclick="openEditUserProfileModal(${profile.id}, '${escapeHtml(profile.nama_lengkap || '')}', '${escapeHtml(profile.nrp || '')}', '${escapeHtml(profile.alamat || '')}', ${profile.bagian_id || 'null'}, ${profile.level_id || 'null'}, ${profile.status_id || 'null'})" 
                                class="group relative inline-flex items-center px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-2xl shadow-xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 ease-in-out border-0 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 overflow-hidden">
                            <div class="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <svg class="relative w-5 h-5 mr-2 md:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                            </svg>
                            <span class="relative">Edit Profile</span>
                        </button>
                        
                        <div class="text-sm text-gray-500 flex items-center">
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            Dibuat: ${profile.created_at ? new Date(profile.created_at).toLocaleDateString('id-ID') : 'Tidak ada'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderEmptyProfile() {
    const container = document.getElementById('userProfileContainer');
    if (!container) return;
    
    container.innerHTML = `
        <div class="relative bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 rounded-3xl shadow-xl p-12 border border-blue-200 text-center overflow-hidden">
            <!-- Decorative background -->
            <div class="absolute inset-0 opacity-5">
                <div class="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
            
            <div class="relative z-10">
                <!-- Empty state illustration -->
                <div class="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-full flex items-center justify-center">
                    <svg class="w-16 h-16 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                </div>
                
                <h2 class="text-3xl font-bold text-gray-900 mb-4">Profile Belum Dibuat</h2>
                <p class="text-lg text-gray-600 mb-8 max-w-md mx-auto">Lengkapi data profile Anda untuk pengalaman yang lebih personal dan fitur yang lebih lengkap</p>
                
                <button onclick="openAddUserProfileModal()" 
                        class="group relative inline-flex items-center px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xl rounded-2xl shadow-2xl hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 ease-in-out border-0 focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:ring-opacity-50 overflow-hidden">
                    <div class="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <svg class="relative w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    <span class="relative">Buat Profile Sekarang</span>
                </button>
            </div>
        </div>
    `;
}

window.openAddUserProfileModal = function() {
    document.getElementById('modalAddUserProfile').classList.remove('hidden');
}

window.closeAddUserProfileModal = function() {
    document.getElementById('modalAddUserProfile').classList.add('hidden');
    const inputs = ['addUserProfileNamaLengkap', 'addUserProfileNrp', 'addUserProfileAlamat'];
    inputs.forEach(id => {
        const input = document.getElementById(id);
        if (input) input.value = '';
    });
    const selects = ['addUserProfileBagianId', 'addUserProfileLevelId', 'addUserProfileStatusId'];
    selects.forEach(id => {
        const select = document.getElementById(id);
        if (select) select.value = '';
    });
    const fileInput = document.getElementById('addUserProfileFoto');
    if (fileInput) fileInput.value = '';
    const errors = ['errorAddUserProfileNamaLengkap', 'errorAddUserProfileNrp', 'errorAddUserProfileAlamat', 'errorAddUserProfileFoto'];
    errors.forEach(id => {
        const err = document.getElementById(id);
        if (err) err.textContent = '';
    });
}

window.openEditUserProfileModal = function(id, namaLengkap, nrp, alamat, bagianId, levelId, statusId) {
    document.getElementById('editUserProfileId').value = id;
    document.getElementById('editUserProfileNamaLengkap').value = namaLengkap;
    document.getElementById('editUserProfileNrp').value = nrp;
    document.getElementById('editUserProfileAlamat').value = alamat;
    
    // Set dropdown values - Fixed the variable name issue
    if (bagianId && bagianId !== 'null') {
        document.getElementById('editUserProfileBagianId').value = bagianId;
    }
    if (levelId && levelId !== 'null') {
        document.getElementById('editUserProfileLevelId').value = levelId;
    }
    if (statusId && statusId !== 'null') {
        document.getElementById('editUserProfileStatusId').value = statusId;
    }
    
    document.getElementById('modalEditUserProfile').classList.remove('hidden');
}

window.closeEditUserProfileModal = function() {
    document.getElementById('modalEditUserProfile').classList.add('hidden');
    const inputs = ['editUserProfileNamaLengkap', 'editUserProfileNrp', 'editUserProfileAlamat'];
    inputs.forEach(id => {
        const input = document.getElementById(id);
        if (input) input.value = '';
    });
    const selects = ['editUserProfileBagianId', 'editUserProfileLevelId', 'editUserProfileStatusId'];
    selects.forEach(id => {
        const select = document.getElementById(id);
        if (select) select.value = '';
    });
    const fileInput = document.getElementById('editUserProfileFoto');
    if (fileInput) fileInput.value = '';
    const errors = ['errorEditUserProfileNamaLengkap', 'errorEditUserProfileNrp', 'errorEditUserProfileAlamat', 'errorEditUserProfileFoto'];
    errors.forEach(id => {
        const err = document.getElementById(id);
        if (err) err.textContent = '';
    });
}