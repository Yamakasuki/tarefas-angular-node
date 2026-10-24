import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BehaviorSubject, switchMap } from 'rxjs';
import { TarefaService } from './tarefa.service';
import { StatusPipe } from './status.pipe';
import { DestaqueDirective } from './destaque.directive';

@Component({
  selector: 'app-root',
  imports: [AsyncPipe, ReactiveFormsModule, StatusPipe, DestaqueDirective],
  templateUrl: './app.html',
  styleUrl: './app.css',
  // OnPush: o componente só é verificado quando um input muda, um evento ocorre nele
  // ou um async pipe emite. Menos trabalho para a detecção de mudanças.
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private service = inject(TarefaService);

  // Reactive Forms: o campo e a validação ficam no TypeScript, não no HTML.
  // O FormGroup ligado ao <form> é o que faz o (ngSubmit) funcionar sem recarregar a página.
  form = new FormGroup({
    titulo: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  // Cada next() pede a lista de novo. switchMap cancela a requisição anterior se outra chegar.
  private recarregar$ = new BehaviorSubject<void>(undefined);
  tarefas$ = this.recarregar$.pipe(switchMap(() => this.service.listar()));

  adicionar() {
    if (this.form.invalid) return;
    this.service.criar(this.form.getRawValue().titulo).subscribe(() => {
      this.form.reset();
      this.recarregar$.next();
    });
  }

  alternar(id: number) {
    this.service.alternar(id).subscribe(() => this.recarregar$.next());
  }

  remover(id: number) {
    this.service.remover(id).subscribe(() => this.recarregar$.next());
  }
}
