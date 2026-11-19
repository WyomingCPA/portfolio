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
        Schema::create('portfolio_tax_accruals', function (Blueprint $table) {
            $table->id();

            $table->foreignId('portfolio_tax_id')
                ->constrained('portfolio_taxes')
                ->cascadeOnDelete();

            $table->date('accrual_date');

            $table->decimal('base_amount', 15, 2);
            // Общая стоимость портфеля на момент начисления

            $table->decimal('rate', 10, 6);
            // Ставка на момент начисления

            $table->decimal('amount', 15, 2);
            // Сумма начисления

            $table->timestamps();

            // Одна цель — одно начисление за день
            $table->unique(
                ['portfolio_tax_id', 'accrual_date'],
                'portfolio_tax_daily_unique'
            );
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('portfolio_tax_accruals');
    }
};
