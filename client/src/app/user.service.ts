import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'Rxjs/behaviorsubject';

@Injectable()
export class UserService {
  registererrors:BehaviorSubject<any[]>= new BehaviorSubject([]);

  constructor(private http:HttpClient, private router:Router,) {

   }
   login(user,cb){
     console.log("inservice", user)
     cb()
   }
   register(user,cb){
    function valid_email(emailstring){
      let dot=0;
      let at=0;
      let order=0;
      for(let i=1;i<emailstring.length-1;i++){
        if(emailstring[i]=="@"){
          at++;
        }else if(emailstring[i]=="."){
          if (at==1){
            order++;
          }
          dot ++;
        }
      }
      if (dot>0 && at==1 && order>0 ){
        return true;
      }else{
        return false;
      }
    }
    console.log("inservice", user)
    let errors=[];
    let tests =[
      [user.password==user.passwordcon, "passwords must match"],
      [user.password.length >7, "password must be at least 8 characters"],
      [user.username.length > 2,"username must be at least 3 characters"],
      [valid_email(user.email), "email must be a properly formatted email"],
    ]
    console.log(tests)
    for (let i=0;i<tests.length;i++){
      
      if (!tests[i][0]){
        errors.push(tests[i][1])
      }

    }
    console.log(errors)
    if(errors.length>0){
      this.registererrors.next(errors);
      


    }else{
      console.log("going to back end")
      this.http.post("../user/create", user).subscribe(
        (res)=>{
          console.log(res)

        }
      )



    }
      
    
    
    
    cb()
  }

}
