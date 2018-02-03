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
  }

  login(){
    console.log("in login ")
    var user=this.loginUser
    this.loginUser={
      username:"",
      password:"",
    }
    this.uservice.login(user, ()=>{

    })
    
  }
  register(){
    
    console.log("in register")
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

}
