function getCsrfToken() {
    const meta = document.querySelector('meta[name="csrf-token"]');
    return meta ? meta.getAttribute('content') : '';
}

window.loadUserData = async function() {
    try {
        const queryAktif = `
            query {
                allUsers {
                    id
                    name
                    email
                    created_at
                    profile {
                        id
                        nama_lengkap
                        nrp
                        alamat
                        foto
                        bagian_id
                        level_id
                        status_id
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
            }
        `;
        const resAktif = await fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': getCsrfToken() },
            body: JSON.stringify({ query: queryAktif })
        });
        const dataAktif = await resAktif.json();
        renderUserCards(dataAktif?.data?.allUsers || [], 'usersContainer', true);

        const queryArsip = `
            query {
                allUsersArsip {
                    id
                    name
                    email
                    created_at
                    deleted_at
                    profile {
                        id
                        nama_lengkap
                        nrp
                        alamat
                        foto
                        bagian_id
                        level_id
                        status_id
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
            }
        `;
        const resArsip = await fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': getCsrfToken() },
            body: JSON.stringify({ query: queryArsip })
        });
        const dataArsip = await resArsip.json();
        renderUserCards(dataArsip?.data?.allUsersArsip || [], 'usersArsipContainer', false);
    } catch (e) {
        console.error('Error loading users:', e);
    }
}

window.archiveUser = async function(userId) {
    const query = `
        mutation {
            archiveUser(id: ${userId}) {
                id
                name
                email
                deleted_at
            }
        }
    `;

    try {
        const res = await fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': getCsrfToken() },
            body: JSON.stringify({ query })
        });
        const data = await res.json();
        if (data.errors) {
            console.error('Error archiving user:', data.errors);
        } else {
            loadUserData(); // Reload user data to reflect changes
        }
    } catch (e) {
        console.error('Error archiving user:', e);
    }
}

function escapeHtml(text) {
    return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '<')
        .replace(/>/g, '>')
        .replace(/"/g, '"')
        .replace(/'/g, '&#39;');
}

function renderUserCards(items, containerId, isActive) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';

    items.forEach((item) => {
        const profile = item.profile || {};
        const foto = profile.foto ? `/storage/${profile.foto}` : '/images/default-avatar.svg';
        const namaLengkap = profile.nama_lengkap || item.name;
        const nrp = profile.nrp || 'Belum diisi';
        const alamat = profile.alamat || 'Belum diisi';
        const bagianNama = profile.bagian?.nama || 'Belum diisi';
        const levelNama = profile.level?.nama || 'Belum diisi';
        const statusNama = profile.status?.nama || 'Belum diisi';
        const hasProfile = !!profile.id;

        let statusBadge = hasProfile
            ? '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"><svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>Profile Lengkap</span>'
            : '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800"><svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>Profile Kosong</span>';

        let actions = '';
        if (isActive) {
            const profileAction = hasProfile
                ? `<button onclick="openEditUserProfileForUser(${item.id}, ${profile.id}, '${escapeHtml(profile.nama_lengkap || '')}', '${escapeHtml(profile.nrp || '')}', '${escapeHtml(profile.alamat || '')}', ${profile.bagian_id || 'null'}, ${profile.level_id || 'null'}, ${profile.status_id || 'null'})"
                          class="inline-flex items-center px-3 py-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white font-semibold rounded-lg shadow-md hover:from-emerald-600 hover:to-green-600 transform hover:scale-105 transition-all duration-200 ease-in-out border-0 focus:outline-none focus:ring-2 focus:ring-emerald-300 mr-2">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    Edit Profile
                </button>`
                : `<button onclick="openCreateUserProfileForUser(${item.id}, '${escapeHtml(item.name)}', '${escapeHtml(item.email)}')"
                          class="inline-flex items-center px-3 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-lg shadow-md hover:from-indigo-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-200 ease-in-out border-0 focus:outline-none focus:ring-2 focus:ring-indigo-300 mr-2">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    Buat Profile
                </button>`;

            const profileButton = `<button onclick="window.location.href='/users-profile?user_id=${item.id}'"
                          class="inline-flex items-center px-3 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 ease-in-out border-0 focus:outline-none focus:ring-2 focus:ring-blue-300">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A9 9 0 1112 21a9 9 0 01-6.879-3.196z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    Profile
                </button>`;

            actions = `
                <button onclick="openEditUserModal(${item.id}, '${escapeHtml(item.name)}', '${escapeHtml(item.email)}')"
                        class="inline-flex items-center px-3 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-800 font-semibold rounded-lg shadow-md hover:from-yellow-500 hover:to-yellow-600 transform hover:scale-105 transition-all duration-200 ease-in-out border-0 focus:outline-none focus:ring-2 focus:ring-yellow-300 mr-2">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                    Edit User
                </button>
                ${profileAction}
                ${profileButton}
                <button onclick="archiveUser(${item.id})"
                        class="inline-flex items-center px-3 py-2 bg-gradient-to-r from-red-400 to-red-500 text-white font-semibold rounded-lg shadow-md hover:from-red-500 hover:to-red-600 transform hover:scale-105 transition-all duration-200 ease-in-out border-0 focus:outline-none focus:ring-2 focus:ring-red-300">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                    Arsipkan
                </button>
            `;
        } else {
            actions = `
                <button onclick="restoreUser(${item.id})"
                        class="inline-flex items-center px-3 py-2 bg-gradient-to-r from-green-400 to-green-500 text-white font-semibold rounded-lg shadow-md hover:from-green-500 hover:to-green-600 transform hover:scale-105 transition-all duration-200 ease-in-out border-0 focus:outline-none focus:ring-2 focus:ring-green-300 mr-2">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"></path>
                    </svg>
                    Restore
                </button>
                <button onclick="forceDeleteUser(${item.id})"
                        class="inline-flex items-center px-3 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg shadow-md hover:from-red-700 hover:to-red-800 transform hover:scale-105 transition-all duration-200 ease-in-out border-0 focus:outline-none focus:ring-2 focus:ring-red-300">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                    Hapus Permanen
                </button>
            `;
        }

        container.innerHTML += `
            <div class="relative bg-gradient-to-br from-white via-slate-50 to-blue-50 rounded-2xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition-all duration-300 group">
                <!-- Status Badge -->
                <div class="absolute top-4 right-4">
                    ${statusBadge}
                </div>

                <div class="flex items-start space-x-4 mb-4">
                    <div class="relative flex-shrink-0">
                        <div class="w-16 h-16 rounded-full border-3 border-white shadow-lg overflow-hidden group-hover:scale-105 transition-transform duration-200">
                            <img src="${foto}" alt="Foto ${escapeHtml(namaLengkap)}"
                                 class="w-full h-full object-cover object-center">
                        </div>
                        ${hasProfile ? '<div class="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white"></div>' : '<div class="absolute -bottom-1 -right-1 w-5 h-5 bg-amber-400 rounded-full border-2 border-white"></div>'}
                    </div>
                    <div class="flex-1 min-w-0">
                        <h3 class="text-xl font-bold text-gray-900 mb-1 truncate">${escapeHtml(namaLengkap)}</h3>
                        <p class="text-sm text-blue-600 font-medium mb-2">${escapeHtml(item.email)}</p>
                        <div class="text-xs text-gray-500">
                            ID: ${item.id} • Dibuat: ${new Date(item.created_at).toLocaleDateString('id-ID')}
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-3 mb-4 text-sm">
                    <div class="bg-white/50 rounded-lg p-2">
                        <p class="text-gray-600 font-medium">NRP</p>
                        <p class="text-gray-900 truncate">${escapeHtml(nrp)}</p>
                    </div>
                    <div class="bg-white/50 rounded-lg p-2">
                        <p class="text-gray-600 font-medium">Bagian</p>
                        <p class="text-gray-900 truncate">${escapeHtml(bagianNama)}</p>
                    </div>
                    <div class="bg-white/50 rounded-lg p-2">
                        <p class="text-gray-600 font-medium">Level</p>
                        <p class="text-gray-900 truncate">${escapeHtml(levelNama)}</p>
                    </div>
                    <div class="bg-white/50 rounded-lg p-2">
                        <p class="text-gray-600 font-medium">Status</p>
                        <p class="text-gray-900 truncate">${escapeHtml(statusNama)}</p>
                    </div>
                </div>

                <div class="bg-white/50 rounded-lg p-2 mb-4">
                    <p class="text-gray-600 font-medium text-sm mb-1">Alamat</p>
                    <p class="text-gray-900 text-sm line-clamp-2">${escapeHtml(alamat)}</p>
                </div>

                <div class="flex flex-wrap gap-2 pt-3 mt-3 border-t border-blue-100">
                    ${actions}
                </div>
            </div>
        `;
    });
}

// New functions to handle profile management for specific users
window.openCreateUserProfileForUser = function(userId, userName, userEmail) {
    // Set the user ID in a hidden field
    document.getElementById('selectedUserId').value = userId;
    document.getElementById('selectedUserInfo').innerHTML = `
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
            <p class="text-sm text-blue-600">Membuat profile untuk:</p>
            <p class="font-semibold text-blue-800">${escapeHtml(userName)} (${escapeHtml(userEmail)})</p>
        </div>
    `;

    // If user selector exists (on users-profile page), set and disable it
    const selectUser = document.getElementById('addUserProfileUserId');
    if (selectUser) {
        selectUser.value = String(userId);
        selectUser.disabled = true;
    }

    document.getElementById('modalAddUserProfile').classList.remove('hidden');
}

window.openEditUserProfileForUser = function(userId, profileId, namaLengkap, nrp, alamat, bagianId, levelId, statusId) {
    document.getElementById('editUserProfileId').value = profileId;
    document.getElementById('editUserProfileNamaLengkap').value = namaLengkap;
    document.getElementById('editUserProfileNrp').value = nrp;
    document.getElementById('editUserProfileAlamat').value = alamat;
    
    // Set dropdown values
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

window.searchUser = async function() {
    const keyword = document.getElementById('searchUser').value.trim();
    if (!keyword) return loadUserData();

    const isNumeric = !isNaN(keyword);
    const query = isNumeric
        ? `query { user(id: ${keyword}) { 
            id name email created_at profile { 
                id nama_lengkap nrp alamat foto bagian_id level_id status_id 
                bagian { id nama } level { id nama } status { id nama } 
            } 
          } }`
        : `query { userByEmail(email: "${keyword}") { 
            id name email created_at profile { 
                id nama_lengkap nrp alamat foto bagian_id level_id status_id 
                bagian { id nama } level { id nama } status { id nama } 
            } 
          } }`;

    const res = await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': getCsrfToken() },
        body: JSON.stringify({ query })
    });
    const data = await res.json();

    if (isNumeric) {
        const item = data?.data?.user;
        renderUserCards(item ? [item] : [], 'usersContainer', true);
        document.getElementById('usersArsipContainer').innerHTML = '';
    } else {
        const items = data?.data?.userByEmail || [];
        renderUserCards(items, 'usersContainer', true);
        document.getElementById('usersArsipContainer').innerHTML = '';
    }
}

window.showUserTab = function(tab) {
    const tabAktif = document.getElementById('tabUserAktif');
    const tabArsip = document.getElementById('tabUserArsip');
    const containerAktif = document.getElementById('usersContainer');
    const containerArsip = document.getElementById('usersArsipContainer');

    if (tab === 'aktif') {
        tabAktif.classList.add('bg-blue-500', 'text-white');
        tabAktif.classList.remove('bg-gray-300', 'text-black');
        tabArsip.classList.remove('bg-blue-500', 'text-white');
        tabArsip.classList.add('bg-gray-300', 'text-black');
        containerAktif.classList.remove('hidden');
        containerArsip.classList.add('hidden');
    } else {
        tabArsip.classList.add('bg-blue-500', 'text-white');
        tabArsip.classList.remove('bg-gray-300', 'text-black');
        tabAktif.classList.remove('bg-blue-500', 'text-white');
        tabAktif.classList.add('bg-gray-300', 'text-black');
        containerArsip.classList.remove('hidden');
        containerAktif.classList.add('hidden');
    }
}

window.openAddUserModal = function() {
    document.getElementById('modalAddUser').classList.remove('hidden');
}

window.closeAddUserModal = function() {
    document.getElementById('modalAddUser').classList.add('hidden');
    const inputs = ['addUserName', 'addUserEmail', 'addUserPassword'];
    inputs.forEach(id => {
        const input = document.getElementById(id);
        if (input) input.value = '';
    });
    const errors = ['errorAddUserName', 'errorAddUserEmail', 'errorAddUserPassword'];
    errors.forEach(id => {
        const err = document.getElementById(id);
        if (err) err.textContent = '';
    });
}

window.openEditUserModal = function(id, name, email) {
    document.getElementById('editUserId').value = id;
    document.getElementById('editUserName').value = name;
    document.getElementById('editUserEmail').value = email;
    document.getElementById('modalEditUser').classList.remove('hidden');
}

window.closeEditUserModal = function() {
    document.getElementById('modalEditUser').classList.add('hidden');
    const inputs = ['editUserName', 'editUserEmail', 'editUserPassword'];
    inputs.forEach(id => {
        const input = document.getElementById(id);
        if (input) input.value = '';
    });
    const errors = ['errorEditUserName', 'errorEditUserEmail', 'errorEditUserPassword'];
    errors.forEach(id => {
        const err = document.getElementById(id);
        if (err) err.textContent = '';
    });
}

// Profile modal functions
window.closeAddUserProfileModal = function() {
    document.getElementById('modalAddUserProfile').classList.add('hidden');
    document.getElementById('selectedUserId').value = '';
    document.getElementById('selectedUserInfo').innerHTML = '';
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