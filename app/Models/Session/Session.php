<?php

namespace App\Models\Session;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Session extends Model
{
    use HasFactory;

    protected $table = 'sessions';
    
    protected $fillable = [
        'user_id',
        'ip_address',
        'user_agent',
        'payload',
        'last_activity'
    ];

    protected $casts = [
        'last_activity' => 'integer',
    ];

    public $timestamps = false; // Sessions table doesn't use standard timestamps

    // Relationship with user
    public function user()
    {
        		return $this->belongsTo(\App\Models\User\User::class, 'user_id');
    }
}