<x-layouts.main title="Data Bagian">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <div class="bg-white p-4 rounded shadow w-full">
        <h1 class="text-2xl font-bold mb-4">Data Bagian</h1>

        <div class="flex justify-between mb-4">
            <input type="text" id="searchBagian" placeholder="Cari ID atau Nama..."
                   class="border border-gray-300 p-3 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" oninput="searchBagian()">
            <button onclick="openAddModal()"
                    class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 ease-in-out border-0 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Tambah Bagian
            </button>
        </div>

        <div id="bagianContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <!-- Bagian cards will be rendered here -->
        </div>
    </div>

    @include('components.bagian.modal-add')
    @include('components.bagian.modal-edit')

    <script src="{{ asset('js/bagian/bagian.js') }}"></script>
    <script src="{{ asset('js/bagian/bagian-create.js') }}"></script>
    <script src="{{ asset('js/bagian/bagian-edit.js') }}"></script>
    <script>
        document.addEventListener("DOMContentLoaded", function() {
            if (typeof loadBagianData === 'function') {
                loadBagianData();
            }
        });
    </script>
</x-layouts.main>
