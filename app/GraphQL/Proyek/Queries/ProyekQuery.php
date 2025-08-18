<?php

namespace App\GraphQL\Proyek\Queries;

use App\Models\Proyek\Proyek;
use Illuminate\Database\Eloquent\Collection;

class ProyekQuery
{
    /**
     * Ambil semua proyek dengan filter opsional
     */
    public function semuaProyek($_, array $args): Collection
    {
        $query = Proyek::query();
        
        // Filter pencarian umum
        if (!empty($args['cari'])) {
            $query->where(function($q) use ($args) {
                $q->where('nama', 'like', '%'.$args['cari'].'%')
                  ->orWhere('kode', 'like', '%'.$args['cari'].'%')
                  ->orWhere('deskripsi', 'like', '%'.$args['cari'].'%');
            });
        }
        
        // Filter by tanggal
        if (!empty($args['tanggal_mulai'])) {
            $query->whereDate('tanggal_mulai', '>=', $args['tanggal_mulai']);
        }
        
        if (!empty($args['tanggal_selesai'])) {
            $query->whereDate('tanggal_selesai', '<=', $args['tanggal_selesai']);
        }
        
        // Filter by status
        if (!empty($args['status_id'])) {
            $query->where('status_id', $args['status_id']);
        }
        
        return $query->orderBy('created_at', 'desc')->get();
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