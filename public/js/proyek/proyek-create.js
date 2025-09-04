window.createProyek = async function() {
    const kode = document.getElementById('addKode').value.trim();
    const nama = document.getElementById('addNama').value.trim();
    const tanggal = document.getElementById('addTanggal').value;

    // Clear previous errors
    document.getElementById('errorAddKode').textContent = '';
    document.getElementById('errorAddNama').textContent = '';
    document.getElementById('errorAddTanggal').textContent = '';

    // Validation
    let hasError = false;
    if (!nama) {
        document.getElementById('errorAddNama').textContent = 'Nama proyek tidak boleh kosong';
        hasError = true;
    }

    if (hasError) return;

    const mutation = `
        mutation {
            createProyek(input: {
                kode: "${kode || null}",
                nama: "${nama}",
                tanggal: "${tanggal || null}"
            }) {
                id
                kode
                nama
                tanggal
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
            if (errorMessage.includes('nama')) {
                document.getElementById('errorAddNama').textContent = 'Nama proyek sudah digunakan';
            } else {
                document.getElementById('errorAddNama').textContent = errorMessage;
            }
        } else {
            closeAddModal();
            loadProyekData();
        }
    } catch (error) {
        document.getElementById('errorAddNama').textContent = 'Terjadi kesalahan: ' + error.message;
    }
}
