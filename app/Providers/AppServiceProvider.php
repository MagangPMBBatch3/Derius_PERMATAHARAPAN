<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\App;
use Exception;

class AppServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        // Test koneksi ke database
        if (App::runningInConsole()) {
            try {
                $dbname = DB::connection()->getDatabaseName();
                echo "✔ Koneksi ke database berhasil: $dbname\n";
            } catch (Exception $e) {
                echo "✘ Koneksi database gagal: " . $e->getMessage() . "\n";
                Log::error("✘ Koneksi database gagal: " . $e->getMessage());
                exit(1); // Keluar dengan status error
            }
        }
    }
}