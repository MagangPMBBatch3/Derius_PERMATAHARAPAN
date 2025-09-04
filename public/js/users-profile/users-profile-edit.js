// filepath: public/js/users-profile/users-profile-edit.js

window.updateUserProfile = async function() {
    const id = document.getElementById('editUserProfileId').value;
    const namaLengkap = document.getElementById('editUserProfileNamaLengkap').value.trim();
    const nrp = document.getElementById('editUserProfileNrp').value.trim();
    const alamat = document.getElementById('editUserProfileAlamat').value.trim();
    const bagianId = document.getElementById('editUserProfileBagianId').value;
    const levelId = document.getElementById('editUserProfileLevelId').value;
    const statusId = document.getElementById('editUserProfileStatusId').value;
    const fotoFile = document.getElementById('editUserProfileFoto').files[0];

    // Clear previous errors
    document.getElementById('errorEditUserProfileNamaLengkap').textContent = '';
    document.getElementById('errorEditUserProfileNrp').textContent = '';
    document.getElementById('errorEditUserProfileAlamat').textContent = '';
    document.getElementById('errorEditUserProfileFoto').textContent = '';

    // Validation
    let hasError = false;
    if (!namaLengkap) {
        document.getElementById('errorEditUserProfileNamaLengkap').textContent = 'Nama lengkap tidak boleh kosong';
        hasError = true;
    }
    if (!nrp) {
        document.getElementById('errorEditUserProfileNrp').textContent = 'NRP tidak boleh kosong';
        hasError = true;
    }
    if (!alamat) {
        document.getElementById('errorEditUserProfileAlamat').textContent = 'Alamat tidak boleh kosong';
        hasError = true;
    }
    if (fotoFile && !isValidImageFile(fotoFile)) {
        document.getElementById('errorEditUserProfileFoto').textContent = 'File harus berupa gambar (JPG, PNG, GIF)';
        hasError = true;
    }

    if (hasError) return;

    // Create FormData for file upload
    const formData = new FormData();
    formData.append('_method', 'PUT'); // For Laravel to recognize as PUT request
    formData.append('nama_lengkap', namaLengkap);
    formData.append('nrp', nrp);
    formData.append('alamat', alamat);
    if (bagianId) formData.append('bagian_id', bagianId);
    if (levelId) formData.append('level_id', levelId);
    if (statusId) formData.append('status_id', statusId);
    if (fotoFile) formData.append('foto', fotoFile);

    try {
        const response = await fetch(`/user-profile/${id}`, {
            method: 'POST', // Using POST with _method=PUT for file upload
            headers: {
                'X-CSRF-TOKEN': getCsrfToken(), 'Accept': 'application/json'
            },
            body: formData
        });

        const result = await response.json();

        if (result.success) {
            closeEditUserProfileModal();
            loadUserProfileData();
        } else {
            if (result.errors) {
                Object.keys(result.errors).forEach(field => {
                    const errorElement = document.getElementById(`errorEditUserProfile${field.charAt(0).toUpperCase() + field.slice(1)}`);
                    if (errorElement) {
                        errorElement.textContent = result.errors[field][0];
                    }
                });
            } else {
                alert('Terjadi kesalahan: ' + (result.message || 'Unknown error'));
            }
        }
    } catch (error) {
        alert('Terjadi kesalahan: ' + error.message);
    }
}

function isValidImageFile(file) {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    return validTypes.includes(file.type);
} 