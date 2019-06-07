import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { IReminder } from './reminders';
import { StorageService } from './storage.service';

// @todo: use HttpInterceptors
@Injectable()
export class ReminderResolver implements Resolve<IReminder[]> {
    constructor(protected api: ApiService, protected auth: AuthService, private storage: StorageService) {
    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IReminder[]> | Promise<IReminder[]> | IReminder[] {
        // api for single entity emulation:
        // this.api.getReminder(userId, reminderId)
        let promise = null;
        if (this.storage.getItem('reminders')) {
            promise = Promise.resolve(this.storage.getItem('reminders'));
        } else {
            promise = this.api.getReminders(this.auth.getUser().getId()).then(_ => {
                this.storage.setItem('reminders', _);
                return _;
            });
        }
        return promise.then(_ => {
            const model = _.find(e => e.id === route.params.id);
            if (!model) {
                return Promise.reject();
            } else {
                return Promise.resolve(model);
            }
        });
    }
}
