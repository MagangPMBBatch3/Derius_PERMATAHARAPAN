<x-layouts.main title="User Profile">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <input type="hidden" id="currentUserId" value="{{ auth()->id() }}">
    <input type="hidden" id="selectedUserId" value="{{ request('user_id') ?: auth()->id() }}">

    <div class="bg-white p-4 rounded shadow w-full">
        <h1 class="text-2xl font-bold mb-4">User Profile</h1>

        <div id="userProfileContainer">
            <!-- User profile will be rendered here -->
        </div>
    </div>

    @include('components.users-profile.modal-add')
    @include('components.users-profile.modal-edit')

    <script src="{{ asset('js/users-profile/users-profile.js') }}"></script>
    <script src="{{ asset('js/users-profile/users-profile-create.js') }}"></script>
    <script src="{{ asset('js/users-profile/users-profile-edit.js') }}"></script>
    <script>
        document.addEventListener("DOMContentLoaded", function() {
            if (typeof loadUserProfileData === 'function') {
                loadUserProfileData();
            }
        });
    </script>
</x-layouts.main> 