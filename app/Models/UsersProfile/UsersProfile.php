<?php

namespace App\Models;
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
        return $this->belongsTo(User::class, 'user_id');
    }

    public function bagian()
    {
        return $this->belongsTo(Bagian::class, 'bagian_id');
    }

    public function level()
    {
        return $this->belongsTo(Level::class, 'level_id');
    }

    public function status()
    {
        return $this->belongsTo(Statuses::class, 'status_id');
    }

    public function jamKerja()
    {
        return $this->hasMany(JamKerja::class, 'users_profile_id');
    }

    public function jamPerTanggal()
    {
        return $this->hasMany(JamPerTanggal::class, 'users_profile_id');
    }

    public function proyekUsers()
    {
        return $this->hasMany(ProyekUser::class, 'users_profile_id');
    }

    // Many-to-many relationship with proyek through proyek_user
    public function proyeks()
    {
        return $this->belongsToMany(Proyek::class, 'proyek_user', 'users_profile_id', 'proyek_id')
                    ->withTimestamps()
                    ->withTrashed();
    }
}