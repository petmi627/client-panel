import { Component, OnInit } from '@angular/core';
import {Client} from '../../models/client';
import {FlashMessagesService} from 'angular2-flash-messages';
import {ClientService} from '../../service/client.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SettingsService} from '../../service/settings.service';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.css']
})
export class ClientEditComponent implements OnInit {
    id: string;
    client: Client = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        balance: 0
    };
    disableBalanceOnEdit: boolean = true;

    constructor(
        private flashMessage: FlashMessagesService,
        private clientService: ClientService,
        private settingsService: SettingsService,
        private router: Router,
        private route: ActivatedRoute,
    ) { }

    ngOnInit() {
        this.disableBalanceOnEdit = this.settingsService.getSettings().disableBalanceOnEdit;
        // Get id from URL
        this.id = this.route.snapshot.params['id'];
        // Get client
        this.clientService.getClient(this.id).subscribe(client => {
            this.client = client;
        });
    }

    onSubmit({value, valid}: {value: Client, valid: boolean})
    {
        if (!valid) {
            this.flashMessage.show('Please fill out the form correctly',
                {cssClass: 'alert-danger', timeout: 4000});
        } else {
            // Add id
            value.id = this.id;
            // Add a new Client
            this.clientService.updateClient(value);
            // Show Message
            this.flashMessage.show('Client saved',
                {cssClass: 'alert-success', timeout: 4000});
            // Redirect to Dash
            this.router.navigate([`/client/${this.id}`]);
        }
    }

}
