import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Tarefa {
  id: number;
  titulo: string;
  concluida: boolean;
}

// Service: concentra o acesso à API e é injetado nos componentes (injeção de dependência).
// providedIn: 'root' -> uma única instância (singleton) para o app inteiro.
@Injectable({ providedIn: 'root' })
export class TarefaService {
  private http = inject(HttpClient);
  private url = '/api/tarefas'; // o proxy.conf.json redireciona para http://localhost:3000

  // HttpClient devolve Observables "cold": a requisição só sai quando alguém se inscreve.
  listar(): Observable<Tarefa[]> {
    return this.http.get<Tarefa[]>(this.url);
  }

  criar(titulo: string): Observable<Tarefa> {
    return this.http.post<Tarefa>(this.url, { titulo });
  }

  alternar(id: number): Observable<Tarefa> {
    return this.http.patch<Tarefa>(`${this.url}/${id}`, {});
  }

  remover(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
