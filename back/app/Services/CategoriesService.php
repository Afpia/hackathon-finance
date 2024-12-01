<?php

namespace App\Services;

use App\Repositories\CategoriesRepository;
use App\Repositories\FinanceRepository;

class CategoriesService extends BaseService
{
    private $categoriesRepository;

    private $financeRepository;

    private $categoriesKeywords = [
        1 => ['магазин', 'супермаркет', 'кафе', 'ресторан', 'еда', 'напитки'],
        2 => ['бензин', 'метро', 'автобус', 'такси', 'парковка', 'транспорт'],
        3 => ['аренда', 'квартира', 'коммунальные', 'электричество', 'газ'],
        4 => ['кино', 'театр', 'игры', 'хобби', 'развлечения', 'концерт'],
        5 => ['зарплата', 'премия', 'бонус', 'перевод', 'доход'],
        6 => ['подарок', 'цветы', 'сувенир', 'праздник'],
        7 => ['аптека', 'лекарства', 'медицина', 'услуги', 'здоровье'],
        8 => ['курсы', 'обучение', 'учебник', 'школа', 'университет'],
        9 => ['дети', 'родственники', 'семья', 'поддержка'],
        10 => ['одежда', 'обувь', 'магазин', 'шопинг'],
        11 => ['гаджет', 'ноутбук', 'телефон', 'техника'],
        12 => ['фриланс', 'проект', 'заработок'],
        13 => ['инвестиции', 'акции', 'бизнес', 'прибыль'],
        14 => ['билеты', 'путешествие', 'поездка', 'отпуск', 'гостиница'],
        15 => ['кредит', 'займ', 'ипотека', 'рассрочка'],
        16 => ['накопления', 'сбережения', 'депозит'],
        17 => ['пожертвование', 'благотворительность', 'помощь'],
        18 => ['корм', 'ветеринар', 'животные', 'зоо'],
        19 => ['связь', 'интернет', 'мобильный', 'оплата'],
        20 => ['другое', 'разное', 'неопознанное'],
    ];

    public function __construct(CategoriesRepository $categoriesRepository, FinanceRepository $financeRepository)
    {
        $this->repo = $categoriesRepository;
        $this->financeRepository = $financeRepository;
    }

    public function classifyTransaction($description)
    {
        $description = mb_strtolower($description);
        $matchedCategories = [];

        foreach ($this->categoriesKeywords as $categoryId => $keywords) {
            foreach ($keywords as $keyword) {
                if (mb_strpos($description, $keyword) !== false) {
                    $matchedCategories[$categoryId] = ($matchedCategories[$categoryId] ?? 0) + 1;
                }
            }
        }

        return ! empty($matchedCategories)
            ? array_keys($matchedCategories, max($matchedCategories))[0]
            : 20;
    }

    public function analytic($period = 'all', $limit = 7)
    {
        $topCategories = $this->financeRepository->topCategories($period, $limit);

        $missingCount = $limit - $topCategories->count();

        if ($missingCount > 0) {
            $excludeIds = $topCategories->pluck('id')->toArray();
            $randomCategories = $this->repo->getRandomCategories($excludeIds, $missingCount);

            $topCategories = $topCategories->concat($randomCategories);
        }

        return $topCategories;
    }
}
