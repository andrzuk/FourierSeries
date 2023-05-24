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
    distance: new FormControl('2'),
  }); 

  constructor(public appComponent: AppComponent, private actionService: ActionsService) { }

  ngOnInit(): void {
    this.actionService.updateActionMessage('init');
  }
 
  generateClick() {
    const points = parseInt(this.inputForm.controls.points.value || '0'); 
    const harmonic = parseInt(this.inputForm.controls.harmonic.value || '0'); 
    const distance = parseInt(this.inputForm.controls.distance.value || '0'); 
    this.appComponent.seriesData = [];
    for (var i = 0; i <= points; i++) {
      const x = distance * i * Math.PI / points;
      var u = 0;
      for (var j = 0; j < harmonic; j++) {
        u += 1 / (2 * j + 1) * Math.sin((2 * j + 1) * x);
      }
      this.appComponent.seriesData.push({ id: i, value: u });
    }
    this.appComponent.transformData = [];
    for (var k = 0; k < harmonic; k++) {
      const u = 1 / (k + 1);
      this.appComponent.transformData.push({ id: k, value: u });
    }
    this.actionService.updateActionMessage('generate');
  }
}
