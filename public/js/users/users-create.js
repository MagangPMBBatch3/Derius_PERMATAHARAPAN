// filepath: public/js/users/users-create.js

window.createUser = async function() {
    const name = document.getElementById('addUserName').value.trim();
    const email = document.getElementById('addUserEmail').value.trim();
    const password = document.getElementById('addUserPassword').value;

    // Clear previous errors
    document.getElementById('errorAddUserName').textContent = '';
    document.getElementById('errorAddUserEmail').textContent = '';
    document.getElementById('errorAddUserPassword').textContent = '';

    // Validation
    let hasError = false;
    if (!name) {
        document.getElementById('errorAddUserName').textContent = 'Nama tidak boleh kosong';
        hasError = true;
    }
    if (!email) {
        document.getElementById('errorAddUserEmail').textContent = 'Email tidak boleh kosong';
        hasError = true;
    } else if (!isValidEmail(email)) {
        document.getElementById('errorAddUserEmail').textContent = 'Format email tidak valid';
        hasError = true;
    }
    if (!password) {
        document.getElementById('errorAddUserPassword').textContent = 'Password tidak boleh kosong';
        hasError = true;
    } else if (password.length < 6) {
        document.getElementById('errorAddUserPassword').textContent = 'Password minimal 6 karakter';
        hasError = true;
    }

    if (hasError) return;

    const mutation = `
        mutation {
            createUser(input: { 
                name: "${name}", 
                email: "${email}", 
                password: "${password}" 
            }) {
                id
                name
                email
                created_at
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
                document.getElementById('errorAddUserEmail').textContent = 'Email sudah digunakan';
            } else {
                document.getElementById('errorAddUserName').textContent = errorMessage;
            }
        } else {
            closeAddUserModal();
            loadUserData();
        }
    } catch (error) {
        document.getElementById('errorAddUserName').textContent = 'Terjadi kesalahan: ' + error.message;
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
} 