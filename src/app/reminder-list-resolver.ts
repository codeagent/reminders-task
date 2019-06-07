import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { IReminder } from './reminders';
import { StorageService } from './storage.service';

// @todo: use Http
@Injectable()
export class ReminderListResolver implements Resolve<IReminder[]> {
    constructor(protected api: ApiService, protected auth: AuthService, private storage: StorageService) {
    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IReminder[]> | Promise<IReminder[]> | IReminder[] {
        let promise = null;
        if (!this.storage.getItem('reminders')) {
            promise = this.api.getReminders(this.auth.getUser().getId()).then(_ => {
                this.storage.setItem('reminders', _);
                return _;
            });
        } else {
            promise = Promise.resolve(this.storage.getItem('reminders'));
        }
        if (route.data.name === 'all' || route.data.name === 'search') {    // All | Search
            return promise;
        }
        if (route.data.name === 'active') { // active
            return promise.then(list => list.filter(n => n.active));
        }
        if (route.data.name === 'skipped') { // skipped
            return promise.then(list => list.filter(n => !n.active));
        }
        return Promise.reject([]);
    }
}
