import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'html'
})
export class HtmlPipe implements PipeTransform {
  transform(value: string): any {
    return value;
  }
}
