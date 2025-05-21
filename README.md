# 🎬 cinema-admin

**cinema-admin** — админ-панель для управления витриной кинотеатра.

---

## ✨ Состав проекта

- `client/` — frontend на React + Vite
- `server/` — backend на Ruby on Rails 8
- PostgreSQL как база данных
- Docker / docker-compose для оркестрации

---

## 🚀 Запуск в Docker

1. Убедитесь, что Docker запущен локально
2. В корне проекта выполните:

   ```bash
   docker-compose up --build
   ```

3. После запуска:
    - Клиент: [http://localhost:3000](http://localhost:3000)
    - Сервер: [http://localhost:3001](http://localhost:3001)

4. При первом открытии клиента могут некорректно уйти запросы на сервер, обновите страницу
---

## 📊 Запуск локально (React + Rails)

### Бэкенд (Rails)

1. Создайте PostgreSQL базу, используя `server/config/database.yml`
2. Установите Ruby 3.2.7, Rails ~> 8.0
3. Запустите команды:

   ```bash
   cd server
   bundle install
   rails db:setup
   rails db:migrate
   rails db:seed
   rails s
   ```

### Фронтенд (React + Vite)

1. Установите Node.js версии не ниже `18.18.0`
2. Запустите:

   ```bash
   cd client
   npm install
   npm run dev
   ```

3. Фронт будет доступен по адресу: [http://localhost:3000](http://localhost:3000)

---

## 🔧 Требования

- Ruby: `3.2.7`
- Rails: `~> 8.0`
- Node.js: `>= 18.18.0`
- PostgreSQL: `15+`