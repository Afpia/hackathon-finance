<?php

namespace App\Repositories;

use App\Models\category;

class CategoriesRepository extends BaseRepository
{
    protected $model;

    private $categoriesKeywords = [
        'Еда и напитки' => ['магазин', 'супермаркет', 'кафе', 'ресторан', 'еда', 'напитки'],
        'Транспорт' => ['бензин', 'метро', 'автобус', 'такси', 'парковка', 'транспорт'],
        'Жильё' => ['аренда', 'квартира', 'коммунальные', 'электричество', 'газ'],
        'Развлечения' => ['кино', 'театр', 'игры', 'хобби', 'развлечения', 'концерт'],
        'Финансы' => ['зарплата', 'премия', 'бонус', 'перевод', 'доход'],
        'Подарки' => ['подарок', 'цветы', 'сувенир', 'праздник'],
        'Здоровье' => ['аптека', 'лекарства', 'медицина', 'услуги', 'здоровье'],
        'Образование' => ['курсы', 'обучение', 'учебник', 'школа', 'университет'],
        'Семья' => ['дети', 'родственники', 'семья', 'поддержка'],
        'Одежда' => ['одежда', 'обувь', 'магазин', 'шопинг'],
        'Электроника' => ['гаджет', 'ноутбук', 'телефон', 'техника'],
        'Работа' => ['фриланс', 'проект', 'заработок'],
        'Бизнес' => ['инвестиции', 'акции', 'бизнес', 'прибыль'],
        'Путешествия' => ['билеты', 'путешествие', 'поездка', 'отпуск', 'гостиница'],
        'Кредиты' => ['кредит', 'займ', 'ипотека', 'рассрочка'],
        'Сбережения' => ['накопления', 'сбережения', 'депозит'],
        'Благотворительность' => ['пожертвование', 'благотворительность', 'помощь'],
        'Домашние животные' => ['корм', 'ветеринар', 'животные', 'зоо'],
        'Мобильная связь и интернет' => ['связь', 'интернет', 'мобильный', 'оплата'],
        'Прочее' => ['другое', 'разное', 'неопознанное'],
    ];

    public function __construct(category $category)
    {
        $this->model = $category;
    }

    public function classifyTransaction($description)
    {
        $description = mb_strtolower($description);
        $matchedCategories = [];

        foreach ($this->categoriesKeywords as $category => $keywords) {
            foreach ($keywords as $keyword) {
                if (mb_strpos($description, $keyword) !== false) {
                    $matchedCategories[$category] = ($matchedCategories[$category] ?? 0) + 1;
                }
            }
        }

        return ! empty($matchedCategories)
            ? array_keys($matchedCategories, max($matchedCategories))[0]
            : 'Прочее';
    }
}