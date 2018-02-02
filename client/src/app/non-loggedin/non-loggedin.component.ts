import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import{ FormsModule} from '@angular/forms';
import {Router} from '@angular/router'
import { RollService } from '../roll.service';
import {RoutingService} from '../routing.service'

@Component({
  selector: 'app-non-loggedin',
  templateUrl: './non-loggedin.component.html',
  styleUrls: ['./non-loggedin.component.css']
})
export class NonLoggedinComponent implements OnInit {
  freeroller;//bound to form with submit function
  freerollerhistory;//managed by service behavioursubject
  rollerrors;//managed by behavioursubject


  constructor(private rservice:RollService, private routes:RoutingService) { 
    
    this.freeroller={
      rollstring:""
    }
  }

  ngOnInit() {
    this.rservice.freerollerhistory.subscribe(
      (res)=>{
        this.freerollerhistory=res;
      }
      
    )

    this.rservice.rollerrors.subscribe(
      (res)=>{
        this.rollerrors=res;
      }
    )
  }
  rollString(){
    console.log("hitting submit")
    this.rservice.rollstring(this.freeroller, ()=>{
      this.freeroller={
        rollstring:""
      }
    })


 
    
  }
  rerollString(str){
    console.log("rerolling", str)
    let reroller={
      rollstring:str
    }
    this.rservice.rollstring(reroller,()=>{
      this.freeroller={
        rollstring:""
      }
    })

  }
  routeToLogin(){
    console.log("going to login")
    this.routes.gotologin()

  }

}
