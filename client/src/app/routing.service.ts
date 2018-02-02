import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class RoutingService {

  constructor(private http:HttpClient, private router:Router,) { }

  gotologin(){
    console.log("going to login page")
    this.router.navigate(["/login"])

  }

}
