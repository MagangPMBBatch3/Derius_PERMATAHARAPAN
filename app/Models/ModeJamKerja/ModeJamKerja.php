<?php

namespace App\Models\ModeJamKerja;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class ModeJamKerja extends Model
{
    use SoftDeletes;
    protected $table = 'mode_jam_kerja';
    protected $primaryKey = 'id';
    protected $fillable = [
        'nama'
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];

    public $timestamps = true;

    // Relationship with jam_kerja
    public function jamKerja()
    {
        return $this->hasMany(\App\Models\JamKerja\JamKerja::class, 'mode_id');
    }
}