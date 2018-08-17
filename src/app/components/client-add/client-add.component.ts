import {Component, OnInit, ViewChild} from '@angular/core';
import {Client} from '../../models/client';
import {FlashMessagesService} from 'angular2-flash-messages';
import {ClientService} from '../../service/client.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-client-add',
  templateUrl: './client-add.component.html',
  styleUrls: ['./client-add.component.css']
})
export class ClientAddComponent implements OnInit {
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  };

  disableBalanceOnAdd: boolean = true;
  @ViewChild('clientForm') form: any;

  constructor(
      private flashMessagesService: FlashMessagesService,
      private clientService: ClientService,
      private router: Router
  ) {}

  ngOnInit() {
  }

  onSubmit({value, valid}: {value: Client, valid: boolean}) {
    if (this.disableBalanceOnAdd) {
      value.balance = 0;
    }

    if (!valid) {
      this.flashMessagesService.show('Please fill out the form correctly',
          {cssClass: 'alert-danger', timeout: 4000});
    } else {
      // Add a new Client
      this.clientService.newClient(value);
      // Show Message
      this.flashMessagesService.show('Client saved',
            {cssClass: 'alert-success', timeout: 4000});
      // Redirect to Dash
      this.router.navigate(['/']);
    }
  }

}
