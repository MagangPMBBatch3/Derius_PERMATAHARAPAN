window.updateProyek = async function() {
    const id = document.getElementById('editId').value;
    const kode = document.getElementById('editKode').value.trim();
    const nama = document.getElementById('editNama').value.trim();
    const tanggal = document.getElementById('editTanggal').value;

    // Clear previous errors
    document.getElementById('errorEditKode').textContent = '';
    document.getElementById('errorEditNama').textContent = '';
    document.getElementById('errorEditTanggal').textContent = '';

    // Validation
    let hasError = false;
    if (!nama) {
        document.getElementById('errorEditNama').textContent = 'Nama proyek tidak boleh kosong';
        hasError = true;
    }

    if (hasError) return;

    const mutation = `
        mutation {
            updateProyek(id: ${id}, input: {
                kode: "${kode || null}",
                nama: "${nama}",
                tanggal: "${tanggal || null}"
            }) {
                id
                kode
                nama
                tanggal
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
            if (errorMessage.includes('nama')) {
                document.getElementById('errorEditNama').textContent = 'Nama proyek sudah digunakan';
            } else {
                document.getElementById('errorEditNama').textContent = errorMessage;
            }
        } else {
            closeEditModal();
            loadProyekData();
        }
    } catch (error) {
        document.getElementById('errorEditNama').textContent = 'Terjadi kesalahan: ' + error.message;
    }
}

window.deleteProyek = async function(id) {
    if (!confirm('Apakah Anda yakin ingin menghapus proyek ini?')) return;

    const mutation = `
        mutation {
            deleteProyek(id: ${id}) {
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
            loadProyekData();
        }
    } catch (error) {
        alert('Terjadi kesalahan: ' + error.message);
    }
}
