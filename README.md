# Активность Discord с Яндекс.Музыкой

# Требуемые либы для работы:
[@xhayper/discord-rpc](https://www.npmjs.com/package/@xhayper/discord-rpc)

[yandex-music-client](https://www.npmjs.com/package/yandex-music-client)

# Настройки в index.js
1. ym_token:
Получение токена яндекс музыки: https://github.com/MarshalX/yandex-music-api/discussions/513

2. device:
Получение девайса:
1. Скачиваем HTTP Analyze
2. Тыкаем Start слева сверху
3. Ищем яндекс музыку и копируем X-Yandex-Music-Device

3. clientId:
Где взять clientId?
1. Заходим на Discord Developer Portal в приложение (название приложения это заголовок RPC)
2. Тыкаем на вкладку OAuth2 слева
3. Копируем Client ID (он общедоступный, скрывать не надо)

## Если не хотите видеть консоль на рабочем столе - запускайсе start.vbs! 

# Известные проблемы:
1. Может не находить текущий трек в очереди, если играет радио
2. Даже если трек не играет - он все равно будет показан в статусе, т.к. трек берется из очереди, а она есть всегда
3. Кривой счетчик времени до окончания трека
