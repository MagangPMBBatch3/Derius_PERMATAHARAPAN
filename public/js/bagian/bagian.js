function getCsrfToken() {
    const meta = document.querySelector('meta[name="csrf-token"]');
    return meta ? meta.getAttribute('content') : '';
}

window.loadBagianData = async function() {
    try {
        const query = `
            query {
                allBagian {
                    id
                    nama
                    created_at
                }
            }
        `;
        const res = await fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': getCsrfToken() },
            body: JSON.stringify({ query })
        });
        const data = await res.json();
        renderBagianCards(data?.data?.allBagian || []);
    } catch (e) {
        console.error('Error loading bagian:', e);
    }
}

function escapeHtml(text) {
    return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '<')
        .replace(/>/g, '>')
        .replace(/"/g, '"')
        .replace(/'/g, '&#039;');
}

function renderBagianCards(items) {
    const container = document.getElementById('bagianContainer');
    if (!container) return;
    container.innerHTML = '';
    
    if (!items.length) {
        container.innerHTML = `
            <div class="col-span-full text-center py-16">
                <div class="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 border-2 border-dashed border-gray-200">
                    <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                    </svg>
                    <p class="text-xl font-semibold text-gray-600 mb-2">Tidak ada data bagian</p>
                    <p class="text-gray-500">Mulai dengan menambahkan bagian pertama Anda</p>
                </div>
            </div>
        `;
        return;
    }
    
    items.forEach(item => {
        container.innerHTML += `
            <div class="relative bg-gradient-to-br from-white via-slate-50 to-blue-50 rounded-2xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition-all duration-300 group">
                <div class="flex items-start space-x-4 mb-4">
                    <div class="relative flex-shrink-0">
                        <div class="w-16 h-16 rounded-full border-3 border-white shadow-lg overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                            </svg>
                        </div>
                    </div>
                    <div class="flex-1 min-w-0">
                        <h3 class="text-xl font-bold text-gray-900 mb-1 truncate">${escapeHtml(item.nama)}</h3>
                        <p class="text-sm text-blue-600 font-medium mb-2">ID: ${item.id}</p>
                        <div class="text-xs text-gray-500">
                            Dibuat: ${new Date(item.created_at).toLocaleDateString('id-ID')}
                        </div>
                    </div>
                </div>

                <div class="flex flex-wrap gap-2 pt-3 mt-3 border-t border-blue-100">
                    <button onclick="openEditModal(${item.id}, '${escapeHtml(item.nama)}')" 
                            class="inline-flex items-center px-3 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-800 font-semibold rounded-lg shadow-md hover:from-yellow-500 hover:to-yellow-600 transform hover:scale-105 transition-all duration-200 ease-in-out border-0 focus:outline-none focus:ring-2 focus:ring-yellow-300 mr-2">
                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                        Edit
                    </button>
                    <button onclick="deleteBagian(${item.id})" 
                            class="inline-flex items-center px-3 py-2 bg-gradient-to-r from-red-400 to-red-500 text-white font-semibold rounded-lg shadow-md hover:from-red-500 hover:to-red-600 transform hover:scale-105 transition-all duration-200 ease-in-out border-0 focus:outline-none focus:ring-2 focus:ring-red-300">
                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                        Hapus
                    </button>
                </div>
            </div>
        `;
    });
}

window.searchBagian = async function() {
    const keyword = document.getElementById('searchBagian').value.trim();
    if (!keyword) return loadBagianData();

    const isNumeric = !isNaN(keyword);
    const query = isNumeric
        ? `query { bagian(id: ${keyword}) { id nama created_at } }`
        : `query { bagianByNama(nama: "${keyword}") { id nama created_at } }`;

    const res = await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': getCsrfToken() },
        body: JSON.stringify({ query })
    });
    const data = await res.json();

    if (isNumeric) {
        const item = data?.data?.bagian;
        renderBagianCards(item ? [item] : []);
    } else {
        const items = data?.data?.bagianByNama || [];
        renderBagianCards(items);
    }
}

window.openAddModal = function() {
    document.getElementById('modalAdd').classList.remove('hidden');
}

window.closeAddModal = function() {
    document.getElementById('modalAdd').classList.add('hidden');
    const inputs = ['addName'];
    inputs.forEach(id => {
        const input = document.getElementById(id);
        if (input) input.value = '';
    });
    const errors = ['errorAddName'];
    errors.forEach(id => {
        const err = document.getElementById(id);
        if (err) err.textContent = '';
    });
}

window.openEditModal = function(id, nama) {
    document.getElementById('editId').value = id;
    document.getElementById('editName').value = nama;
    document.getElementById('modalEdit').classList.remove('hidden');
}

window.closeEditModal = function() {
    document.getElementById('modalEdit').classList.add('hidden');
    const inputs = ['editName'];
    inputs.forEach(id => {
        const input = document.getElementById(id);
        if (input) input.value = '';
    });
    const errors = ['errorEditName'];
    errors.forEach(id => {
        const err = document.getElementById(id);
        if (err) err.textContent = '';
    });
}
