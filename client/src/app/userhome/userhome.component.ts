import { Component, OnInit } from '@angular/core';
import { UserService } from './../user.service';
import { NgModule } from '@angular/core';

import {Router} from '@angular/router'
import { RollService } from '../roll.service';
import {RoutingService} from '../routing.service';
import {CharacterService} from '../character.service';


@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit {
  freeroller;//bound to form with submit function
  freerollerhistory;//managed by service behavioursubject
  rollerrors;//managed by behavioursubject
  current_user;
  new_character;
  current_characters;
  explanation;
  


  constructor(private rservice:RollService, private uservice:UserService, private cservice:CharacterService, private routes:RoutingService) { 
    this.freeroller={
      rollstring:""
    }
    this.new_character={
      name:"",
      desc:"",
      author_id:"",
    }
    
  }

  ngOnInit() {
    this.uservice.current_user.subscribe(
      (res)=>{
        this.current_user=res;
        this.new_character.author_id=res["_id"];
       
        
      }


      

    )
    this.cservice.find_current_user(
      ()=>{
        this.getallcharacters()
      }
    )
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
    this.cservice.current_characters.subscribe(
      (res)=>{
        this.current_characters=res
      
        
      }
    )
    this.rservice.explanation.subscribe(
      (res)=>{
        this.explanation=res
      }
      
    )


  }
  logout(){
    this.uservice.logout()

  }
  rollString(){
    // console.log("hitting submit")
    this.rservice.rollstring(this.freeroller, ()=>{
      this.freeroller={
        rollstring:""
      }
      
    })


 
    
  }
  rerollString(str){
    // console.log("rerolling", str)
    let reroller={
      rollstring:str,
    }
    this.rservice.rollstring(reroller,()=>{
      this.freeroller={
        rollstring:""
      };
    })

  }
  routeToLogin(){
    // console.log("going to login");
    this.routes.gotologin();

  }
  addcharacter(){
    // console.log(this.new_character);
    this.cservice.addcharacter(this.new_character, 
    ()=>{
      this.new_character.name="";
      this.new_character.desc="";
      this.getallcharacters()

    })
  }
  getallcharacters(){
    this.cservice.getallcharacters( 
      (result)=>{
        // console.log(result)

    })
  }

  viewcharacter(id){
    // console.log(id)
    this.cservice.viewcharacter(id)
    
  }
  deletecharacter(id){
    // console.log(id)
    this.cservice.deletecharacter(id)
  }
  explain_dice_string(){
    this.rservice.explain_dice_string()
  }
  show_explanation(){
    this.rservice.show_explanation()
    
  }
    
  


}
