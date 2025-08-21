// filepath: public/js/bagian/bagian.js

async function fetchData(queryType = "all") {
    let query;
    const searchValue = document.getElementById('search').value.trim();

    if (queryType === "search" && searchValue) {
        if (!isNaN(searchValue)) {  // If search value is a number
            query = `
                query {
                    bagian(id: ${searchValue}) {
                        id
                        nama
                    }
                }
            `;
        } else {  // If search value is text
            query = `
                query {
                    bagianByNama(nama: "${searchValue}") {
                        id
                        nama
                    }
                }
            `;
        }
    } else {  // Default query (get all)
        query = `
            query {
                allBagian {
                    id
                    nama
                }
            }
        `;
    }

    try {
        const response = await fetch('/graphql', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
            },
            body: JSON.stringify({ query })
        });
        
        const data = await response.json();
        const tbody = document.getElementById('dataBagian'); // Sesuaikan dengan HTML
        tbody.innerHTML = "";
        
        let items = [];
        if (data.data?.allBagian) items = data.data.allBagian;
        if (data.data?.bagianByNama) items = data.data.bagianByNama;
        if (data.data?.bagian) items = [data.data.bagian];
        
        if (items.length === 0) {
            tbody.innerHTML = '<tr><td colspan="3" class="text-center p-2">Data tidak ditemukan</td></tr>';
            return;
        }

        // Render items
        items.forEach((item) => {
            if (!item) return;
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="border p-2">${item.id}</td>
                <td class="border p-2">${item.nama}</td>
                <td class="border p-2">
                    <div class="flex gap-1">
                        <button onclick="openEditModal(${item.id}, '${item.nama}')" 
                                class="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600">
                            Edit
                        </button>
                        <button onclick="hapusBagian(${item.id})" 
                                class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
                            Hapus
                        </button>
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });

    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('dataBagian').innerHTML = 
            '<tr><td colspan="3" class="text-center p-2">Error loading data</td></tr>';
    }
}

// Alias untuk konsistensi
function loadData(queryType = "all") {
    fetchData(queryType);
}

function searchBagian() {
    loadData("search");
}

async function hapusBagian(id) {
    if (!confirm("Yakin ingin menghapus data ini?")) return;
    
    const mutation = `
        mutation {
            deleteBagian(id: ${id}) {
                id
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

        const result = await response.json();
        
        if (result.errors) {
            throw new Error(result.errors[0].message);
        }
        
        loadData();
        alert('Data berhasil dihapus!');
        
    } catch (error) {
        console.error('Error deleting data:', error);
        alert('Gagal menghapus data: ' + error.message);
    }
}

// Load data when page loads
document.addEventListener("DOMContentLoaded", () => loadData());