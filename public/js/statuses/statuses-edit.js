// filepath: public/js/statuses/statuses-edit.js

window.updateStatus = async function() {
    const id = document.getElementById('editStatusId').value;
    const nama = document.getElementById('editStatusName').value.trim();
    if (!nama) {
        document.getElementById('errorEditStatusName').textContent = 'Nama tidak boleh kosong';
        return;
    }

    const mutation = `
        mutation {
            updateStatus(input: { id: ${id}, nama: "${nama}" }) {
                id
                nama
            }
        }
    `;

    try {
        const response = await fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: mutation })
        });
        const result = await response.json();

        if (result.errors) {
            document.getElementById('errorEditStatusName').textContent = result.errors[0].message;
        } else {
            closeEditStatusModal();
            loadStatusData();
        }
    } catch (error) {
        document.getElementById('errorEditStatusName').textContent = error.message;
    }
}

window.archiveStatus = async function(id) {
    if (!confirm('Apakah Anda yakin ingin memindahkan data ini ke arsip?')) return;

    const mutation = `
        mutation {
            deleteStatus(id: ${id}) { id }
        }
    `;

    try {
        await fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: mutation })
        });
        loadStatusData();
    } catch (error) {
        alert('Gagal mengarsipkan data: ' + error.message);
    }
}

window.restoreStatus = async function(id) {
    if (!confirm('Apakah Anda yakin ingin mengembalikan data ini dari arsip?')) return;

    const mutation = `
        mutation { restoreStatus(id: ${id}) { id nama } }
    `;

    try {
        await fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: mutation })
        });
        loadStatusData();
    } catch (error) {
        alert('Gagal restore data: ' + error.message);
    }
}

window.forceDeleteStatus = async function(id) {
    if (!confirm('Apakah Anda yakin ingin menghapus permanen data ini?')) return;

    const mutation = `
        mutation { forceDeleteStatus(id: ${id}) { id } }
    `;

    try {
        await fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: mutation })
        });
        loadStatusData();
    } catch (error) {
        alert('Gagal menghapus permanen: ' + error.message);
    }
} 