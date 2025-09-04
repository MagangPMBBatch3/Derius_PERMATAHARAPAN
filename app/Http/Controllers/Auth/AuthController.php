<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\UsersProfile\UsersProfile;
use App\Models\Bagian\Bagian;
use App\Models\Level\Level;
use App\Models\Statuses\Statuses;
use Illuminate\Support\Facades\Storage;
use App\Models\User;

class AuthController extends Controller
{
    public function showLogin()
    {
        return view("auth.login");
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            return redirect()->intended('/dashboard');
        }

        return back()->withErrors([
            'email' => 'Email atau password salah.',
        ]);
    }

    public function showRegister()
    {
        return view("auth.register");
    }

    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6|confirmed'
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        Auth::login($user);

        return redirect('/dashboard');
    }

    public function dashboard()
    {
        return view("dashboard.index");
    }

    public function bagian()
    {
        return view("bagian.index");
    }

    public function level()
    {
        return view("level.index");
    }

    public function statuses()
    {
        return view("statuses.index");
    }

    public function users()
    {
        return view("users.index");
    }

    public function usersProfile()
    {
        $bagians = Bagian::all();
        $levels = Level::all();
        $statuses = Statuses::all();
        $users = User::orderBy('id')->get();

        return view("users-profile.index", compact('bagians', 'levels', 'statuses', 'users'));
    }

    public function proyek()
    {
        return view("proyek.index");
    }

    public function proyekUser()
    {
        return view("proyek-user.index");
    }

    public function storeUserProfile(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'nama_lengkap' => 'required|string|max:255',
            'nrp' => 'required|string|max:50',
            'alamat' => 'required|string',
            'foto' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'bagian_id' => 'nullable|exists:bagian,id',
            'level_id' => 'nullable|exists:levels,id',
            'status_id' => 'nullable|exists:statuses,id',
        ]);

        try {
            // Handle file upload
            $fotoPath = null;
            if ($request->hasFile('foto')) {
                $foto = $request->file('foto');
                $fotoName = time() . '_' . $foto->getClientOriginalName();
                $fotoPath = $foto->storeAs('user-profiles', $fotoName, 'public');
            }

            // Create user profile
            $userProfile = UsersProfile::create([
                'user_id' => $request->user_id,
                'nama_lengkap' => $request->nama_lengkap,
                'nrp' => $request->nrp,
                'alamat' => $request->alamat,
                'foto' => $fotoPath,
                'bagian_id' => $request->bagian_id,
                'level_id' => $request->level_id,
                'status_id' => $request->status_id,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'User profile berhasil dibuat',
                'data' => $userProfile
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan: ' . $e->getMessage()
            ], 500);
        }
    }

    public function updateUserProfile(Request $request, $id)
    {
        $request->validate([
            'nama_lengkap' => 'required|string|max:255',
            'nrp' => 'required|string|max:50',
            'alamat' => 'required|string',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'bagian_id' => 'nullable|exists:bagian,id',
            'level_id' => 'nullable|exists:levels,id',
            'status_id' => 'nullable|exists:statuses,id',
        ]);

        try {
            $userProfile = UsersProfile::findOrFail($id);

            // Handle file upload if new photo is provided
            $fotoPath = $userProfile->foto; // Keep existing photo
            if ($request->hasFile('foto')) {
                // Delete old photo if exists
                if ($userProfile->foto && Storage::disk('public')->exists($userProfile->foto)) {
                    Storage::disk('public')->delete($userProfile->foto);
                }

                // Store new photo
                $foto = $request->file('foto');
                $fotoName = time() . '_' . $foto->getClientOriginalName();
                $fotoPath = $foto->storeAs('user-profiles', $fotoName, 'public');
            }

            // Update user profile
            $userProfile->update([
                'nama_lengkap' => $request->nama_lengkap,
                'nrp' => $request->nrp,
                'alamat' => $request->alamat,
                'foto' => $fotoPath,
                'bagian_id' => $request->bagian_id,
                'level_id' => $request->level_id,
                'status_id' => $request->status_id,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'User profile berhasil diupdate',
                'data' => $userProfile
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan: ' . $e->getMessage()
            ], 500);
        }
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/');
    }
}
