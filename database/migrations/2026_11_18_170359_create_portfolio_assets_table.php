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
        Schema::create('portfolio_assets', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Фонд
            $table->string('ticker')->nullable(); // Тикер
            $table->string('type')->default('other');
            $table->decimal('target_percent', 10, 6); // Целевая доля: 0.300000
            $table->decimal('current_value', 15, 2)->default(0); // Текущая стоимость

            $table->date('price_updated_at')->nullable(); // Дата обновления стоимости
            $table->date('last_rebalanced_at')->nullable(); // Дата последнего ребаланса
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('portfolio_assets');
    }
};
