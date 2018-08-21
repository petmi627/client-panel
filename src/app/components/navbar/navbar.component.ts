import { Component, OnInit } from '@angular/core';
import {Client} from '../../models/client';
import {FlashMessagesService} from 'angular2-flash-messages';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../service/auth.service';
import {SettingsService} from '../../service/settings.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    isLoggedIn: boolean = false;
    loggedInUser: string;
    showRegister: string;

    constructor(
        private flashMessage: FlashMessagesService,
        private authService: AuthService,
        private router: Router,
        private settingsService: SettingsService
    ) { }

  ngOnInit() {
      this.authService.getAuth().subscribe(auth => {
          if (auth) {
              this.isLoggedIn = true;
              this.loggedInUser = auth.email;
          } else {
            this.isLoggedIn = false;
          }
      });

      this.showRegister = this.settingsService.getSettings().allowRegistration;
  }

  onLogoutClick() {
      this.authService.logout();
      this.flashMessage.show('You are now logged out', {cssClass: 'alert-success', timeout: 4000});
      this.router.navigate(['/login']);
  }

}
