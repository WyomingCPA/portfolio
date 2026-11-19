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
        Schema::create('portfolio_taxes', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Название цели

            $table->decimal('amount', 15, 2)->default(0);
            // Текущая накопленная сумма

            $table->decimal('daily_rate', 10, 6)->default(0.001);
            // 0.001 = 0.1% ежедневно

            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('portfolio_taxes');
    }
};
