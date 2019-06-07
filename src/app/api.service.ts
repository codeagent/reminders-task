import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { IReminderData } from './reminders';

@Injectable()
export class ApiService {

  static API_URI = 'https://europe-west1-st-testcase.cloudfunctions.net/api';

  constructor(private client: HttpClient) { }

  public auth() {
    return this.client.post(`${ApiService.API_URI}/auth`, {}).toPromise<any>();
  }

  public getReminders(userId) {
    const now = moment.now();
    return this.client.get(`${ApiService.API_URI}/reminders`, { params: { userId } }).toPromise<any>().then(items => {
      items.forEach(i => { i.active = moment(i.date).isAfter(now); });
      return items;
    });
  }

  public createReminder(userId, data: IReminderData) {
    return this.client.post(`${ApiService.API_URI}/reminders`, data, { params: { userId } }).toPromise<any>();
  }

  public updateReminder(userId, reminderId, data: IReminderData) {
    return this.client.put(`${ApiService.API_URI}/reminders/${reminderId}`, data, { params: { userId } }).toPromise<any>();
  }

  public deleteReminder(userId, reminderId) {
    return this.client.delete(`${ApiService.API_URI}/reminders/${reminderId}`, { params: { userId } }).toPromise<any>();
  }
}
