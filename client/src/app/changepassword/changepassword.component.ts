import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  editunlocked;
  vuser;
  failedaccountedit;
  current_user;
  password_box;
  account_edit_errors;


  constructor(private uservice:UserService) { 
    this.vuser={
      username:"",
      password:"",
    }
    this.password_box={
      password:"",
      password_conf:"",
    }
  } 

  ngOnInit() {
    this.uservice.accounteditunlocked.subscribe(
      (res)=>{
        this.editunlocked=(res);
      }

    )
    this.uservice.failedaccountedit.subscribe(
      (res)=>{
        this.failedaccountedit=res
      }
    )
    this.uservice.current_user.subscribe(
      (res)=>{
        this.current_user=res;
      }

    )
    this.uservice.account_edit_errors.subscribe(
      (res)=>{
        this.account_edit_errors=res
      }
    )

  }
  verify_user(){
    this.uservice.verify_user(this.vuser, 
    (res)=>{
      // console.log(res)

    })
  }
  close_failed_edit(){
    this.uservice.failedaccountedit.next(false)
  }
  execute_edit(){
    this.uservice.execute_account_edit(this.current_user, this.password_box, (res)=>{
      // console.log(res)
    })

  }
}
