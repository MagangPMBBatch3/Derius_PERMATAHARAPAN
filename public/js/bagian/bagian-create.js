window.createBagian = async function() {
    const nama = document.getElementById('addName').value.trim();

    // Clear previous errors
    document.getElementById('errorAddName').textContent = '';

    // Validation
    let hasError = false;
    if (!nama) {
        document.getElementById('errorAddName').textContent = 'Nama bagian tidak boleh kosong';
        hasError = true;
    }

    if (hasError) return;

    const mutation = `
        mutation {
            createBagian(input: { nama: "${nama}" }) {
                id
                nama
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
            document.getElementById('errorAddName').textContent = errorMessage;
        } else {
            closeAddModal();
            loadBagianData();
        }
    } catch (error) {
        document.getElementById('errorAddName').textContent = 'Terjadi kesalahan: ' + error.message;
    }
}

function getCsrfToken() {
    const meta = document.querySelector('meta[name="csrf-token"]');
    return meta ? meta.getAttribute('content') : '';
}
