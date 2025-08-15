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
       Schema::create('jam_per_tanggal', function (Blueprint $table) {
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
            $table->date('tanggal');
            $table->decimal('jam', 5, 2)->default(0);
            $table->timestamps();
            $table->softDeletes();

            $table->unique(['users_profile_id', 'proyek_id', 'tanggal'], 'upt_unique');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
          Schema::dropIfExists('jam_per_tanggal');
    }
};
