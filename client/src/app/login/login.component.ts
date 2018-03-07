import { Component, OnInit } from '@angular/core';
import  { UserService } from './../user.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUser;
  registerUser;
  registererrors;
  reg_success;
  login_errors;

  
  constructor(private uservice:UserService) { 
    this.loginUser={
      username:"",
      password:"",
    }
    this.registerUser={
      username:"bob",
      email:"bob@bob.com",
      password:"password",
      passwordcon:"password",

    }
    

  }

  ngOnInit() {
    this.uservice.registererrors.subscribe(
      (res)=>{
        this.registererrors=res;
      }
    )
    this.uservice.reg_success.subscribe(
      (res)=>{
        this.reg_success=res;
      }

    )
    this.uservice.login_errors.subscribe(
      (res)=>{
        this.login_errors=res;
      }
    )
  }

  login(){
    // console.log("in login ")
    var user=this.loginUser
    this.loginUser={
      username:"",
      password:"",
    }
    this.uservice.login(user, ()=>{
      this.uservice.registererrors.next([])
      this.uservice.reg_success.next(false)

    })
    
  }
  register(){
    
    // console.log("in register")
    var user=this.registerUser;
    this.registerUser={
      username:"",
      email:"",
      password:"",
      passwordcon:"",
    }
    this.uservice.register(user, ()=>{
      this.uservice.update_all_users()

    })
    
  }
  clear_reg_errors(){
    this.uservice.registererrors.next([]);
  }
  clear_reg_success(){
    this.uservice.reg_success.next(false);
  }
  clear_login_errors(){
    this.uservice.login_errors.next([])
  }
}
