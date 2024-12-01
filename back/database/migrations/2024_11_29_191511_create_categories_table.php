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
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('category_name');
            $table->timestamps();
        });

        DB::table('categories')->insert([
            ['category_name' => 'Прочее'],
            ['category_name' => 'Еда и напитки'],
            ['category_name' => 'Транспорт'],
            ['category_name' => 'Жильё'],
            ['category_name' => 'Развлечения'],
            ['category_name' => 'Финансы'],
            ['category_name' => 'Подарки'],
            ['category_name' => 'Здоровье'],
            ['category_name' => 'Образование'],
            ['category_name' => 'Семья'],
            ['category_name' => 'Одежда'],
            ['category_name' => 'Электроника'],
            ['category_name' => 'Работа'],
            ['category_name' => 'Бизнес'],
            ['category_name' => 'Путешествия'],
            ['category_name' => 'Кредиты'],
            ['category_name' => 'Сбережения'],
            ['category_name' => 'Благотворительность'],
            ['category_name' => 'Домашние животные'],
            ['category_name' => 'Мобильная связь и интернет'],

        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
