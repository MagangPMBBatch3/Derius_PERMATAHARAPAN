<?php

namespace App\Models;

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
        return $this->hasMany(JamKerja::class, 'proyek_id');
    }

    public function jamPerTanggal()
    {
        return $this->hasMany(JamPerTanggal::class, 'proyek_id');
    }

    public function proyekUsers()
    {
        return $this->hasMany(ProyekUser::class, 'proyek_id');
    }

    // Many-to-many relationship with users through proyek_user
    public function usersProfiles()
    {
        return $this->belongsToMany(UsersProfile::class, 'proyek_user', 'proyek_id', 'users_profile_id')
                    ->withTimestamps()
                    ->withTrashed();
    }
}