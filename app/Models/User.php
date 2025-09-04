<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;

class User extends Authenticatable
{
    use HasFactory, Notifiable, SoftDeletes;

    protected $primaryKey = 'id';
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime'
    ];

    // Relationships
    public function profile()
    {
        return $this->hasOne(\App\Models\UsersProfile\UsersProfile::class, 'user_id');
    }

    public function pesan()
    {
        return $this->hasMany(\App\Models\Pesan\Pesan::class, 'user_id');
    }

    public function sessions()
    {
        return $this->hasMany(\App\Models\Session\Session::class, 'user_id');
    }
}