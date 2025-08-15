<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class ProyekUser extends Model
{
    use SoftDeletes;
    protected $table = 'proyek_user';
    protected $primaryKey = 'id';
    protected $fillable = [
        'users_profile_id',
        'proyek_id'
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];

    public $timestamps = true;

    // Relationships
    public function usersProfile()
    {
        return $this->belongsTo(UsersProfile::class, 'users_profile_id');
    }

    public function proyek()
    {
        return $this->belongsTo(Proyek::class, 'proyek_id');
    }
}