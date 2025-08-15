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
        Schema::create('pesan', function (Blueprint $table) {
            $table->id();
            $table->foreignId('jenis_id')
                ->nullable()
                ->constrained('jenis_pesan')
                ->cascadeOnUpdate()
                ->nullOnDelete();

            // Jika ingin relasi langsung ke users (pengirim), simpan user_id
            $table->foreignId('user_id')
                ->nullable()
                ->constrained('users')
                ->cascadeOnUpdate()
                ->nullOnDelete();

            $table->string('pengirim', 100)->nullable();
            $table->string('penerima', 100)->nullable();
            $table->text('isi')->nullable();
            $table->dateTime('tgl_pesan')->nullable();

            $table->timestamps();
            $table->softDeletes();

            $table->index(['jenis_id', 'user_id', 'tgl_pesan']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pesan');
    }
};
