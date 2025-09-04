// filepath: public/js/statuses/statuses.js

function getCsrfToken() {
    const meta = document.querySelector('meta[name="csrf-token"]');
    return meta ? meta.getAttribute('content') : '';
}

window.loadStatusData = async function() {
    try {
        const queryAktif = `
            query {
                allStatuses {
                    id
                    nama
                }
            }
        `;
        const resAktif = await fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': getCsrfToken() },
            body: JSON.stringify({ query: queryAktif })
        });
        const dataAktif = await resAktif.json();
        renderStatusTable(dataAktif?.data?.allStatuses || [], 'dataStatuses', true);

        const queryArsip = `
            query {
                allStatusesArsip {
                    id
                    nama
                    deleted_at
                }
            }
        `;
        const resArsip = await fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': getCsrfToken() },
            body: JSON.stringify({ query: queryArsip })
        });
        const dataArsip = await resArsip.json();
        renderStatusTable(dataArsip?.data?.allStatusesArsip || [], 'dataStatusesArsip', false);
    } catch (e) {
        console.error('Error loading statuses:', e);
    }
}

function escapeHtml(text) {
    return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function renderStatusTable(items, tableId, isActive) {
    const tbody = document.getElementById(tableId);
    if (!tbody) return;
    tbody.innerHTML = '';
    if (!items.length) {
        tbody.innerHTML = `<tr><td colspan="3" class="text-center text-gray-500 p-3">Tidak ada data</td></tr>`;
        return;
    }
    items.forEach(item => {
        let actions = '';
        if (isActive) {
            actions = `
                <button onclick="openEditStatusModal(${item.id}, '${escapeHtml(item.nama)}')" class="inline-flex items-center px-3 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-800 font-semibold rounded-lg shadow-md hover:from-yellow-500 hover:to-yellow-600 transform hover:scale-105 transition-all duration-200 ease-in-out border-0 focus:outline-none focus:ring-2 focus:ring-yellow-300 mr-2">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                    Edit
                </button>
                <button onclick="archiveStatus(${item.id})" class="inline-flex items-center px-3 py-2 bg-gradient-to-r from-red-400 to-red-500 text-gray-800 font-semibold rounded-lg shadow-md hover:from-red-500 hover:to-red-600 transform hover:scale-105 transition-all duration-200 ease-in-out border-0 focus:outline-none focus:ring-2 focus:ring-red-300">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
                    </svg>
                    Arsipkan
                </button>
            `;
        } else {
            actions = `
                <button onclick="restoreStatus(${item.id})" class="inline-flex items-center px-3 py-2 bg-gradient-to-r from-green-400 to-green-500 text-white font-semibold rounded-lg shadow-md hover:from-green-500 hover:to-green-600 transform hover:scale-105 transition-all duration-200 ease-in-out border-0 focus:outline-none focus:ring-2 focus:ring-green-300 mr-2">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"></path>
                    </svg>
                    Restore
                </button>
                <button onclick="forceDeleteStatus(${item.id})" class="inline-flex items-center px-3 py-2 bg-gradient-to-r from-red-600 to-red-700 text-gray-800 font-semibold rounded-lg shadow-md hover:from-red-700 hover:to-red-800 transform hover:scale-105 transition-all duration-200 ease-in-out border-0 focus:outline-none focus:ring-2 focus:ring-red-300">
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

window.searchStatus = async function() {
    const keyword = document.getElementById('searchStatus').value.trim();
    if (!keyword) return loadStatusData();

    const isNumeric = !isNaN(keyword);
    const query = isNumeric
        ? `query { status(id: ${keyword}) { id nama } }`
        : `query { statusesByNama(nama: "${keyword}") { id nama } }`;

    const res = await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': getCsrfToken() },
        body: JSON.stringify({ query })
    });
    const data = await res.json();

    if (isNumeric) {
        const item = data?.data?.status;
        renderStatusTable(item ? [item] : [], 'dataStatuses', true);
        document.getElementById('dataStatusesArsip').innerHTML = '';
    } else {
        const items = data?.data?.statusesByNama || [];
        renderStatusTable(items, 'dataStatuses', true);
        document.getElementById('dataStatusesArsip').innerHTML = '';
    }
}

window.showStatusTab = function(tab) {
    const tabAktif = document.getElementById('tabStatusAktif');
    const tabArsip = document.getElementById('tabStatusArsip');
    const tableAktif = document.getElementById('statusTableAktif');
    const tableArsip = document.getElementById('statusTableArsip');

    if (tab === 'aktif') {
        tabAktif.classList.add('bg-blue-500', 'text-white');
        tabAktif.classList.remove('bg-gray-300', 'text-black');
        tabArsip.classList.remove('bg-blue-500', 'text-white');
        tabArsip.classList.add('bg-gray-300', 'text-black');
        tableAktif.classList.remove('hidden');
        tableArsip.classList.add('hidden');
    } else {
        tabArsip.classList.add('bg-blue-500', 'text-white');
        tabArsip.classList.remove('bg-gray-300', 'text-black');
        tabAktif.classList.remove('bg-blue-500', 'text-white');
        tabAktif.classList.add('bg-gray-300', 'text-black');
        tableArsip.classList.remove('hidden');
        tableAktif.classList.add('hidden');
    }
}

window.openAddStatusModal = function() {
    document.getElementById('modalAddStatus').classList.remove('hidden');
}
window.closeAddStatusModal = function() {
    document.getElementById('modalAddStatus').classList.add('hidden');
    const input = document.getElementById('addStatusName');
    if (input) input.value = '';
    const err = document.getElementById('errorAddStatusName');
    if (err) err.textContent = '';
}

window.openEditStatusModal = function(id, nama) {
    document.getElementById('editStatusId').value = id;
    document.getElementById('editStatusName').value = nama;
    document.getElementById('modalEditStatus').classList.remove('hidden');
}
window.closeEditStatusModal = function() {
    document.getElementById('modalEditStatus').classList.add('hidden');
    const input = document.getElementById('editStatusName');
    if (input) input.value = '';
    const err = document.getElementById('errorEditStatusName');
    if (err) err.textContent = '';
} 