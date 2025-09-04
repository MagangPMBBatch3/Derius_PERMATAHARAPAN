// filepath: public/js/users-profile/users-profile-create.js

window.createUserProfile = async function() {
    // Get user ID from either current user page or selected user from users page
    const currentUserId = document.getElementById('currentUserId')?.value;
    const selectedUserId = document.getElementById('selectedUserId')?.value;
    const dropdownUserId = document.getElementById('addUserProfileUserId')?.value;
    const userId = dropdownUserId || selectedUserId || currentUserId;
    
    if (!userId) {
        alert('User ID tidak ditemukan');
        return;
    }

    const namaLengkap = document.getElementById('addUserProfileNamaLengkap').value.trim();
    const nrp = document.getElementById('addUserProfileNrp').value.trim();
    const alamat = document.getElementById('addUserProfileAlamat').value.trim();
    const bagianId = document.getElementById('addUserProfileBagianId').value;
    const levelId = document.getElementById('addUserProfileLevelId').value;
    const statusId = document.getElementById('addUserProfileStatusId').value;
    const fotoFile = document.getElementById('addUserProfileFoto').files[0];

    // Clear previous errors
    document.getElementById('errorAddUserProfileNamaLengkap').textContent = '';
    document.getElementById('errorAddUserProfileNrp').textContent = '';
    document.getElementById('errorAddUserProfileAlamat').textContent = '';
    document.getElementById('errorAddUserProfileFoto').textContent = '';

    // Validation
    let hasError = false;
    if (!namaLengkap) {
        document.getElementById('errorAddUserProfileNamaLengkap').textContent = 'Nama lengkap tidak boleh kosong';
        hasError = true;
    }
    if (!nrp) {
        document.getElementById('errorAddUserProfileNrp').textContent = 'NRP tidak boleh kosong';
        hasError = true;
    }
    if (!alamat) {
        document.getElementById('errorAddUserProfileAlamat').textContent = 'Alamat tidak boleh kosong';
        hasError = true;
    }
    if (!fotoFile) {
        document.getElementById('errorAddUserProfileFoto').textContent = 'Foto tidak boleh kosong';
        hasError = true;
    } else if (!isValidImageFile(fotoFile)) {
        document.getElementById('errorAddUserProfileFoto').textContent = 'File harus berupa gambar (JPG, PNG, GIF)';
        hasError = true;
    } else if (fotoFile.size > 2048000) { // 2MB limit
        document.getElementById('errorAddUserProfileFoto').textContent = 'Ukuran file maksimal 2MB';
        hasError = true;
    }

    if (hasError) return;

    // Show loading state
    const submitBtn = document.querySelector('#formAddUserProfile button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
        <svg class="animate-spin w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Menyimpan...
    `;

    // Create FormData for file upload
    const formData = new FormData();
    formData.append('user_id', userId);
    formData.append('nama_lengkap', namaLengkap);
    formData.append('nrp', nrp);
    formData.append('alamat', alamat);
    if (bagianId) formData.append('bagian_id', bagianId);
    if (levelId) formData.append('level_id', levelId);
    if (statusId) formData.append('status_id', statusId);
    formData.append('foto', fotoFile);

    try {
        const response = await fetch('/user-profile', {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': getCsrfToken(),
                'Accept': 'application/json'
            },
            body: formData
        });

        const result = await response.json();

        if (result.success) {
            closeAddUserProfileModal();
            
            // Show success notification
            showNotification('Profile berhasil dibuat!', 'success');
            
            // Refresh appropriate data
            if (selectedUserId) {
                // If we're on users page, reload user data
                if (typeof loadUserData === 'function') {
                    loadUserData();
                }
            } else {
                // If we're on profile page, reload profile data
                if (typeof loadUserProfileData === 'function') {
                    loadUserProfileData();
                }
            }
        } else {
            if (result.errors) {
                // Handle Laravel validation errors
                Object.keys(result.errors).forEach(field => {
                    let fieldName = field;
                    // Map field names to match our IDs
                    if (field === 'nama_lengkap') fieldName = 'NamaLengkap';
                    else if (field === 'user_id') fieldName = 'NamaLengkap'; // Show user_id errors on nama field
                    else fieldName = field.charAt(0).toUpperCase() + field.slice(1);
                    
                    const errorElement = document.getElementById(`errorAddUserProfile${fieldName}`);
                    if (errorElement) {
                        errorElement.textContent = result.errors[field][0];
                    }
                });
            } else {
                alert('Terjadi kesalahan: ' + (result.message || 'Unknown error'));
            }
        }
    } catch (error) {
        console.error('Error creating profile:', error);
        alert('Terjadi kesalahan: ' + error.message);
    } finally {
        // Restore button state
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
    }
}

function isValidImageFile(file) {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    return validTypes.includes(file.type);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transform transition-all duration-300 translate-x-full`;
    
    if (type === 'success') {
        notification.className += ' bg-green-500 text-white';
    } else if (type === 'error') {
        notification.className += ' bg-red-500 text-white';
    } else {
        notification.className += ' bg-blue-500 text-white';
    }
    
    notification.innerHTML = `
        <div class="flex items-center space-x-3">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                ${type === 'success' ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>' : 
                  type === 'error' ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>' :
                  '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>'}
            </svg>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Animate out and remove after 3 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function getCsrfToken() {
    const meta = document.querySelector('meta[name="csrf-token"]');
    return meta ? meta.getAttribute('content') : '';
}