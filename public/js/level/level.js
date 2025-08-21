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
                        class="bg-yellow-500 text-white px-2 py-1 rounded mr-1 hover:bg-yellow-600 transition">
                    Edit
                </button>
                <button onclick="archiveLevel(${item.id})" 
                        class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition">
                    Arsipkan
                </button>
            `;
        } else {
            actions = `
                <button onclick="restoreLevel(${item.id})" 
                        class="bg-green-500 text-white px-2 py-1 rounded mr-1 hover:bg-green-600 transition">
                    Restore
                </button>
                <button onclick="forceDeleteLevel(${item.id})" 
                        class="bg-red-700 text-white px-2 py-1 rounded hover:bg-red-800 transition">
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
