import { Component , OnInit } from '@angular/core';
import { UserService }  from './user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'freediceroller.com';

  constructor(private uservice:UserService){

  }

  checksession(){
    this.uservice.checkloggedin()

  }
  ngOnInit() {
    this.uservice.checkloggedin()
    this.uservice.update_all_users()
  }
  logout(){
    this.uservice.logout()
  }
  updateusers(){
    this.uservice.update_all_users()
  }
  
  



}
