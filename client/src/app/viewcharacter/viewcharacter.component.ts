import { Component, OnInit } from '@angular/core';
import { CharacterService} from '.././character.service';
import { RollService } from '.././roll.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewcharacter',
  templateUrl: './viewcharacter.component.html',
  styleUrls: ['./viewcharacter.component.css']
})
export class ViewcharacterComponent implements OnInit {
  current_character;
  new_roll;
  char_roll_log;
  edit_roll_target;
  editing_cur_character;
  char_del_target;
  roll_del_target;
  char_roll_errors;//this is for form validation is added and removed as needed to update html dynamicaly


  constructor(private cservice:CharacterService, private rservice:RollService, private router:Router) { }

  ngOnInit() {
    this.cservice.current_character.subscribe(
      (res)=>{
        this.current_character=res;
      }
    )
    this.new_roll={
      name:"",
      rollstring:"",

    }
    this.cservice.char_roll_log.subscribe(
      (res)=>{
        this.char_roll_log=res
      }
    )
    this.cservice.edit_roll_target.subscribe(
      (res)=>{
        this.edit_roll_target=res;
      }
    )
    this.cservice.editing_cur_character.subscribe(
      (res)=>{
        this.editing_cur_character=res;
      }
    )
    this.cservice.roll_del_target.subscribe(
      (res)=>{
        this.roll_del_target=res;
      }
    )
    this.cservice.char_roll_errors.subscribe(
      (res)=>{
        this.char_roll_errors=res;
      }
    )
    
  }
  addroll(){
    // console.log(this.new_roll)
    this.rservice.validatestring(this.new_roll.rollstring, 
    (test)=>{
      let errors=[]
      if(this.new_roll.name.length<3){
        errors.push("name must be at least 3 chars")
      }
      if(!test){
        errors.push("invalid rollstring")

      }
      this.cservice.char_roll_errors.next(errors)
    
      if (errors.length==0){


        this.cservice.addroll(this.new_roll, 
          ()=>{
          this.new_roll={
            name:"",
            rollstring:"",
          }
        }
      )
      }
    })
  }
  execute_roll(roll){
    // console.log(roll)
    this.rservice.rollcharstring(roll, (result)=>{
      this.cservice.add_to_roll_log(result,
      ()=>{

      })

    })

  }

  delete_roll(roll){
    this.cservice.delete_roll(roll, ()=>{

    })
  }
  show_roll_edit(roll){
    // console.log(roll)
    this.cservice.show_roll_edit(roll)
    
  }
  cancel_roll_edit(){
    this.cservice.cancel_roll_edit();
  }
  submit_roll_edit(){
    this.cservice.submit_roll_edit();
  }

  move_roll_up(roll){
    this.cservice.move_roll_up(roll);
  }
  move_roll_down(roll){
    this.cservice.move_roll_down(roll);
  }
  toggle_edit_character(){
    this.cservice.toggle_edit_character()
  }
  submit_edit_character(){
    
    this.cservice.submit_edit_character()
  }
  clear_log(){
    this.cservice.clearlog()
  }

  set_roll_del_target(id){
    this.cservice.set_roll_del_target(id);
  }
  back_to_home(){
    this.router.navigate(["/home"])
  }
  reset_errors(){
    this.cservice.char_roll_errors.next([])
  }




}
