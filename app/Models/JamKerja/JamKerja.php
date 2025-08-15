<?php

namespace App\Models;


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
        return $this->belongsTo(UsersProfile::class, 'users_profile_id');
    }

    public function proyek()
    {
        return $this->belongsTo(Proyek::class, 'proyek_id');
    }

    public function aktivitas()
    {
        return $this->belongsTo(Aktivitas::class, 'aktivitas_id');
    }

    public function modeJamKerja()
    {
        return $this->belongsTo(ModeJamKerja::class, 'mode_id');
    }

    public function statusJamKerja()
    {
        return $this->belongsTo(StatusJamKerja::class, 'status_id');
    }
}