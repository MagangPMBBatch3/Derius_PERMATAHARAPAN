<?php

namespace App\GraphQL\Proyek\Queries;

use App\Models\Proyek\Proyek;
use Illuminate\Database\Eloquent\Collection;

class ProyekQuery
{
    /**
     * Ambil semua proyek dengan filter opsional
     */
    public function getProyeks($_, array $args): Collection
    {
        $query = Proyek::query();

        // Filter pencarian umum
        if (!empty($args['search'])) {
            $query->where(function($q) use ($args) {
                $q->where('nama', 'like', '%'.$args['search'].'%')
                  ->orWhere('kode', 'like', '%'.$args['search'].'%')
                  ->orWhere('id', $args['search']);
            });
        }

        return $query->orderBy('created_at', 'desc')->get();
    }

    /**
     * Cari proyek berdasarkan nama
     */
    public function proyekByNama($_, array $args): Collection
    {
        return Proyek::where('nama', 'like', '%'.$args['nama'].'%')
                     ->orderBy('created_at', 'desc')
                     ->get();
    }

    /**
     * Cari proyek berdasarkan ID
     */
    public function proyekById($_, array $args): ?Proyek
    {
        return Proyek::with(['tim', 'aktivitas', 'jamKerja'])
                   ->find($args['id']);
    }

    /**
     * Proyek oleh user tertentu
     */
    public function proyekByUser($_, array $args): Collection
    {
        return Proyek::whereHas('users_profile', function($q) use ($args) {
                    $q->where('users_profile_id', $args['user_id']);
                })
                ->with(['status', 'bagian'])
                ->get();
    }
}