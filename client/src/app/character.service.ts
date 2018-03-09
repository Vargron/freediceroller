import { Injectable, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { UserService } from './user.service';
@Injectable()
export class CharacterService implements OnInit  {
  current_characters:BehaviorSubject<any>= new BehaviorSubject([]);
  current_user:BehaviorSubject<Object>= new BehaviorSubject({});
  current_character:BehaviorSubject<Object>= new BehaviorSubject({});
  char_roll_log:BehaviorSubject<any>= new BehaviorSubject([]);// tracks roles for current character front end only
  edit_roll_target:BehaviorSubject<Object>= new BehaviorSubject({});
  editing_cur_character:BehaviorSubject<any>= new BehaviorSubject(false);
  char_del_target:BehaviorSubject<String>= new BehaviorSubject("");
  roll_del_target:BehaviorSubject<Number>= new BehaviorSubject(-1);
  char_roll_errors:BehaviorSubject<any>= new BehaviorSubject([]);


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
    // console.log("hitting check logged in")
    this.http.get("/user/checksession").subscribe(
      (res)=>{
        // console.log(res)
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
    // console.log(this.current_user.getValue())
    

    this.http.post("/character/add", {
      user:this.current_user.getValue(),
      character:new_character,
    }).subscribe(
      (result)=>{
        // console.log(result)
        cb()
      }
     
    )
    

  }
  getallcharacters(cb ){
    this.http.post("/character/searchbyuser", {
      user:this.current_user,


    }).subscribe(
      (res)=>{
        // console.log(res)
        this.current_characters.next(res)
        cb(res)


      }
    )
  }
  viewcharacter(id){
    // console.log(id)
    
    this.http.post("/character/view",{id:id}).subscribe(
      (res)=>{
        if(!res[0]){
          alert("character id not found")

        }else{
          this.current_character.next(res[0])
          this.char_roll_log.next([])
          this.router.navigate(["/viewcharacter"])
        }


      }
    )
  }
  set_char_del_target(id){
    this.char_del_target.next(id);
  }
  set_roll_del_target(index){
    this.roll_del_target.next(index);
  }


  deletecharacter(id){
    // console.log(id)
    this.http.post("/character/delete", {id:id}).subscribe(
      (res)=>{
        // console.log(res)
        this.getallcharacters(
          (res)=>{
            // console.log("in delete call back", res)

          }
        )
      }
    )
  }

  addroll(newroll, cb){
    let bob=this.current_character.getValue()
    bob["rolls"].push(newroll)
    // console.log(bob)
    
    this.current_character.next(bob)
    this.http.post("/character/update", bob).subscribe(
      (res)=>{
        // console.log(res)
        cb()
      }
    )

  }
  add_to_roll_log(result, cb){
    let log=this.char_roll_log.getValue()
    log.unshift(result)
    if (log.length>10){
      log.pop()
    }
    this.char_roll_log.next(log);
    cb()
  }
  delete_roll(roll, cb){
    // console.log(roll)
    let char=this.current_character.getValue()
    let advance=0;
    
    for(let i=0; i+advance<char["rolls"].length;i++){
      if (char["rolls"][i]==roll){
        advance++;

      }
      char["rolls"][i]=char["rolls"][i+advance];

    }
    for(let i=0;i<advance;i++){
      char["rolls"].pop()
    }
    // console.log(char)
    this.http.post("/character/update", char).subscribe(
      (res)=>{
        // console.log(res)
        this.current_characters.next(res)
        cb()
      }
    )

    cb()
  }
  show_roll_edit(roll){
    this.edit_roll_target.next(roll)

  }
  cancel_roll_edit(){
    this.edit_roll_target.next({})
  }
  submit_roll_edit(){
    // console.log("in submit roll edit")
    // console.log(this.edit_roll_target.getValue())
    let bob=this.current_character.getValue()
    // console.log(bob)

    this.http.post("/character/update", bob).subscribe(
      (res)=>{
        // console.log(res)
        this.getallcharacters(
          (res)=>{
            this.edit_roll_target.next({})
          }
        )
        
      }
    )
   
    
  }
  find_roll_index(roll){
    let bob=this.current_character.getValue()
    for(let i=0;i<bob["rolls"].length;i++){
      if (roll==bob["rolls"][i]){
        return i;
      }
    }
  }
  
  move_roll_up(roll){
    let bob=this.current_character.getValue()
    // console.log(bob)
    let temp
    let tar= this.find_roll_index(roll)
    if (tar!=0){
      temp=bob["rolls"][tar];
      bob["rolls"][tar]=bob["rolls"][tar-1];
      bob["rolls"][tar-1]=temp;
      this.http.post("/character/update", bob).subscribe(
        (res)=>{
          // console.log(res)
          this.current_character.next(bob)
          
        }
      )
    }


    
  }
  move_roll_down(roll){
    let bob=this.current_character.getValue()
    // console.log(bob)
    let temp
    let tar= this.find_roll_index(roll)
    if (tar!=bob["rolls"].length-1){
      temp=bob["rolls"][tar];
      bob["rolls"][tar]=bob["rolls"][tar+1];
      bob["rolls"][tar+1]=temp;
      this.http.post("/character/update", bob).subscribe(
        (res)=>{
          // console.log(res)
          this.current_character.next(bob)
          
        }
      )
    }


    
    
  }
  toggle_edit_character(){
    if (!this.editing_cur_character.getValue()){
      this.editing_cur_character.next(true)
    }else{
      this.editing_cur_character.next(false)
    }
    // console.log(this.editing_cur_character.getValue())

  }
  submit_edit_character(){
    let bob=this.current_character.getValue()
 
    this.http.post("/character/update", bob).subscribe(
      (res)=>{
       
        this.getallcharacters(
          (res)=>{
            this.edit_roll_target.next({})
            this.editing_cur_character.next(false)
          }
        )
        
      }
    )
  }
  clearlog(){
    this.char_roll_log.next([]);
    
  }

  



   

}
