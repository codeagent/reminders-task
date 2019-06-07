import { Injectable, Inject } from '@angular/core';
import { ApiService } from './api.service';
import { StorageService } from './storage.service';

export class User {
  constructor(private id: string, private name: string) { }
  getId() {
    return this.id;
  }
  getName() {
    return this.name;
  }
}

@Injectable()
export class AuthService {

  static KEY_NAME = 'user';

  private user: User = null;

  constructor(private api: ApiService, private storage: StorageService) {
    const user = this.storage.getItem(AuthService.KEY_NAME);
    if (user) {
      this.user = new User(user.id, user.name);
    }
  }

  getUser() {
    return this.user;
  }

  signIn() {
    return this.api.auth().then(r => {
      this.storage.setItem(AuthService.KEY_NAME, r);
      this.user = new User(r.id, r.name);
    });
  }

  signOut() {
    this.storage.clear();
    this.user = null;
  }

  isSignedIn() {
    return this.user !== null;
  }
}
