import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'Rxjs/behaviorsubject'
import { Router } from '@angular/router';

var rollLib=require('./diceroll_library.js')


@Injectable()
export class RollService {
  freerollerhistory:BehaviorSubject<any[]>= new BehaviorSubject([]);
  rollerrors:BehaviorSubject<any[]>= new BehaviorSubject([]);
  constructor() { }
  rollstring(freeroller, cb){
    // console.log(rollLib)
    
    this.rollerrors.next([])
    // console.log("inservice",freeroller.rollstring)

    // console.log(rollLib.parseRollString(freeroller.rollstring))
    // console.log(rollLib.rollString(freeroller.rollstring))

    if(!rollLib.parseRollString(freeroller.rollstring)){
      console.log("invalid string")
      this.rollerrors.next(["invalid roll string"])

    }else{
      var  history=this.freerollerhistory.getValue()
      console.log("historymod happenging")
      
      for(let i=history.length;i>0;i--){
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







}
