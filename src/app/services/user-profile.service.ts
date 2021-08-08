import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private user_data = {}
  constructor() { }

  set_data(data) {
    this.user_data = data;
  }

  get_data() {
    return this.user_data;
  }
}
