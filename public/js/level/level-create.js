function openAddLevelModal() {
    document.getElementById('modalAddLevel').classList.remove('hidden');
}

function closeAddLevelModal() {
    document.getElementById('modalAddLevel').classList.add('hidden');
}

async function createLevel() {
    const nama = document.getElementById('addLevelNama').value.trim();
    if (!nama) {
        document.getElementById('errorAddLevelNama').textContent = 'Nama level harus diisi';
        return;
    } else {
        document.getElementById('errorAddLevelNama').textContent = '';
    }
    const mutation = `
        mutation {
            createLevel(input: { nama: "${nama}" }) {
                id
                nama
            }
        }
    `;
    await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: mutation })
    });
    closeAddLevelModal();
    loadLevelData();
}