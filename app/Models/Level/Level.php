<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Level extends Model
{
    use SoftDeletes;
    protected $table = 'levels';
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
        return $this->hasMany(UsersProfile::class, 'level_id');
    }
}