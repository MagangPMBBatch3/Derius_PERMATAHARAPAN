<?php
require 'vendor/autoload.php';

$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

try {
    $model = new \App\Models\Statuses();
    echo "Model berhasil di-load!\n";
    echo "Table: " . $model->getTable() . "\n";
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
?>