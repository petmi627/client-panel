import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import {SettingsService} from '../service/settings.service';

@Injectable({
    providedIn: 'root'
})

export class RegisterGuard implements  CanActivate {
    constructor(
        private router: Router,
        private settingsService: SettingsService
    ) {}

    canActivate(): boolean {
        if (this.settingsService.getSettings().allowRegistration) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}
