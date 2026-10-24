import { Directive, HostBinding, HostListener } from '@angular/core';

// Diretiva de ATRIBUTO: muda o estilo de um elemento que já existe (não cria nem remove nada do DOM).
// Uso: <li appDestaque>
@Directive({ selector: '[appDestaque]' })
export class DestaqueDirective {
  @HostBinding('style.backgroundColor') fundo = '';

  @HostListener('mouseenter') entrar() {
    this.fundo = '#eef4ff';
  }

  @HostListener('mouseleave') sair() {
    this.fundo = '';
  }
}
