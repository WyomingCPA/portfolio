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
        Schema::create('portfolio_liabilities', function (Blueprint $table) {
            $table->id();

            $table->string('name');
            $table->string('type')->default('other');

            // Текущая сумма долга
            $table->decimal('current_amount', 15, 2)->default(0);

            // Процентная ставка годовых, если есть
            $table->decimal('interest_rate', 8, 4)->nullable();

            // Кому должен и дополнительная информация
            $table->string('creditor')->nullable();
            $table->date('due_date')->nullable();
            $table->text('notes')->nullable();

            $table->boolean('is_active')->default(true);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('portfolio_liabilities');
    }
};
