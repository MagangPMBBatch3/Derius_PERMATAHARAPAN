window.updateProyekUser = async function() {
    const id = document.getElementById('editId').value;
    const usersProfileId = document.getElementById('editUsersProfileId').value;
    const proyekId = document.getElementById('editProyekId').value;

    // Clear previous errors
    document.getElementById('errorEditUsersProfileId').textContent = '';
    document.getElementById('errorEditProyekId').textContent = '';

    // Validation
    let hasError = false;
    if (!usersProfileId) {
        document.getElementById('errorEditUsersProfileId').textContent = 'Users Profile harus dipilih';
        hasError = true;
    }
    if (!proyekId) {
        document.getElementById('errorEditProyekId').textContent = 'Proyek harus dipilih';
        hasError = true;
    }

    if (hasError) return;

    const mutation = `
        mutation {
            updateProyekUser(id: ${id}, input: {
                users_profile_id: ${usersProfileId},
                proyek_id: ${proyekId}
            }) {
                id
                users_profile_id
                proyek_id
                updated_at
            }
        }
    `;

    try {
        const response = await fetch('/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': getCsrfToken()
            },
            body: JSON.stringify({ query: mutation })
        });
        const result = await response.json();

        if (result.errors) {
            const errorMessage = result.errors[0].message;
            document.getElementById('errorEditProyekId').textContent = errorMessage;
        } else {
            closeEditModal();
            loadProyekUserData();
        }
    } catch (error) {
        document.getElementById('errorEditProyekId').textContent = 'Terjadi kesalahan: ' + error.message;
    }
}

window.deleteProyekUser = async function(id) {
    if (!confirm('Apakah Anda yakin ingin menghapus proyek user ini?')) return;

    const mutation = `
        mutation {
            deleteProyekUser(id: ${id}) {
                id
            }
        }
    `;

    try {
        const response = await fetch('/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': getCsrfToken()
            },
            body: JSON.stringify({ query: mutation })
        });
        const result = await response.json();

        if (result.errors) {
            alert('Error: ' + result.errors[0].message);
        } else {
            loadProyekUserData();
        }
    } catch (error) {
        alert('Terjadi kesalahan: ' + error.message);
    }
}
