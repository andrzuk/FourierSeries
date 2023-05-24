import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'; 

import { AppComponent } from '../app.component'; 

import { ActionsService } from '../actions.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent {

  inputForm = new FormGroup({
    points: new FormControl('200'),
    harmonic: new FormControl('10'),
  }); 

  constructor(public appComponent: AppComponent, private actionService: ActionsService) { }

  ngOnInit(): void {
    this.actionService.updateActionMessage('init');
  }
 
  generateClick() {
    
  }
}
