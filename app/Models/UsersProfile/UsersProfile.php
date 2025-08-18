<?php

namespace App\Models\UsersProfile;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class UsersProfile extends Model
{
    use SoftDeletes;
    protected $table = 'users_profile';
    protected $primaryKey = 'id';
    protected $fillable = [
        'user_id',
        'nama_lengkap',
        'nrp',
        'alamat',
        'foto',
        'bagian_id',
        'level_id',
        'status_id'
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];

    public $timestamps = true;

    // Relationships
    public function user()
    {
        return $this->belongsTo(\App\Models\User\User::class, 'user_id');
    }

    public function bagian()
    {
        return $this->belongsTo(\App\Models\Bagian\Bagian::class, 'bagian_id');
    }

    public function level()
    {
        return $this->belongsTo(\App\Models\Level\Level::class, 'level_id');
    }

    public function status()
    {
        return $this->belongsTo(\App\Models\Statuses\Statuses::class, 'status_id');
    }

    public function jamKerja()
    {
        return $this->hasMany(\App\Models\JamKerja\JamKerja::class, 'users_profile_id');
    }

    public function jamPerTanggal()
    {
        return $this->hasMany(\App\Models\JamPerTanggal\JamPerTanggal::class, 'users_profile_id');
    }

    public function proyekUsers()
    {
        return $this->hasMany(\App\Models\ProyekUser\ProyekUser::class, 'users_profile_id');
    }

    // Many-to-many relationship with proyek through proyek_user
    public function proyeks()
    {
        return $this->belongsToMany(\App\Models\Proyek\Proyek::class, 'proyek_user', 'users_profile_id', 'proyek_id')
                    ->withTimestamps()
                    ->withTrashed();
    }
}