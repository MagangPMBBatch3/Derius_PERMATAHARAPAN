// filepath: public/js/bagian/bagian-create.js

function openAddModal() {
    document.getElementById('modalAdd').classList.remove('hidden');
}

function closeAddModal() {
    document.getElementById('modalAdd').classList.add('hidden');
    document.getElementById('addName').value = '';
    document.getElementById('errorAddName').textContent = '';
}

async function createBagian() {
    const nama = document.getElementById('addName').value.trim();
    
    // Clear previous error
    document.getElementById('errorAddName').textContent = '';
    
    if (!nama) {
        document.getElementById('errorAddName').textContent = "Nama tidak boleh kosong";
        return;
    }

    const mutation = `
        mutation {
            createBagian(input: { nama: "${nama}" }) {
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
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
            },
            body: JSON.stringify({ query: mutation })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();

        if (result.errors) {
            throw new Error(result.errors[0].message);
        }

        // Success
        closeAddModal();
        
        // Reload data - pastikan fungsi ini ada
        if (typeof loadData === "function") {
            loadData();
        } else if (typeof fetchData === "function") {
            fetchData();
        } else {
            // Refresh halaman jika tidak ada fungsi reload
            window.location.reload();
        }
        
        alert('Data berhasil ditambahkan!');
        
    } catch (error) {
        console.error('Error creating bagian:', error);
        document.getElementById('errorAddName').textContent = 'Gagal membuat bagian: ' + error.message;
    }
}