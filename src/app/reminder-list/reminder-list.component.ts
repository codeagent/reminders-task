import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { AppComponent } from '../app.component';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DeletePromptDialogComponent } from '../delete-prompt-dialog/delete-prompt-dialog.component';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';

import * as moment from 'moment';
import { StorageService } from '../storage.service';
import { NotifyService } from '../notify.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reminder-list',
  templateUrl: './reminder-list.component.html',
  styleUrls: ['./reminder-list.component.css']
})
export class ReminderListComponent implements OnInit, OnDestroy {

  groups;
  reminders;
  title;
  private subscription: Subscription;
  constructor(
    private app: AppComponent,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private api: ApiService,
    private storage: StorageService,
    private notifier: NotifyService,
    private auth: AuthService) {
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      let reminders = data.reminders;
      this.reminders = reminders;
      this.title = data.title;

      reminders.forEach(element => {
        element.date = moment(element.date).format('YYYY-MM-DD HH:mm:ss');
      });
      const sorter = (a, b) => { if (a.date > b.date) { return -1; } else if (a.date < b.date) { return 1; } return 0; };
      reminders.sort(sorter);

      const ys = moment().startOf('year');
      const ye = moment().endOf('year');
      reminders = reminders.reduce((result, item) => {
        let date = moment(item.date);
        const month = date.format('YYYY-MM');
        let group = result[month] = result[month] || {
          month,
          title: date.isBetween(ys, ye) ? date.format('MMMM') : date.format('MMMM YYYY'),
          items: []
        };
        group.items.push(item);
        return result;
      }, {});

      /// Order by date
      reminders = Object.values(reminders);
      reminders.sort(sorter);
      this.groups = reminders;
    });

    // Subscribe to notifier -> data update
    this.subscription = this.notifier.notifications.subscribe(_ => {
      this.reminders.find(e => e.id === _.data.id).active = false;
      this.storage.removeItem('reminders');
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  goto(reminder) {
    this.router.navigate(['reminders', reminder.id, 'edit']);
  }

  toggleSidenav() {
    this.app.toggleSidenav();
  }

  showPrompt(reminder) {
    const dialogRef = this.dialog.open(DeletePromptDialogComponent, {
      width: '250px',
      data: reminder
    });

    dialogRef.afterClosed().toPromise()
      .then(result => {
        if (result) {
          return this.api.deleteReminder(this.auth.getUser().getId(), reminder.id);
        } else {
          return Promise.reject(false);
        }
      })
      .then(_ => {
        this.storage.removeItem('reminders');
        reminder.deleted = true;
      })
      .catch(_ => { });
  }
}
