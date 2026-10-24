# Tarefas — Angular + Node.js

Lista de tarefas mínima para estudar **Angular** (frontend) e **Node.js/Express** (backend em JavaScript) com um banco **SQLite**.

```
Navegador (Angular, :4200) --/api--> proxy --> Express (:3000) --> SQLite (tarefas.db)
```

## Como rodar

Precisa do Node 22.5 ou mais novo (o SQLite já vem embutido).

```bash
# terminal 1 — API
cd backend
npm install
npm start            # http://localhost:3000/api/tarefas

# terminal 2 — site
cd frontend
npm install
npx ng serve         # abra http://localhost:4200
```

## API

| Método | Rota               | O que faz                   |
|--------|--------------------|-----------------------------|
| GET    | /api/tarefas       | lista as tarefas            |
| POST   | /api/tarefas       | cria (`{ "titulo": "..." }`) |
| PATCH  | /api/tarefas/:id   | alterna feita/pendente      |
| DELETE | /api/tarefas/:id   | remove                      |

## Onde está cada conceito de Angular

| Conceito | Arquivo |
|---|---|
| Componente standalone + `OnPush` | `frontend/src/app/app.ts` |
| Service + injeção de dependência + `HttpClient` | `frontend/src/app/tarefa.service.ts` |
| Pipe puro customizado | `frontend/src/app/status.pipe.ts` |
| Diretiva de atributo customizada | `frontend/src/app/destaque.directive.ts` |
| Diretivas estruturais (`@if`, `@for`) e `async` pipe | `frontend/src/app/app.html` |
| Reactive Forms (`FormControl` + `Validators`) | `frontend/src/app/app.ts` |
| RxJS: `BehaviorSubject` + `switchMap` | `frontend/src/app/app.ts` |
| Proxy de desenvolvimento para a API | `frontend/proxy.conf.json` |

## Backend

`backend/server.js`: Express com quatro rotas REST e o `node:sqlite` com consultas preparadas (`?`), o que evita SQL injection.
