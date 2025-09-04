// filepath: public/js/users/users-edit.js

window.updateUser = async function() {
    const id = document.getElementById('editUserId').value;
    const name = document.getElementById('editUserName').value.trim();
    const email = document.getElementById('editUserEmail').value.trim();
    const password = document.getElementById('editUserPassword').value;

    // Clear previous errors
    document.getElementById('errorEditUserName').textContent = '';
    document.getElementById('errorEditUserEmail').textContent = '';
    document.getElementById('errorEditUserPassword').textContent = '';

    // Validation
    let hasError = false;
    if (!name) {
        document.getElementById('errorEditUserName').textContent = 'Nama tidak boleh kosong';
        hasError = true;
    }
    if (!email) {
        document.getElementById('errorEditUserEmail').textContent = 'Email tidak boleh kosong';
        hasError = true;
    } else if (!isValidEmail(email)) {
        document.getElementById('errorEditUserEmail').textContent = 'Format email tidak valid';
        hasError = true;
    }
    if (password && password.length < 6) {
        document.getElementById('errorEditUserPassword').textContent = 'Password minimal 6 karakter';
        hasError = true;
    }

    if (hasError) return;

    let inputFields = `name: "${name}", email: "${email}"`;
    if (password) {
        inputFields += `, password: "${password}"`;
    }

    const mutation = `
        mutation {
            updateUser(id: ${id}, input: { ${inputFields} }) {
                id
                name
                email
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
            if (errorMessage.includes('email')) {
                document.getElementById('errorEditUserEmail').textContent = 'Email sudah digunakan';
            } else {
                document.getElementById('errorEditUserName').textContent = errorMessage;
            }
        } else {
            closeEditUserModal();
            loadUserData();
        }
    } catch (error) {
        document.getElementById('errorEditUserName').textContent = 'Terjadi kesalahan: ' + error.message;
    }
}

window.archiveUser = async function(id) {
    if (!confirm('Apakah Anda yakin ingin mengarsipkan user ini?')) return;

    const mutation = `
        mutation {
            deleteUser(id: ${id}) {
                id
                name
                email
                deleted_at
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
            loadUserData();
            if (typeof showUserTab === 'function') {
                showUserTab('arsip');
            }
        }
    } catch (error) {
        alert('Terjadi kesalahan: ' + error.message);
    }
}

window.restoreUser = async function(id) {
    if (!confirm('Apakah Anda yakin ingin mengembalikan user ini?')) return;

    const mutation = `
        mutation {
            restoreUser(id: ${id}) {
                id
                name
                email
                deleted_at
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
            loadUserData();
            if (typeof showUserTab === 'function') {
                showUserTab('aktif');
            }
        }
    } catch (error) {
        alert('Terjadi kesalahan: ' + error.message);
    }
}

window.forceDeleteUser = async function(id) {
    if (!confirm('Apakah Anda yakin ingin menghapus user ini secara permanen? Tindakan ini tidak dapat dibatalkan!')) return;

    const mutation = `
        mutation {
            forceDeleteUser(id: ${id}) {
                id
                name
                email
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
            loadUserData();
        }
    } catch (error) {
        alert('Terjadi kesalahan: ' + error.message);
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
} 