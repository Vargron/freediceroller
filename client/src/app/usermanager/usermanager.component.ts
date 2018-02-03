import { Component, OnInit } from '@angular/core';
import { UserService } from './../user.service';


@Component({
  selector: 'app-usermanager',
  templateUrl: './usermanager.component.html',
  styleUrls: ['./usermanager.component.css']
})
export class UsermanagerComponent implements OnInit {
  all_users;

  constructor(private uservice:UserService,) { }

  ngOnInit() {
    this.uservice.update_all_users()
    this.uservice.all_users.subscribe(
      (res)=>{
        this.all_users=res;

      }
    )
  }
  

}
