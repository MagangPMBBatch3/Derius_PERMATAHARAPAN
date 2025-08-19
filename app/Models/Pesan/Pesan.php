<?php

namespace App\Models\Pesan;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class Pesan extends Model
{
use softDeletes;
    protected $table = 'pesan';
    protected $primaryKey = 'id';
    protected $fillable = [
        'jenis_id',
        'user_id',
        'pengirim',
        'penerima',
        'isi',
        'tgl_pesan'
    ];

    protected $casts = [
        'tgl_pesan' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];

    public $timestamps = true;

    // Relationship with user
    public function user()
    {
        		return $this->belongsTo(\App\Models\User::class, 'user_id');
    }
}