// Получение токена яндекс музыки: https://github.com/MarshalX/yandex-music-api/discussions/513
let ym_token = ``

// Получение девайса:
// 1. Скачиваем HTTP Analyze
// 2. Тыкаем Start слева сверху
// 3. Ищем яндекс музыку и копируем X-Yandex-Music-Device
let device = `os=unknown; os_version=unknown; manufacturer=unknown; model=unknown; clid=unknown; device_id=unknown; uuid=unknown`

// Где взять clientId?
// 1. Заходим на Discord Developer Portal в приложение (название приложения это заголовок RPC)
// 2. Тыкаем на вкладку OAuth2 слева
// 3. Копируем Client ID (он общедоступный, скрывать не надо)
let clientId = "1084179647874474125" // Название: Yandex Music

// Если не хотите консоль на рабочем столе - ЗАПУСКАЙТЕ start.vbs!!!!!!!!!!!!

const { Client } = require("@xhayper/discord-rpc");
const { YandexMusicClient } = require('yandex-music-client/YandexMusicClient')

const Mclient = new YandexMusicClient({
  // Базы, если дефолтная не работает:
  // http://api.music.yandex.net:443
  // https://api.music.yandex.net:443 // дефолтная
  // https://yandex-music-cors-proxy.onreder.com/https://api.music.yandex.net:443

  BASE: "https://api.music.yandex.net:443",
  HEADERS: {
    'Authorization': `OAuth ${ym_token}`,
    'Accept-Language': 'ru',
  },
});

const client = new Client({
  clientId: clientId
});

// RPC
client.on("ready", () => {
  let details = ``
  let artists = ``
  let endTimestamp = ``
  let buttons = []
  setInterval(async () => {
      Mclient.default
      .getQueues(device)
      .then(async ({result}) => {
        const currentQueue = await Mclient.default.getQueueById(result.queues[0].id);
        const {tracks, currentIndex} = currentQueue.result;
        const currentTrackId = tracks[currentIndex ?? 0];
        
        // console.log(currentQueue.result)

        if (currentTrackId !== undefined) {
          const currentTrack = (await Mclient.tracks.getTracks({"track-ids": [`${currentTrackId?.trackId}:${currentTrackId?.albumId}`]})).result[0]
          // console.log(currentTrack)
          for (let i = 0; i < currentTrack.artists.length; i++) {
            console.log(artists)
            console.log(i+1, currentTrack.artists.length)

            if (!artists.includes(currentTrack.artists[i].name)) artists += currentTrack.artists[i].name
            if (artists.split(`, `).length !== currentTrack.artists.length && currentTrack.artists.length !== i+1) artists += `, `
          }

          if (details !== currentTrack.title) {
            details = currentTrack.title
            // if (artists.length >= 128) {
            //   artists.split('').slice(-125)
            //   artists += `...`
            // }
            endTimestamp = Date.now() + currentTrack.durationMs
            buttons = [
              {
                label: `Ссылка на трек`,
                url: `https://music.yandex.ru/album/${currentTrackId?.albumId}/track/${currentTrackId?.trackId}`
              }
            ]
            // if (buttons.length > 2) buttons.splice(1, 1)
          }
        }

        client.user?.setActivity({
          details: details,
          state: artists,
          endTimestamp: endTimestamp,
          largeImageKey: `ym`,
          smallImageKey: `music`,
          smallImageText: `Слушаю музыку`,
          buttons: buttons
        })
      })
  }, 1000);
  console.log(`Rich Presence Активна!`)
})

client.login().catch(e => console.log(e))
