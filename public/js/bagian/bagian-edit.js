window.updateBagian = async function() {
    const id = document.getElementById('editId').value;
    const nama = document.getElementById('editName').value.trim();

    // Clear previous errors
    document.getElementById('errorEditName').textContent = '';

    // Validation
    let hasError = false;
    if (!nama) {
        document.getElementById('errorEditName').textContent = 'Nama bagian tidak boleh kosong';
        hasError = true;
    }

    if (hasError) return;

    const mutation = `
        mutation {
            updateBagian(input: { id: ${id}, nama: "${nama}" }) {
                id
                nama
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
            document.getElementById('errorEditName').textContent = errorMessage;
        } else {
            closeEditModal();
            loadBagianData();
        }
    } catch (error) {
        document.getElementById('errorEditName').textContent = 'Terjadi kesalahan: ' + error.message;
    }
}

window.deleteBagian = async function(id) {
    if (!confirm('Apakah Anda yakin ingin menghapus bagian ini?')) return;

    const mutation = `
        mutation {
            deleteBagian(id: ${id}) {
                id
                nama
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
            loadBagianData();
        }
    } catch (error) {
        alert('Terjadi kesalahan: ' + error.message);
    }
}

function getCsrfToken() {
    const meta = document.querySelector('meta[name="csrf-token"]');
    return meta ? meta.getAttribute('content') : '';
}
