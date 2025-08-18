<?php

namespace App\Models\Proyek;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class Proyek extends Model
{
    use SoftDeletes;
    protected $table = 'proyek';
    protected $primaryKey = 'id';
    protected $fillable = [
        'kode',
        'nama',
        'tanggal'
    ];

    protected $casts = [
        'tanggal' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];

    public $timestamps = true;

    // Relationships
    public function jamKerja()
    {
        return $this->hasMany(\App\Models\JamKerja\JamKerja::class, 'proyek_id');
    }

    public function jamPerTanggal()
    {
        return $this->hasMany(\App\Models\JamPerTanggal\JamPerTanggal::class, 'proyek_id');
    }

    public function proyekUsers()
    {
        return $this->hasMany(\App\Models\ProyekUser\ProyekUser::class, 'proyek_id');
    }

    // Many-to-many relationship with users through proyek_user
    public function usersProfiles()
    {
        return $this->belongsToMany(\App\Models\UsersProfile\UsersProfile::class, 'proyek_user', 'proyek_id', 'users_profile_id')
                    ->withTimestamps()
                    ->withTrashed();
    }
}