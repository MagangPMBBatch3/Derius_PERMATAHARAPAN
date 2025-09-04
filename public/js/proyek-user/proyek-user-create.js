window.createProyekUser = async function() {
    const usersProfileId = document.getElementById('addUsersProfileId').value;
    const proyekId = document.getElementById('addProyekId').value;

    // Clear previous errors
    document.getElementById('errorAddUsersProfileId').textContent = '';
    document.getElementById('errorAddProyekId').textContent = '';

    // Validation
    let hasError = false;
    if (!usersProfileId) {
        document.getElementById('errorAddUsersProfileId').textContent = 'Users Profile harus dipilih';
        hasError = true;
    }
    if (!proyekId) {
        document.getElementById('errorAddProyekId').textContent = 'Proyek harus dipilih';
        hasError = true;
    }

    if (hasError) return;

    const mutation = `
        mutation {
            createProyekUser(input: {
                users_profile_id: "${usersProfileId}",
                proyek_id: "${proyekId}"
            }) {
                id
                users_profile_id
                proyek_id
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
            console.error('GraphQL mutation errors:', result.errors);
            document.getElementById('errorAddProyekId').textContent = errorMessage;
        } else {
            closeAddModal();
            loadProyekUserData();
        }
    } catch (error) {
        console.error('Fetch error:', error);
        document.getElementById('errorAddProyekId').textContent = 'Terjadi kesalahan: ' + error.message;
    }
}
