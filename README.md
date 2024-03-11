# Активность Discord с Яндекс.Музыкой

![preview](https://media.discordapp.net/attachments/1063748127254908988/1085630871614279761/image.png)

![chavo](https://media.discordapp.net/attachments/1063748127254908988/1085853277645701200/image.png)

# Для работы требуется:
- [Node](https://nodejs.org/en/)

- [@xhayper/discord-rpc](https://www.npmjs.com/package/@xhayper/discord-rpc)

- [yandex-music-client](https://www.npmjs.com/package/yandex-music-client)

# Настройки в index.js
1. ym_token:
Получение токена яндекс музыки: https://github.com/MarshalX/yandex-music-api/discussions/513

2. device:
Получение девайса:
- Скачиваем [HTTP Analyze](https://www.ieinspector.com/httpanalyzer/download.html)
- Тыкаем Start слева сверху
- Ищем яндекс музыку и копируем X-Yandex-Music-Device

3. clientId:
Где взять clientId?
- Заходим на [Discord Developer Portal](https://discord.com/developers/applications) в приложение, если его нет - создаем. **Название приложения это заголовок RPC**
- Тыкаем на вкладку OAuth2 слева
- Копируем Client ID (он общедоступный, скрывать не надо)

## Если не хотите создавать приложение - по умолчанию будет заголовок "Yandex Music"

## Если не хотите видеть консоль на рабочем столе - запускайсе start.vbs! 

# Известные проблемы:
1. Не отображается трек, когда играет радио
2. Если поставить трек на паузу - RPC выключится только по окончанию таймера
3. Если поставить трек на повтор - активность выключится после первого проигрывания
4. Активность у вас хоть и обновляется раз в 0.5 сек, для всех остальных она обновляется раз в 10 сек

Проблемы №1-3 связаны с самой Яндекс.Музыкой
Проблема №4 связана с ограничением Discord 

P.S. В бета-клиенте Яндекс Музыки система на данный момент работать НЕ БУДЕТ.
