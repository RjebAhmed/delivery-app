import { Component } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  mySubscription: Subscription

  constructor() {
    // this.mySubscription = interval(1000).subscribe((x => {

    // }));
  }
}
