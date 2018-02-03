import { Component, OnInit } from '@angular/core';
import { UserService } from './../user.service';


@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit {
  current_user;

  constructor(private uservice:UserService) { 

  }

  ngOnInit() {
    this.uservice.current_user.subscribe(
      (res)=>{
        this.current_user=res;
      }
      

    )

  }
  logout(){
    this.uservice.logout()

  }

}
