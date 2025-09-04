<x-layouts.main title="Data Statuses">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <div class="bg-white p-4 rounded shadow w-full">
        <h1 class="text-2xl font-bold mb-4">Data Statuses</h1>

        <div class="flex justify-between mb-4">
            <input type="text" id="searchStatus" placeholder="Cari ID atau Nama..."
                   class="border border-gray-300 p-3 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" oninput="searchStatus()">
            <button onclick="openAddStatusModal()"
                    class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 ease-in-out border-0 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Tambah Data
            </button>
        </div>

        <div class="mb-4">
            <button onclick="showStatusTab('aktif')" id="tabStatusAktif"
                    class="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-t-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition-all duration-200 ease-in-out border-0 focus:outline-none focus:ring-2 focus:ring-blue-300">
                <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Data Aktif
            </button>
            <button onclick="showStatusTab('arsip')" id="tabStatusArsip"
                    class="px-6 py-3 bg-gradient-to-r from-gray-300 to-gray-400 text-gray-700 font-semibold rounded-t-lg shadow-md hover:from-gray-400 hover:to-gray-500 transition-all duration-200 ease-in-out border-0 focus:outline-none focus:ring-2 focus:ring-gray-300">
                <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
                </svg>
                Data Arsip
            </button>
        </div>

        <div id="statusTableAktif">
            <table class="w-full border">
                <thead class="bg-gray-200">
                    <tr>
                        <th class="p-2 border">ID</th>
                        <th class="p-2 border">Nama</th>
                        <th class="p-2 border">Aksi</th>
                    </tr>
                </thead>
                <tbody id="dataStatuses"></tbody>
            </table>
        </div>

        <div id="statusTableArsip" class="hidden">
            <table class="w-full border">
                <thead class="bg-gray-200">
                    <tr>
                        <th class="p-2 border">ID</th>
                        <th class="p-2 border">Nama</th>
                        <th class="p-2 border">Aksi</th>
                    </tr>
                </thead>
                <tbody id="dataStatusesArsip"></tbody>
            </table>
        </div>
    </div>

    @include('components.statuses.modal-add')
    @include('components.statuses.modal-edit')

    <script src="{{ asset('js/statuses/statuses.js') }}"></script>
    <script src="{{ asset('js/statuses/statuses-create.js') }}"></script>
    <script src="{{ asset('js/statuses/statuses-edit.js') }}"></script>
    <script>
        document.addEventListener("DOMContentLoaded", function() {
            if (typeof showStatusTab === 'function') {
                showStatusTab('aktif');
            }
            if (typeof loadStatusData === 'function') {
                loadStatusData();
            }
        });
    </script>
</x-layouts.main> 