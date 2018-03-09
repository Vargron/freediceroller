import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject'
import { Router } from '@angular/router';

var rollLib=require('./diceroll_library.js')


@Injectable()
export class RollService {
  freerollerhistory:BehaviorSubject<any[]>= new BehaviorSubject([]);
  rollerrors:BehaviorSubject<any[]>= new BehaviorSubject([]);
  explanation:BehaviorSubject<any>= new BehaviorSubject(false);
  reg_alert:BehaviorSubject<any>= new BehaviorSubject(false);
  constructor() { }
  rollstring(freeroller, cb){
    // console.log(rollLib)
    
    this.rollerrors.next([])
    // console.log("inservice",freeroller.rollstring)

    // console.log(rollLib.parseRollString(freeroller.rollstring))
    // console.log(rollLib.rollString(freeroller.rollstring))

    if(!rollLib.parseRollString(freeroller.rollstring)){
      // console.log("invalid string")
      this.rollerrors.next(["invalid roll string"])

    }else{
      var  history=this.freerollerhistory.getValue()
      // console.log("historymod happenging")
      let max=10;
      if(history.length<10){
        max=history.length
      }
      if(history.length==9){
        this.reg_alert.next(true);
      }
      for(let i=max;i>0;i--){
        history[i]=history[i-1];
      }
      history[0]= ({
        roll:freeroller.rollstring,
        result:rollLib.rollString(freeroller.rollstring)
       
      });
      this.freerollerhistory.next(history)
     
      
    }

    cb()


  }
  validatestring(rollstring,cb){
    cb(rollLib.parseRollString(rollstring))
  }
  rollcharstring(roll,cb){
    // console.log(roll)
    let result={
      name:roll.name,
      rollstring:roll.rollstring,
      result:rollLib.rollString(roll.rollstring),
    }

    cb(result)

  }




  show_explanation(){
    console.log("inservice", this.explanation)
    if(this.explanation.getValue()==false){
      this.explanation.next(true)
    }else{
      this.explanation.next(false)
    }
  }








}
