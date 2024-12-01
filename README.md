## На данный момент в реализации есть 1 баг
endpoint inventory/stocks в POST запросе при использовании productId, который уже ,был задействован ранее в этом же endpoint, выдаёт {"message":"Validation error"}

# Нужно реализовать 2 сервиса.

## Один сервис остатков товаров в магазине. У товара могут быть следующие поля:
- PLU - артикул товара
- Название товара
- Количество товара на полке
- Количество товара в заказе
- Для какого магазина данных остаток
Данные денормализованы, их нужно привести к 2-3 нормальной форме.
Должны быть следующие endpoint:
- Создание товара
- Создание остатка
- Увеличение остатка
- Уменьшение остатка
- Получение остатков по фильтрам
    - plu
    - shop_id
    - количество остатков на полке (с-по)
    - количество остатков в заказе (с-по)
- Получение товаров по фильтрам
    - name
    - plu

## Другой сервис истории действий с товарами. 
В сервис “истории действий с товарами” нужно отправлять все события, которые происходят с товарами или остатками. Общение сервисов может происходить любым способом. Сервис “истории действий с товарами или остатками” должен иметь endpoint, который отдаст историю действий с фильтрами по:
- shop_id
- plu
- date (с-по)
- action
и постраничной навигацией. Фреймворк так же может быть любой, но не nest. Один из сервисов должен быть на JS, для второго можно использовать TS. СУБД - postgresql


