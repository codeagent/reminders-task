import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { AuthService } from './auth.service';
import { Router, ActivatedRoute, Event, NavigationStart, NavigationEnd, NavigationCancel } from '@angular/router';
import { NotifyService } from './notify.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StorageService } from './storage.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('snav', { static: true })
  private sidenav: MatSidenav;

  constructor(
    private auth: AuthService,
    private router: Router,
    private notifier: NotifyService,
    private snakbar: MatSnackBar,
    private storage: StorageService
  ) { }

  ngOnInit() {
    this.notifier.notifications.subscribe(_ => {
      if (this.auth.isSignedIn()) {
        const audio = new Audio();
        audio.src = './assets/ding.wav';
        audio.play();
        this.snakbar.open(_.data.note, 'CLOSE', {
          duration: 15000
        });
      }
    });

    this.router.events.subscribe((e: Event) => {
      if (e instanceof NavigationEnd) {
        // Sync notifier data
        if (this.auth.isSignedIn()) {
          this.notifier.setData(this.storage.getItem('reminders') || []);
        }
      }
    });
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }

  get username() {
    if (this.auth.isSignedIn()) {
      return this.auth.getUser().getName();
    } else {
      return '';
    }
  }

  logout() {
    this.sidenav.close();
    this.auth.signOut();
    this.router.navigate(['/login']);
  }

}
