<x-layouts.main title="Data Level">
    <div class="bg-white p-4 rounded shadow w-full">
        <h1 class="text-2xl font-bold mb-4">Data Level</h1>

        {{-- Tombol Tambah & Pencarian --}}
        <div class="flex justify-between mb-4">
            <input type="text" id="searchLevel" placeholder="Cari ID atau Nama..."
                   class="border p-2 rounded w-64" oninput="searchLevel()">
            <button onclick="openAddLevelModal()"
                    class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                Tambah Data
            </button>
        </div>

        {{-- Tabs Aktif / Arsip --}}
        <div class="mb-4">
            <button onclick="showTab('aktif')" id="tabAktif"
                    class="px-4 py-2 bg-blue-500 text-white rounded-t">
                Data Aktif
            </button>
            <button onclick="showTab('arsip')" id="tabArsip"
                    class="px-4 py-2 bg-gray-300 text-black rounded-t">
                Data Arsip
            </button>
        </div>

        {{-- Tabel Data Aktif --}}
        <div id="tableAktif">
            <table class="w-full border">
                <thead class="bg-gray-200">
                    <tr>
                        <th class="p-2 border">ID</th>
                        <th class="p-2 border">Nama</th>
                        <th class="p-2 border">Aksi</th>
                    </tr>
                </thead>
                <tbody id="dataLevel"></tbody>
            </table>
        </div>

        {{-- Tabel Data Arsip --}}
        <div id="tableArsip" class="hidden">
            <table class="w-full border">
                <thead class="bg-gray-200">
                    <tr>
                        <th class="p-2 border">ID</th>
                        <th class="p-2 border">Nama</th>
                        <th class="p-2 border">Aksi</th>
                    </tr>
                </thead>
                <tbody id="dataLevelArsip"></tbody>
            </table>
        </div>
    </div>

    {{-- Include Modal Tambah --}}
    @include('components.level.modal-add')

    {{-- Include Modal Edit --}}
    @include('components.level.modal-edit')

    {{-- JavaScript - Load level.js FIRST --}}
    <script src="{{ asset('js/level/level.js') }}"></script>
    
    {{-- Then the inline scripts --}}
    <script>
        // Tab switching function
        function showTab(tab) {
            console.log("showTab called with:", tab);
            
            const tabAktif = document.getElementById('tabAktif');
            const tabArsip = document.getElementById('tabArsip');
            const tableAktif = document.getElementById('tableAktif');
            const tableArsip = document.getElementById('tableArsip');

            if (!tabAktif || !tabArsip || !tableAktif || !tableArsip) {
                console.error("Tab elements not found");
                return;
            }

            if (tab === 'aktif') {
                // Aktif Tab
                tabAktif.classList.add('bg-blue-500', 'text-white');
                tabAktif.classList.remove('bg-gray-300', 'text-black');
                
                tabArsip.classList.remove('bg-blue-500', 'text-white');
                tabArsip.classList.add('bg-gray-300', 'text-black');
                
                tableAktif.classList.remove('hidden');
                tableArsip.classList.add('hidden');
            } else {
                // Arsip Tab
                tabArsip.classList.add('bg-blue-500', 'text-white');
                tabArsip.classList.remove('bg-gray-300', 'text-black');
                
                tabAktif.classList.remove('bg-blue-500', 'text-white');
                tabAktif.classList.add('bg-gray-300', 'text-black');
                
                tableArsip.classList.remove('hidden');
                tableAktif.classList.add('hidden');
            }
        }

        // Initialize page
        document.addEventListener('DOMContentLoaded', function() {
            console.log("Page DOMContentLoaded");
            
            // Check if functions are available
            if (typeof openAddLevelModal !== 'function') {
                console.error("openAddLevelModal function not found!");
                alert("Error: JavaScript not loaded properly. Please refresh the page.");
                return;
            }
            
            console.log("Functions available, initializing...");
            showTab('aktif');
            
            // Only call loadLevelData if it exists
            if (typeof loadLevelData === 'function') {
                loadLevelData();
            } else {
                console.warn("loadLevelData function not found");
            }
        });
    </script>
</x-layouts.main>