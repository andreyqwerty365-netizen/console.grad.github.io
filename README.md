# КонсольГрад

Статический сайт без шага сборки.

## Локальный запуск

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Открыть `http://127.0.0.1:4173/index.html`.

## Проверка

```powershell
powershell -ExecutionPolicy Bypass -File tests/site-smoke.ps1
node --check script.js
```

## Публикация

Amvera собирает `Dockerfile` из ветки `main`. Контейнер Nginx слушает порт 80.
