import { Injectable, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'Rxjs/behaviorsubject';
import { UserService } from './user.service';
@Injectable()
export class CharacterService implements OnInit  {
  current_characters:BehaviorSubject<any>= new BehaviorSubject([]);
  current_user:BehaviorSubject<Object>= new BehaviorSubject({});
  current_character:BehaviorSubject<Object>= new BehaviorSubject({});

  constructor(private http:HttpClient, private router:Router) {
    this.find_current_user(
      ()=>{

      }
    )
  }
  ngOnInit() {
    this.find_current_user(
      ()=>{


      }
    );


  }
  find_current_user(cb){
    console.log("hitting check logged in")
    this.http.get("/user/checksession").subscribe(
      (res)=>{
        console.log(res)
        if(res["user"]){
          this.current_user.next(res["user"])
        }else{
          this.current_user.next({})
        }
        cb()

      }
    )
    

  }
  addcharacter(new_character, cb){
    console.log(this.current_user.getValue())
    this.http.post("/character/add", {
      user:this.current_user.getValue(),
      character:new_character,
    }).subscribe(
      (result)=>{
        console.log(result)
        cb()
      }
     
    )
    

  }
  getallcharacters(cb ){
    this.http.post("/character/searchbyuser", {
      user:this.current_user,


    }).subscribe(
      (res)=>{
        console.log(res)
        this.current_characters.next(res)
        cb(res)


      }
    )
  }
  viewcharacter(id){
    console.log(id)
    
    this.http.post("/character/view",{id:id}).subscribe(
      (res)=>{
        if(!res[0]){
          alert("character id not found")

        }else{
          this.current_character.next(res[0])
          this.router.navigate(["/viewcharacter"])
        }


      }
    )
  }


  deletecharacter(id){
    console.log(id)
    this.http.post("/character/delete", {id:id}).subscribe(
      (res)=>{
        console.log(res)
      }
    )
  }
  addroll(newroll){
    let bob=this.current_character.getValue()
    bob["rolls"].push(newroll)
    console.log(bob)
    
    this.current_character.next(bob)
    this.http.post("/character/update", bob).subscribe(
      (res)=>{
        console.log(res)
      }
    )

  }



   

}
