<?php

namespace App\Models\Bagian;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Bagian extends Model
{
    use SoftDeletes;        
    protected $table = 'bagian';
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

    // Relationship with users_profile
    public function usersProfile()
    {
        return $this->hasMany(\App\Models\UsersProfile\UsersProfile::class, 'bagian_id');
    }
}