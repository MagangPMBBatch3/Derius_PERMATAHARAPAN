{{-- filepath: resources/views/bagian/index.blade.php --}}
<x-layouts.main title="Data Bagian">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <div class="bg-white p-4 rounded shadow w-full">
        <h1 class="text-2xl font-bold mb-4">Data Bagian</h1>

        {{-- Tombol Tambah & Pencarian --}}
        <div class="flex justify-between mb-4">
            <input type="text" id="search" placeholder="Cari ID atau Nama..."
                   class="border p-2 rounded w-64" oninput="searchBagian()">
            <button onclick="openAddModal()"
                    class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                Tambah Data
            </button>
        </div>

        {{-- Tabel Data --}}
        <table class="w-full border">
            <thead class="bg-gray-200">
                <tr>
                    <th class="p-2 border">ID</th>
                    <th class="p-2 border">Nama</th>
                    <th class="p-2 border">Aksi</th>
                </tr>
            </thead>
            <tbody id="dataBagian"></tbody>
        </table>
    </div>

    {{-- Include Modal Tambah --}}
    @include('components.bagian.modal-add')

    {{-- Include Modal Edit --}}
    @include('components.bagian.modal-edit')

    <script>
        // Ambil dan tampilkan data
        async function loadData(queryType = "all") {
            let query;
            const searchValue = document.getElementById('search').value.trim();

            if (queryType === "search" && searchValue) {
                if (!isNaN(searchValue)) {
                    query = `
                        query {
                            bagian(id: ${searchValue}) {
                                id
                                nama
                            }
                        }
                    `;
                } else {
                    query = `
                        query {
                            bagianByNama(nama: "${searchValue}") {
                                id
                                nama
                            }
                        }
                    `;
                }
            } else {
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
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ query })
                });

                const data = await response.json();
                const tbody = document.getElementById('dataBagian');
                tbody.innerHTML = "";

                let items = [];
                if (data.data?.allBagian) items = data.data.allBagian;
                if (data.data?.bagianByNama) items = data.data.bagianByNama;
                if (data.data?.bagian) items = [data.data.bagian];

                if (!items || items.length === 0) {
                    tbody.innerHTML = '<tr><td colspan="3" class="text-center p-2">Data tidak ditemukan</td></tr>';
                    return;
                }

                items.forEach(item => {
                    tbody.innerHTML += `
                        <tr>
                            <td class="p-2 border">${item.id}</td>
                            <td class="p-2 border">${item.nama}</td>
                            <td class="p-2 border flex gap-1">
                                <button onclick="openEditModal(${item.id}, '${item.nama}')" class="bg-yellow-500 text-black px-2 py-1 rounded">Edit</button>
                                <button onclick="hapusBagian(${item.id})" class="bg-red-500 text-black px-2 py-1 rounded">Hapus</button>
                            </td>
                        </tr>
                    `;
                });

            } catch (error) {
                console.error('Error fetching data:', error);
                document.getElementById('dataBagian').innerHTML =
                    '<tr><td colspan="3" class="text-center p-2">Error loading data</td></tr>';
            }
        }

        function searchBagian() {
            loadData("search");
        }

        // Modal Tambah
        function openAddModal() {
            document.getElementById('modalAdd').classList.remove('hidden');
        }
        function closeAddModal() {
            document.getElementById('modalAdd').classList.add('hidden');
            document.getElementById('addName').value = '';
            document.getElementById('errorAddName').textContent = '';
        }

        // Tambah Data
        async function createBagian() {
            const nama = document.getElementById('addName').value.trim();
            if (!nama) {
                document.getElementById('errorAddName').textContent = "Nama tidak boleh kosong";
                return;
            }

            const mutation = `
                mutation {
                    createBagian(input: { nama: "${nama}" }) {
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
                    document.getElementById('errorAddName').textContent = result.errors[0].message;
                } else {
                    closeAddModal();
                    loadData();
                }
            } catch (error) {
                document.getElementById('errorAddName').textContent = error.message;
            }
        }

        // Modal Edit
        function openEditModal(id, nama) {
            document.getElementById('editId').value = id;
            document.getElementById('editName').value = nama;
            document.getElementById('modalEdit').classList.remove('hidden');
        }
        function closeEditModal() {
            document.getElementById('modalEdit').classList.add('hidden');
            document.getElementById('editName').value = '';
            document.getElementById('errorEditName').textContent = '';
        }

        // Update Data
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

        // Hapus Data
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
                await fetch('/graphql', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ query: mutation })
                });
                loadData();
            } catch (error) {
                alert('Gagal menghapus data: ' + error.message);
            }
        }

        // Load data saat halaman pertama kali dibuka
        document.addEventListener("DOMContentLoaded", () => loadData());
    </script>
</x-layouts.main>