# vuesp.led-matrix

LED-матрица 16×16: эффекты, сценарии и визуальный редактор `/draw`.

Проект собран на базе шаблона [Vuesp](https://github.com/bondrogeen/vuesp): прошивка PlatformIO + web UI на Vue 3 и `vuesp-components`.

## Документация

Подробное описание платы, распиновка, схема, ScriptRunner и ограничения — в [DOCS.md](./DOCS.md).

## Особенности

- 256 WS2812B на GPIO14 (D5), шесть эффектов и редактор `/draw`.
- Датчики BMP280 и AHT10/20 на I2C (SDA GPIO0, SCL GPIO2).
- Кнопка переключения эффектов на GPIO13.

## Плата и окружение

- PlatformIO env: `esp8266`
- Прошивка: `platformio.ini`
- Web UI: `vue/`
- Файловая система: LittleFS, веб-сборка попадает в `data/www`

## Сборка

```bash
cd vue
npm ci
npm run build-web
```

Полная сборка (web + прошивка):

```bash
cd vue
npm run build
```

Либо отдельно:

```bash
~/.platformio/penv/bin/pio run
~/.platformio/penv/bin/pio run -t buildfs
```

## Возможности

- локальный веб-интерфейс без облака;
- настройка Wi-Fi, безопасности, GPIO и файловой системы;
- dashboard с плитками устройств;
- сценарии и автоматизация;
- обновление прошивки и файловой системы через веб-интерфейс.

## CI

GitHub Actions собирает web UI, прошивку и LittleFS для указанных env, запускает тесты ScriptRunner и публикует артефакты в релиз при пуше тега.

## Репозиторий

<https://github.com/bondrogeen/vuesp.led-matrix>
