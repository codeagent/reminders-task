import { Injectable } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';

@Injectable()
export class NotifyService {

  private observable;
  private worker;

  constructor() {
    this.worker = new Worker('./worker.worker', { type: 'module' });
    this.observable = fromEvent(this.worker, 'message');
    this.worker.postMessage({ data: [] });
  }

  get notifications() {
    return this.observable;
  }

  setData(data) {
    this.worker.postMessage({ data });
  }
}
