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
   Schema::create('proyek', function (Blueprint $table) {
            $table->id();
            $table->string('kode', 50)->nullable();
            $table->string('nama', 150);
            $table->date('tanggal')->nullable();
            $table->timestamps();
            $table->softDeletes();
            $table->index(['kode', 'tanggal']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('proyek');
    }
};
