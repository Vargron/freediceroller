import { Component , OnInit } from '@angular/core';
import { Router }  from '@angular/router';
import { UserService }  from './user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
 
  current_user;

  constructor(private uservice:UserService, private router:Router){

  }

  checksession(){
    this.uservice.checkloggedin(()=>{

    })

  }
  ngOnInit() {
    this.uservice.checkloggedin(
      ()=>{

      }
    )
    this.uservice.update_all_users()
    this.uservice.current_user.subscribe(
      (res)=>{
        this.current_user=res;

      }
    )
    this.uservice.checkloggedin(
      ()=>{
        if(this.uservice.current_user.getValue()["username"]){
          // console.log("user in session")
          this.router.navigate(["/home"])
        }else{
          // console.log("no user in session")
          this.router.navigate(["/"])
        }

      }
    )
  }
  logout(){
    this.uservice.logout()
  }
  updateusers(){
    this.uservice.update_all_users()
  }
  sendtousermanager(){
    
    this.uservice.verify_admin(
    ()=>{
      }
    )
  } 
  sendtologin(){
    this.router.navigate([''])
  }
  show_about_us(){
    this.router.navigate(["/aboutus"])
  }
  



}
