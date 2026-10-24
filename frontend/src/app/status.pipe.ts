import { Pipe, PipeTransform } from '@angular/core';

// Pipe PURO (o padrão): só roda de novo quando o valor de entrada muda.
// Por isso é melhor que chamar um método no template, que roda a cada detecção de mudanças.
@Pipe({ name: 'status' })
export class StatusPipe implements PipeTransform {
  transform(concluida: boolean): string {
    return concluida ? 'Feita' : 'Pendente';
  }
}
