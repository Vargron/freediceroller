import { Component, OnInit } from '@angular/core';
import { UserService } from './../user.service';


@Component({
  selector: 'app-usermanager',
  templateUrl: './usermanager.component.html',
  styleUrls: ['./usermanager.component.css']
})
export class UsermanagerComponent implements OnInit {
  all_users;
  show_edit;
  edit_target;
  delete_target;

  constructor(private uservice:UserService,) { 
    
  }

  ngOnInit() {
    this.uservice.update_all_users()
    this.uservice.all_users.subscribe(
      (res)=>{
        this.all_users=res;

      }
    )
    this.uservice.show_edit.subscribe(
      (res)=>{
        this.show_edit=res;
      }
    )
    this.uservice.edit_target.subscribe(
      (res)=>{
        this.edit_target=res;
      }
    )
    this.uservice.delete_target.subscribe(
      (res)=>{
        this.delete_target=res;
      }
    )
  }
  delete(id){
    // console.log(id)
    this.uservice.delete_user(id)
  }
  edit(id){

    console.log(id, "i edited")
    this.uservice.show_edit_form(id, ()=>{
      

    });

  }
  execute_edit(){
    this.uservice.execute_edit()
  }
  show_delete(id){
    this.uservice.show_delete(id)
  }
  

}
