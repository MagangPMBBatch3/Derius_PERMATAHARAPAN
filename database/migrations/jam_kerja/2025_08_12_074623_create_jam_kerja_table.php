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
        Schema::create('jam_kerja', function (Blueprint $table) {
            $table->id();
            $table->foreignId('users_profile_id')
                ->constrained('users_profile')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('proyek_id')
                ->nullable()
                ->constrained('proyek')
                ->cascadeOnUpdate()
                ->nullOnDelete();
            $table->foreignId('aktivitas_id')
                ->nullable()
                ->constrained('aktivitas')
                ->cascadeOnUpdate()
                ->nullOnDelete();

            $table->date('tanggal');
            $table->decimal('jumlah_jam', 5, 2)->default(0);
            $table->text('keterangan')->nullable();

            $table->foreignId('mode_id')
                ->nullable()
                ->constrained('mode_jam_kerja')
                ->cascadeOnUpdate()
                ->nullOnDelete();
            $table->foreignId('status_id')
                ->nullable()
                ->constrained('status_jam_kerja')
                ->cascadeOnUpdate()
                ->nullOnDelete();

            $table->timestamps();
            $table->softDeletes();

            $table->index(['users_profile_id', 'proyek_id', 'aktivitas_id']);
            $table->index('tanggal');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jam_kerja');
    }
};
