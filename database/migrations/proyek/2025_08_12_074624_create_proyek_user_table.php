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
       Schema::create('proyek_user', function (Blueprint $table) {
            $table->id();
            $table->foreignId('users_profile_id')
                ->constrained('users_profile')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('proyek_id')
                ->constrained('proyek')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->timestamps();
            $table->softDeletes();

            $table->unique(['users_profile_id', 'proyek_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('proyek_user');
    }
};
