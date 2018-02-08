import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'Rxjs/behaviorsubject'
import { Router } from '@angular/router';

var rollLib=require('./diceroll_library.js')


@Injectable()
export class RollService {
  freerollerhistory:BehaviorSubject<any[]>= new BehaviorSubject([]);
  rollerrors:BehaviorSubject<any[]>= new BehaviorSubject([]);
  explanation:BehaviorSubject<any>= new BehaviorSubject(false);
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

  explain_dice_string(){
    alert("A dice string is a represenation of a group of dice."+"\n"+
    "For example:"+"\n"+
     "4 six sided dice is 4d6"+"\n"+
     "In d20 based rules systems a character rolls 1d20+ their base attack bonus to attack"+"\n"+
     "Dice strings should only contain the following characters:"+"\n"+
     "Numerals(0-9) , d, D, +, or - "+"\n"+
     "in the format: xDy+aDb+c "+"\n"+ 
     "Where x,y, a,b, and c are all numbers"+"\n"+
     "You can combine any number of diffrent sized dice and any bonus in this way \
    ")
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
