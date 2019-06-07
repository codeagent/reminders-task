import { InjectionToken } from '@angular/core';

export interface IReminderData {
    note: string;
    date: string;
}

export interface IReminder {
    id: string;
    note: string;
    date: string;
}
