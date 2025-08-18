<?php

namespace App\Models\Aktivitas;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Aktivitas extends Model
{
    use SoftDeletes;
    protected $table = 'aktivitas';
    protected $primaryKey = 'id';
    protected $fillable = [
        'nama',
        'parent_id'
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];

    public $timestamps = true;

    // Self-referencing relationship for parent/child activities
    public function parent()
    {
        return $this->belongsTo(Aktivitas::class, 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(Aktivitas::class, 'parent_id');
    }

    // Relationship with jam_kerja
    public function jamKerja()
    {
        return $this->hasMany(\App\Models\JamKerja\JamKerja::class, 'aktivitas_id');
    }
}