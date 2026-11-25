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
        Schema::create('portfolio_put_spreads', function (Blueprint $table) {
            $table->id();

            // Базовый актив
            $table->string('ticker', 20);

            // Экспирация
            $table->date('expiry');

            // Проданный PUT
            $table->decimal('short_strike', 15, 4);
            $table->decimal('short_entry_price', 15, 4);
            $table->decimal('short_current_price', 15, 4)->nullable();

            // Купленный PUT
            $table->decimal('long_strike', 15, 4);
            $table->decimal('long_entry_price', 15, 4);
            $table->decimal('long_current_price', 15, 4)->nullable();

            // Количество и спецификация
            $table->unsignedInteger('quantity')->default(1);
            $table->decimal('contract_size', 12, 4)->default(1);

            // Финансовые параметры
            $table->decimal('commission', 15, 2)->default(0);
            $table->decimal('margin', 15, 2)->default(0);

            $table->text('notes')->nullable();

            $table->timestamps();

            $table->index('ticker');
            $table->index('expiry');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('portfolio_put_spreads');
    }
};
