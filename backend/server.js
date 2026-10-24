// API REST de tarefas: Express (rotas HTTP) + SQLite embutido no Node 22+ (banco num arquivo).
import express from 'express';
import { DatabaseSync } from 'node:sqlite';

const db = new DatabaseSync('tarefas.db');
db.exec(`CREATE TABLE IF NOT EXISTS tarefas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  titulo TEXT NOT NULL,
  concluida INTEGER NOT NULL DEFAULT 0
)`);

// SQLite não tem booleano: guarda 0/1 e converte na saída.
const paraJson = (t) => ({ ...t, concluida: Boolean(t.concluida) });

const app = express();
app.use(express.json()); // lê o corpo JSON das requisições

// GET /api/tarefas -> lista todas
app.get('/api/tarefas', (req, res) => {
  const linhas = db.prepare('SELECT * FROM tarefas ORDER BY id DESC').all();
  res.json(linhas.map(paraJson));
});

// POST /api/tarefas { titulo } -> cria
app.post('/api/tarefas', (req, res) => {
  const titulo = req.body.titulo?.trim();
  if (!titulo) return res.status(400).json({ erro: 'titulo é obrigatório' });
  const { lastInsertRowid } = db.prepare('INSERT INTO tarefas (titulo) VALUES (?)').run(titulo);
  const nova = db.prepare('SELECT * FROM tarefas WHERE id = ?').get(lastInsertRowid);
  res.status(201).json(paraJson(nova));
});

// PATCH /api/tarefas/:id -> alterna concluída/pendente
app.patch('/api/tarefas/:id', (req, res) => {
  db.prepare('UPDATE tarefas SET concluida = 1 - concluida WHERE id = ?').run(req.params.id);
  const tarefa = db.prepare('SELECT * FROM tarefas WHERE id = ?').get(req.params.id);
  if (!tarefa) return res.status(404).json({ erro: 'tarefa não encontrada' });
  res.json(paraJson(tarefa));
});

// DELETE /api/tarefas/:id -> remove
app.delete('/api/tarefas/:id', (req, res) => {
  db.prepare('DELETE FROM tarefas WHERE id = ?').run(req.params.id);
  res.status(204).end();
});

app.listen(3000, () => console.log('API em http://localhost:3000/api/tarefas'));
