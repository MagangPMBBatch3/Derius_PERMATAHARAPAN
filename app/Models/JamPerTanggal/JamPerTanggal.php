<?php

namespace App\Models\JamPerTanggal;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class JamPerTanggal extends Model
{

    use SoftDeletes;
    protected $table = 'jam_per_tanggal';
    protected $primaryKey = 'id';
    protected $fillable = [
        'users_profile_id',
        'proyek_id',
        'tanggal',
        'jam'
    ];

    protected $casts = [
        'tanggal' => 'date',
        'jam' => 'decimal:2',
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
}