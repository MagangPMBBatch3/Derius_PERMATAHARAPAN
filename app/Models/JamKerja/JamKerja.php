<?php

namespace App\Models\JamKerja;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class JamKerja extends Model
{
    use SoftDeletes;
    protected $table = 'jam_kerja';
    protected $primaryKey = 'id';
    protected $fillable = [
        'users_profile_id',
        'proyek_id',
        'aktivitas_id',
        'tanggal',
        'jumlah_jam',
        'keterangan',
        'mode_id',
        'status_id'
    ];

    protected $casts = [
        'tanggal' => 'date',
        'jumlah_jam' => 'decimal:2',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];

    public $timestamps = true;

    // Relationships
    public function usersProfile()
    {
        return $this->belongsTo(\App\Models\UsersProfile\UsersProfile::class, 'users_profile_id');
    }

    public function proyek()
    {
        return $this->belongsTo(\App\Models\Proyek\Proyek::class, 'proyek_id');
    }

    public function aktivitas()
    {
        return $this->belongsTo(\App\Models\Aktivitas\Aktivitas::class, 'aktivitas_id');
    }

    public function modeJamKerja()
    {
        return $this->belongsTo(\App\Models\ModeJamKerja\ModeJamKerja::class, 'mode_id');
    }

    public function statusJamKerja()
    {
        return $this->belongsTo(\App\Models\StatusJamKerja\StatusJamKerja::class, 'status_id');
    }
}