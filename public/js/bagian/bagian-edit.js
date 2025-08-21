async function updateBagian() {
    const id = document.getElementById('editId').value;
    const nama = document.getElementById('editName').value.trim();
    if (!nama) {
        document.getElementById('errorEditName').textContent = "Nama tidak boleh kosong";
        return;
    }

 const mutation = `
    mutation {
        updateBagian(input: { id: ${id}, nama: "${nama}" }) {
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
            document.getElementById('errorEditName').textContent = result.errors[0].message;
        } else {
            closeEditModal();
            loadData();
        }
    } catch (error) {
        document.getElementById('errorEditName').textContent = error.message;
    }
}