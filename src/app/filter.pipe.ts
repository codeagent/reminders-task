import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe<T> implements PipeTransform {
  transform(value: T[], token: string, key: null | string): T[] {
    const regex = new RegExp(`^${token}`);
    if (!key) {
      return value.filter(e => regex.test(e.toString()));
    } else {
      return value.filter(e => regex.test(e[key].toString()));
    }
  }
}
