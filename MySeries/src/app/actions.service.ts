import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActionsService {

  private actionStageMessage = new BehaviorSubject('generate');
 
  currentActionStageMessage = this.actionStageMessage.asObservable();
  
  constructor() { }

  updateActionMessage(message: string) {
    this.actionStageMessage.next(message);
  }
}
