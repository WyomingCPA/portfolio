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
        Schema::create('portfolio_basis_positions', function (Blueprint $table) {
            $table->id();

            $table->string('ticker', 20);
            $table->string('futures_ticker', 30);

            $table->decimal('spot_quantity', 15, 4);
            $table->unsignedInteger('futures_quantity')->default(1);
            $table->decimal('contract_size', 12, 4)->default(1);

            $table->decimal('spot_entry_price', 15, 4);
            $table->decimal('futures_entry_price', 15, 4);

            $table->decimal('spot_current_price', 15, 4)->nullable();
            $table->decimal('futures_current_price', 15, 4)->nullable();

            $table->date('futures_expiry')->nullable();

            $table->decimal('go_per_contract', 15, 2)->default(0);
            $table->decimal('commission', 8, 4)->default(0);

            $table->text('notes')->nullable();

            $table->timestamps();

            $table->index('ticker');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('portfolio_basis_positions');
    }
};
