import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { DeletePromptDialogComponent } from '../delete-prompt-dialog/delete-prompt-dialog.component';
import * as moment from 'moment';
import { MatDialog } from '@angular/material';
import { StorageService } from '../storage.service';

class Reminder {
  constructor(
    public id: string | null,
    public note: string,
    public date: Date,
    public time: string
  ) { }
}

@Component({
  selector: 'app-reminder-form',
  templateUrl: './reminder-form.component.html',
  styleUrls: ['./reminder-form.component.css']
})
export class ReminderFormComponent implements OnInit {

  model: Reminder;
  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService,
    private dialog: MatDialog,
    private storage: StorageService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      if (data.reminder) {
        const datetime = moment(data.reminder.date);
        this.model = new Reminder(
          data.reminder.id, data.reminder.note, moment(datetime).startOf('day').toDate(), datetime.format('HH:mm:ss')
        );
      } else {
        const now = moment();
        this.model = new Reminder(null, 'New note', now.toDate(), now.add(5, 'minutes').startOf('minute').format('HH:mm:ss'));
      }
    });
  }

  submit(form) {
    if (form.valid) {
      const datetime = moment(`${moment(this.model.date).format('YYYY-MM-DD')} ${this.model.time}`);
      if (!this.model.id) {
        this.api.createReminder(this.auth.getUser().getId(), {
          note: this.model.note,
          date: datetime.toISOString()
        }).then(_ => {
          this.storage.removeItem('reminders');
          this.router.navigate(['/reminders']);
        });
      } else {
        this.api.updateReminder(this.auth.getUser().getId(), this.model.id, {
          note: this.model.note,
          date: datetime.toISOString()
        }).then(_ => {
          this.storage.removeItem('reminders');
          this.router.navigate(['/reminders']);
        });
      }
    }
  }

  showPrompt() {
    const dialogRef = this.dialog.open(DeletePromptDialogComponent, {
      width: '250px',
      data: this.model
    });

    dialogRef.afterClosed().toPromise()
      .then(result => {
        if (result) {
          return this.api.deleteReminder(this.auth.getUser().getId(), this.model.id);
        } else {
          return Promise.reject(false);
        }
      })
      .then(_ => {
        this.storage.removeItem('reminders');
        this.router.navigate(['/reminders']);
      })
      .catch(_ => { });
  }
}
