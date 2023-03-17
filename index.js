// НАСТРОЙКИ
// Что за что отвечает - читайте здесь: https://github.com/KailHet/ymDiscordRPC
let ym_token = ``
let device = `os=unknown; os_version=unknown; manufacturer=unknown; model=unknown; clid=unknown; device_id=unknown; uuid=unknown`
let clientId = "1084179647874474125" // По умолчанию: заголовок "Yandex Music" (1084179647874474125)

// НАСТРОЙКИ АКТИВНОСТИ
// Показывать кнопку "Хочу такой же статус"? Кнопка будет вести на гитхаб данной RPC: https://github.com/KailHet/ymDiscordRPC 
let github_button = true // true - да | false - нет
let github_button_text = `Хочу такой же статус` // Название кнопки, ведущей в репозиторий
// Показывать кнопку "Ссылка на трек"? Будет открываться в приложении, если установлено. Иначе в браузере
let track_button = true // true - да | false - нет
let track_button_text = `Ссылка на трек` // Название кнопки с ссылкой на текущий трек
// Ссылка на большую картинку или гифку, если хотите поставить свою. По умолчанию: ym (логотип Яндекс.Музыки)
// Чтобы выключить - оставьте пустые кавычки
let largeImage = `ym`
// Надпись при наведении на большую картинку
// Чтобы выключить - оставьте пустые кавычки
let largeImageText = ``
// Ссылка на маленькую картинку или гифку. По умолчанию: music (значок наушников)
// Чтобы выключить - оставьте пустые кавычки
let smallImage = `music`
// Надпись при наведении на маленькую картинку. По умолчанию: Слушаю музыку
// Чтобы выключить - оставьте пустые кавычки
let smallImageText = `Слушаю музыку`
// Показывать таймер до окончания трека? По умолчанию: true (true/false)
let timestamp = true
// Выключать активность по окончанию таймера (когда музыка не играет)? По умолчанию: true (true/false)
let offActivityOnTimer = true



// НЕ ЗНАЕШЬ? НЕ ТРОГАЙ!
// НЕ ЗНАЕШЬ? НЕ ТРОГАЙ!
// НЕ ЗНАЕШЬ? НЕ ТРОГАЙ!
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
  let details = `нет`
  let artists = `нет`
  let endTimestamp = `0`
  let buttons = []
  let activity = {}
  setInterval(async () => {
      Mclient.default
      .getQueues(device)
      .then(async ({result}) => {
        const currentQueue = await Mclient.default.getQueueById(result.queues[0].id);
        const {tracks, currentIndex} = currentQueue.result;
        const currentTrackId = tracks[currentIndex ?? 0];

        if (currentTrackId !== undefined) {
          const currentTrack = (await Mclient.tracks.getTracks({"track-ids": [`${currentTrackId?.trackId}:${currentTrackId?.albumId}`]})).result[0]

          artists = ``
          for (let i = 0; i < currentTrack.artists.length; i++) {
            if (!artists.includes(currentTrack.artists[i].name)) artists += currentTrack.artists[i].name
            if (artists.split(`, `).length !== currentTrack.artists.length && currentTrack.artists.length !== i+1) artists += `, `
          }

          if (activity?.details !== currentTrack.title) {
            endTimestamp = Date.now() + currentTrack.durationMs // Время до окончания трека (не в активности)

            activity.details = currentTrack.title
            activity.state = artists

            if (track_button == true && track_button_text !== ``) {
              activity.buttons = [
                {
                  label: track_button_text,
                  url: `https://music.yandex.ru/album/${currentTrackId?.albumId}/track/${currentTrackId?.trackId}`
                }
              ]
            }

            if (largeImage !== ``) activity.largeImageKey = largeImage
            if (largeImageText !== ``) activity.largeImageText = largeImageText
            if (timestamp == true) activity.endTimestamp = endTimestamp
            if (smallImage !== ``) activity.smallImageKey = smallImage
            if (smallImageText !== ``) activity.smallImageText = smallImageText

            if (github_button == true && !buttons[1] && github_button_text !== ``) {
              activity.buttons.push(
                {
                  label: github_button_text,
                  url: `https://github.com/KailHet/ymDiscordRPC`
                }
              )
            }
          }
        }
        if (endTimestamp > Date.now()) {
          client.user?.setActivity(activity)
        } else if (offActivityOnTimer == true) {
          client.user?.clearActivity()
        }
      })
      .catch(e => {})
  }, 500);
  console.log(`Rich Presence Активна!`)
})

client.login().catch(e => console.log(e))
