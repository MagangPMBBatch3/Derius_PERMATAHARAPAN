// filepath: public/js/statuses/statuses-create.js

window.createStatus = async function() {
    const nama = document.getElementById('addStatusName').value.trim();
    if (!nama) {
        document.getElementById('errorAddStatusName').textContent = 'Nama tidak boleh kosong';
        return;
    }

    const mutation = `
        mutation {
            createStatus(input: { nama: "${nama}" }) {
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
            document.getElementById('errorAddStatusName').textContent = result.errors[0].message;
        } else {
            closeAddStatusModal();
            loadStatusData();
        }
    } catch (error) {
        document.getElementById('errorAddStatusName').textContent = error.message;
    }
} 