// Main Level CRUD Functions

// Load data when page loads
async function loadLevelData() {
    try {
        // Load active data
        const queryAktif = `
            query {
                allLevel {
                    id
                    nama
                }
            }
        `;

        const resAktif = await fetch('/graphql', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': getCsrfToken()
            },
            body: JSON.stringify({ query: queryAktif })
        });
        
        const dataAktif = await resAktif.json();
        if (dataAktif.errors) {
            console.error('GraphQL errors (active):', dataAktif.errors);
            showError('Gagal memuat data aktif');
        } else {
            renderLevelTable(dataAktif?.data?.allLevel || [], 'dataLevel', true);
        }

        // Load archived data
        const queryArsip = `
            query {
                allLevelArsip {
                    id
                    nama
                    deleted_at
                }
            }
        `;

        const resArsip = await fetch('/graphql', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': getCsrfToken()
            },
            body: JSON.stringify({ query: queryArsip })
        });
        
        const dataArsip = await resArsip.json();
        if (dataArsip.errors) {
            console.error('GraphQL errors (archive):', dataArsip.errors);
            showError('Gagal memuat data arsip');
        } else {
            renderLevelTable(dataArsip?.data?.allLevelArsip || [], 'dataLevelArsip', false);
        }

    } catch (error) {
        console.error('Error loading data:', error);
        showError('Terjadi kesalahan saat memuat data');
    }
}

// Render table data
function renderLevelTable(levels, tableId, isActive) {
    const tbody = document.getElementById(tableId);
    if (!tbody) {
        console.error(`Table body ${tableId} not found`);
        return;
    }

    tbody.innerHTML = "";

    if (!levels.length) {
        tbody.innerHTML = `<tr><td colspan="3" class="text-center text-gray-500 p-3">Tidak ada data</td></tr>`;
        return;
    }

    levels.forEach(item => {
        let actions = "";
        if (isActive) {
            actions = `
                <button onclick="openEditLevelModal(${item.id}, '${escapeHtml(item.nama)}')" 
                        class="inline-flex items-center px-3 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-800 font-semibold rounded-lg shadow-md hover:from-yellow-500 hover:to-yellow-600 transform hover:scale-105 transition-all duration-200 ease-in-out border-0 focus:outline-none focus:ring-2 focus:ring-yellow-300 mr-2">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                    Edit
                </button>
                <button onclick="archiveLevel(${item.id})" 
                        class="inline-flex items-center px-3 py-2 bg-gradient-to-r from-red-400 to-red-500 text-gray-800 font-semibold rounded-lg shadow-md hover:from-red-500 hover:to-red-600 transform hover:scale-105 transition-all duration-200 ease-in-out border-0 focus:outline-none focus:ring-2 focus:ring-red-300">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
                    </svg>
                    Arsipkan
                </button>
            `;
        } else {
            actions = `
                <button onclick="restoreLevel(${item.id})" 
                        class="inline-flex items-center px-3 py-2 bg-gradient-to-r from-green-400 to-green-500 text-white font-semibold rounded-lg shadow-md hover:from-green-500 hover:to-green-600 transform hover:scale-105 transition-all duration-200 ease-in-out border-0 focus:outline-none focus:ring-2 focus:ring-green-300 mr-2">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"></path>
                    </svg>
                    Restore
                </button>
                <button onclick="forceDeleteLevel(${item.id})" 
                        class="inline-flex items-center px-3 py-2 bg-gradient-to-r from-red-600 to-red-700 text-gray-800 font-semibold rounded-lg shadow-md hover:from-red-700 hover:to-red-800 transform hover:scale-105 transition-all duration-200 ease-in-out border-0 focus:outline-none focus:ring-2 focus:ring-red-300">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                    Hapus Permanen
                </button>
            `;
        }

        tbody.innerHTML += `
            <tr>
                <td class="border p-2">${item.id}</td>
                <td class="border p-2">${escapeHtml(item.nama)}</td>
                <td class="border p-2">${actions}</td>
            </tr>
        `;
    });
}

// ADD MODAL FUNCTIONS
function openAddLevelModal() {
    document.getElementById('modalAddLevel').classList.remove('hidden');
    document.getElementById('addLevelNama').focus();
    clearAddErrors();
}

function closeAddLevelModal() {
    document.getElementById('modalAddLevel').classList.add('hidden');
    document.getElementById('addLevelNama').value = '';
    clearAddErrors();
}

function clearAddErrors() {
    document.getElementById('errorAddLevelNama').textContent = '';
}

// CREATE LEVEL FUNCTION
async function createLevel() {
    const nama = document.getElementById('addLevelNama').value.trim();
    
    clearAddErrors();
    
    if (!nama) {
        document.getElementById('errorAddLevelNama').textContent = 'Nama level harus diisi';
        return;
    }
    
    if (nama.length < 2) {
        document.getElementById('errorAddLevelNama').textContent = 'Nama level minimal 2 karakter';
        return;
    }
    
    const mutation = `
        mutation {
            createLevel(input: { nama: "${escapeGraphQL(nama)}" }) {
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
            console.error('GraphQL errors:', result.errors);
            document.getElementById('errorAddLevelNama').textContent = 
                result.errors[0]?.message || 'Terjadi kesalahan saat menyimpan';
            return;
        }
        
        closeAddLevelModal();
        loadLevelData();
        showSuccess('Data level berhasil ditambahkan');
        
    } catch (error) {
        console.error('Error creating level:', error);
        document.getElementById('errorAddLevelNama').textContent = 'Terjadi kesalahan jaringan';
    }
}

// EDIT MODAL FUNCTIONS  
function openEditLevelModal(id, nama) {
    document.getElementById('editLevelId').value = id;
    document.getElementById('editLevelNama').value = nama;
    document.getElementById('modalEditLevel').classList.remove('hidden');
    document.getElementById('editLevelNama').focus();
    clearEditErrors();
}

function closeEditLevelModal() {
    document.getElementById('modalEditLevel').classList.add('hidden');
    document.getElementById('editLevelNama').value = '';
    document.getElementById('editLevelId').value = '';
    clearEditErrors();
}

function clearEditErrors() {
    document.getElementById('errorEditLevelNama').textContent = '';
}

// UPDATE LEVEL FUNCTION
async function updateLevel() {
    const id = document.getElementById('editLevelId').value;
    const nama = document.getElementById('editLevelNama').value.trim();
    
    clearEditErrors();
    
    if (!nama) {
        document.getElementById('errorEditLevelNama').textContent = 'Nama level harus diisi';
        return;
    }
    
    if (nama.length < 2) {
        document.getElementById('errorEditLevelNama').textContent = 'Nama level minimal 2 karakter';
        return;
    }
    
    const mutation = `
        mutation {
            updateLevel(id: ${id}, input: { nama: "${escapeGraphQL(nama)}" }) {
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
            console.error('GraphQL errors:', result.errors);
            document.getElementById('errorEditLevelNama').textContent = 
                result.errors[0]?.message || 'Terjadi kesalahan saat mengupdate';
            return;
        }
        
        closeEditLevelModal();
        loadLevelData();
        showSuccess('Data level berhasil diupdate');
        
    } catch (error) {
        console.error('Error updating level:', error);
        document.getElementById('errorEditLevelNama').textContent = 'Terjadi kesalahan jaringan';
    }
}

// ARCHIVE FUNCTION
async function archiveLevel(id) {
    if (!confirm('Apakah Anda yakin ingin memindahkan data ini ke arsip?')) return;
    
    const mutation = `
        mutation {
            deleteLevel(id: ${id}) { 
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
            console.error('GraphQL errors:', result.errors);
            showError(result.errors[0]?.message || 'Gagal mengarsipkan data');
            return;
        }
        
        loadLevelData();
        showSuccess('Data berhasil dipindahkan ke arsip');
        
    } catch (error) {
        console.error('Error archiving level:', error);
        showError('Terjadi kesalahan jaringan');
    }
}

// RESTORE FUNCTION
async function restoreLevel(id) {
    if (!confirm('Apakah Anda yakin ingin mengembalikan data ini dari arsip?')) return;
    
    const mutation = `
        mutation {
            restoreLevel(id: ${id}) { 
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
            console.error('GraphQL errors:', result.errors);
            showError(result.errors[0]?.message || 'Gagal mengembalikan data');
            return;
        }
        
        loadLevelData();
        showSuccess('Data berhasil dikembalikan dari arsip');
        
    } catch (error) {
        console.error('Error restoring level:', error);
        showError('Terjadi kesalahan jaringan');
    }
}

// FORCE DELETE FUNCTION
async function forceDeleteLevel(id) {
    if (!confirm('PERINGATAN: Data akan dihapus permanen dan tidak bisa dikembalikan!\n\nApakah Anda yakin?')) return;
    
    const mutation = `
        mutation {
            forceDeleteLevel(id: ${id}) { 
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
            console.error('GraphQL errors:', result.errors);
            showError(result.errors[0]?.message || 'Gagal menghapus data');
            return;
        }
        
        loadLevelData();
        showSuccess('Data berhasil dihapus permanen');
        
    } catch (error) {
        console.error('Error force deleting level:', error);
        showError('Terjadi kesalahan jaringan');
    }
}

// SEARCH FUNCTION
async function searchLevel() {
    const keyword = document.getElementById('searchLevel').value.trim();
    
    if (!keyword) {
        loadLevelData();
        return;
    }

    try {
        let query = '';
        let data = [];

        if (!isNaN(keyword)) {
            // Search by ID
            query = `
                query {
                    level(id: ${parseInt(keyword)}) {
                        id
                        nama
                    }
                }
            `;
        } else {
            // Search by name
            query = `
                query {
                    levelByNama(nama: "%${escapeGraphQL(keyword)}%") {
                        id
                        nama
                    }
                }
            `;
        }

        const response = await fetch('/graphql', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': getCsrfToken()
            },
            body: JSON.stringify({ query })
        });
        
        const result = await response.json();
        
        if (result.errors) {
            console.error('GraphQL errors:', result.errors);
            data = [];
        } else {
            if (!isNaN(keyword)) {
                data = result.data.level ? [result.data.level] : [];
            } else {
                data = result.data.levelByNama || [];
            }
        }
        
        renderLevelTable(data, 'dataLevel', true);
        
    } catch (error) {
        console.error('Error searching level:', error);
        showError('Terjadi kesalahan saat mencari data');
    }
}

// UTILITY FUNCTIONS
function getCsrfToken() {
    return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

function escapeGraphQL(str) {
    return str.replace(/\\/g, '\\\\')
              .replace(/"/g, '\\"')
              .replace(/\n/g, '\\n')
              .replace(/\r/g, '\\r')
              .replace(/\t/g, '\\t');
}

function showSuccess(message) {
    // Simple alert for now - you can implement toast later
    alert('✅ ' + message);
    console.log('Success:', message);
}

function showError(message) {
    // Simple alert for now - you can implement toast later
    alert('❌ ' + message);
    console.error('Error:', message);
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadLevelData();
});
