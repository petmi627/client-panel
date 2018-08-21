import { Component, OnInit } from '@angular/core';
import {Settings} from '../../models/settings';
import {SettingsService} from '../../service/settings.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settings: Settings;

  constructor(
      private settingsService: SettingsService,
      private flashMessage: FlashMessagesService,
      private router: Router
  ) { }

  ngOnInit() {
    this.settings = this.settingsService.getSettings();
  }

  onSubmit() {
    this.settingsService.changeSettings(this.settings);
    this.flashMessage.show('Settings saved', {cssClass: 'alert-success', timeout: 4000});
  }

}
