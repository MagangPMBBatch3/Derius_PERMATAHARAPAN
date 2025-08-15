<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
     Schema::create('users_profile', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                ->constrained('users')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->string('nama_lengkap', 100)->nullable();
            $table->string('nrp', 20)->nullable();
            $table->string('alamat', 255)->nullable();
            $table->string('foto', 250)->nullable();

            $table->foreignId('bagian_id')
                ->nullable()
                ->constrained('bagian')
                ->cascadeOnUpdate()
                ->nullOnDelete();

            $table->foreignId('level_id')
                ->nullable()
                ->constrained('levels')
                ->cascadeOnUpdate()
                ->nullOnDelete();

            $table->foreignId('status_id')
                ->nullable()
                ->constrained('statuses')
                ->cascadeOnUpdate()
                ->nullOnDelete();

            $table->timestamps();
            $table->softDeletes();

            $table->index(['user_id', 'bagian_id', 'level_id', 'status_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users_profile');
    }
};
