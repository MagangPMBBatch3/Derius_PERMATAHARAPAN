// filepath: public/js/bagian/bagian-edit.js

async function updateBagian() {
    const id = document.getElementById('editId').value;
    const nama = document.getElementById('editName').value.trim();
    
    // Clear previous error
    document.getElementById('errorEditName').textContent = '';
    
    if (!nama) {
        document.getElementById('errorEditName').textContent = "Nama tidak boleh kosong";
        return;
    }

    const mutation = `
        mutation {
            updateBagian(input: { 
                id: ${id}, 
                nama: "${nama}" 
            }) {
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

        closeEditModal();
        
        // Reload data
        if (typeof loadData === "function") {
            loadData();
        } else if (typeof fetchData === "function") {
            fetchData();
        } else {
            window.location.reload();
        }
        
        alert('Data berhasil diupdate!');
        
    } catch (error) {
        console.error('Error updating data:', error);
        document.getElementById('errorEditName').textContent = 'Gagal memperbarui data: ' + error.message;
    }
}