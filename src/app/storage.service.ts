import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  get length() {
    return localStorage.length;
  }

  clear(): void {
    localStorage.clear();
  }

  getItem(key: string): any {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : null;
  }

  key(index: number): string | null {
    return localStorage.key(index);
  }

  removeItem(key: string): void {
    return localStorage.removeItem(key);
  }

  setItem(key: string, value: string): void {
    localStorage.setItem(key, JSON.stringify(value))
  }

}
