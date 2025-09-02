<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {

        Schema::create('products', function (Blueprint $table) {
            $table->id();

            // Use length limits to prevent oversized input (basic DoS/data issues)
            $table->string('name', 150);

            // Price with unsigned, prevents negative values
            $table->decimal('price', 10, 2)->unsigned();

            // Description limited with nullable option
            $table->string('description', 500)->nullable();
            // Add soft deletes to allow recovery instead of permanent removal
            $table->softDeletes();

            // Track creation & updates
            $table->timestamps();

            // Extra: enforce foreign key if product belongs to a user or category
            // $table->foreignId('user_id')->constrained()->onDelete('cascade');
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
