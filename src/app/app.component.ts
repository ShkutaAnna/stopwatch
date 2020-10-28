import { Component } from '@angular/core';
import { Subscription, timer } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'stopwatch';
  
  time : number = 0;
  displayedTime = this.getDisplayedTime(this.time);

  isWaiting : boolean = false;
  isRunning : boolean = false;

  clickCount : number = 0;

  timerSubscription: Subscription;
  
  ngOnInit(){
    this.timerSubscription = timer(0, 1000).subscribe(ellapsedCycles => {
      if(this.isRunning){
        this.time++;
      }
      this.displayedTime = this.getDisplayedTime(this.time);
    });
  }

  startStopAction(){
    if(!this.isWaiting){
      this.time = 0;
    }else{
      this.isWaiting = false;
    }
    this.isRunning = !this.isRunning;
  }

  waitAction(){
    this.clickCount++;
    if(this.clickCount === 1){
      setTimeout(() => {
        this.clickCount = 0;
      }, 300)
    } else {
      this.clickCount = 0;
      if(!this.isRunning)
        return;
      this.isRunning = !this.isRunning;
      this.isWaiting = !this.isWaiting;
    }
  }

  resetAction(){
    this.time = 0;
    this.isRunning = true;
  }

  getDisplayedTime(time:number){
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor(time % 3600 / 60);
    const seconds = Math.floor(time % 3600 % 60);

    return (hours < 10 ? ('0' + hours) : hours) + ':' 
      + (minutes < 10 ? ('0' + minutes) : minutes) + ':' 
      + (seconds < 10 ? ('0' + seconds) : seconds);
  }

  ngOnDestroy() {
    this.timerSubscription.unsubscribe();
  }
}
