<x-layouts.main title="Data Users">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <div class="bg-white p-4 rounded shadow w-full">
        <h1 class="text-2xl font-bold mb-4">Data Users</h1>

        <div class="flex justify-between mb-4">
            <input type="text" id="searchUser" placeholder="Cari ID atau Email..."
                   class="border border-gray-300 p-3 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" oninput="searchUser()">
            <button onclick="openAddUserModal()"
                    class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-black font-semibold rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 ease-in-out border-0 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Tambah User
            </button>
        </div>

        <div class="mb-4">
            <button onclick="showUserTab('aktif')" id="tabUserAktif"
                    class="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-black font-semibold rounded-t-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition-all duration-200 ease-in-out border-0 focus:outline-none focus:ring-2 focus:ring-blue-300">
                <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Data Aktif
            </button>
            <button onclick="showUserTab('arsip')" id="tabUserArsip"
                    class="px-6 py-3 bg-gradient-to-r from-gray-300 to-gray-400 text-black font-semibold rounded-t-lg shadow-md hover:from-gray-400 hover:to-gray-500 transition-all duration-200 ease-in-out border-0 focus:outline-none focus:ring-2 focus:ring-gray-300">
                <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
                </svg>
                Data Arsip
            </button>
        </div>

        <div id="usersContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <!-- User cards will be rendered here -->
        </div>

        <div id="usersArsipContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 hidden">
            <!-- Archived user cards will be rendered here -->
        </div>
    </div>

    @include('components.users.modal-add')
    @include('components.users.modal-edit')
    @include('components.users-profile.modal-add')
    @include('components.users-profile.modal-edit')

    <script src="{{ asset('js/users/users.js') }}"></script>
    <script src="{{ asset('js/users/users-create.js') }}"></script>
    <script src="{{ asset('js/users/users-edit.js') }}"></script>
    <script src="{{ asset('js/users-profile/users-profile-create.js') }}"></script>
    <script src="{{ asset('js/users-profile/users-profile-edit.js') }}"></script>
    <script>
        document.addEventListener("DOMContentLoaded", function() {
            if (typeof showUserTab === 'function') {
                showUserTab('aktif');
            }
            if (typeof loadUserData === 'function') {
                loadUserData();
            }
        });
    </script>
</x-layouts.main> 