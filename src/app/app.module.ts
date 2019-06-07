import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ReminderListComponent } from './reminder-list/reminder-list.component';
import { ReminderFormComponent } from './reminder-form/reminder-form.component';
import { SearchComponent } from './search/search.component';
import { DeletePromptDialogComponent } from './delete-prompt-dialog/delete-prompt-dialog.component';
import { LoginComponent } from './login/login.component';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { ReminderListResolver } from './reminder-list-resolver';
import { ReminderResolver } from './reminder-resolver';
import { FilterPipe } from './filter.pipe';
import { NotifyService } from './notify.service';
import { HttpInterceptor as AppHttpInterceptor } from './http-interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { StorageService } from './storage.service';

@NgModule({
  declarations: [
    AppComponent,
    ReminderListComponent,
    ReminderFormComponent,
    SearchComponent,
    DeletePromptDialogComponent,
    LoginComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule
  ],
  entryComponents: [
    DeletePromptDialogComponent
  ],
  providers: [
    { provide: StorageService, useClass: StorageService },
    { provide: ApiService, useClass: ApiService },
    { provide: AuthService, useClass: AuthService },
    AuthGuard,
    ReminderListResolver,
    ReminderResolver,
    FilterPipe,
    NotifyService,
    // AppHttpInterceptor,
    { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true },
    // {
    //   provide: 'Audio', useFactory() {
    //     const audio = new Audio();
    //     audio.src = './assets/ding.wav';
    //     return audio;
    //   }
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
