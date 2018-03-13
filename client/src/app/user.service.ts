import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class UserService {
  registererrors:BehaviorSubject<any[]>= new BehaviorSubject([]);
  current_user:BehaviorSubject<Object>= new BehaviorSubject({});
  all_users:BehaviorSubject<any>= new BehaviorSubject([]);
  show_edit:BehaviorSubject<any> = new BehaviorSubject(false);
  edit_target:BehaviorSubject<any>= new BehaviorSubject({});
  reg_success:BehaviorSubject<Boolean>=new BehaviorSubject(false);
  login_errors:BehaviorSubject<any>=new BehaviorSubject([]);
  delete_target:BehaviorSubject<any>=new BehaviorSubject("");
  accounteditunlocked:BehaviorSubject<Boolean>= new BehaviorSubject(false);
  failedaccountedit:BehaviorSubject<Boolean>=new BehaviorSubject(false);
  account_edit_errors:BehaviorSubject <Array<String> >= new BehaviorSubject([])

  constructor(private http:HttpClient, private router:Router,) {
  }


   login(user,cb){
     // this will go in to the back end and check to see if that user name exist and bcrypt the password.
    //  console.log("inservice", user)
     this.http.post("/user/login", user).subscribe(
       (result)=>{
        console.log(result)
        if(result["status"]=="sucess"){
          this.current_user.next(result["user"])
          this.router.navigate(["/home"])

        }else{
          this.login_errors.next(["you failed to login, error: "+result["error"]])
          
        }
       }

     )
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
    // console.log("inservice", user)
    let errors=[];
    let tests =[
      [user.password==user.passwordcon, "passwords must match"],
      [user.password.length >7, "password must be at least 8 characters"],
      [user.username.length > 2,"username must be at least 3 characters"],
      [valid_email(user.email), "email must be a properly formatted email"],
    ]
    // console.log(tests)
    for (let i=0;i<tests.length;i++){
      
      if (!tests[i][0]){
        errors.push(tests[i][1])
      }
    }
    console.log(errors)
    if(errors.length>0){
      this.registererrors.next(errors);
    }else{
      // console.log("going to back end")
      this.http.post("../user/create", user).subscribe(
        (res)=>{
          console.log(res)
          if(res["status"]!="sucess"){
            this.registererrors.next([res["status"]])
            // console.log(res["status"])
          }
          else{
            this.reg_success.next(true);
          }
        }
      )
    }
    cb()
  }
  checkloggedin(cb){
    // console.log("hitting check logged in")
    this.http.get("/user/checksession").subscribe(
      (res)=>{
        // console.log(res)
        if(res["user"]){
          this.current_user.next(res["user"])
        }else{
          this.current_user.next({})
        }
        cb()

      }
    )

  }
  logout(){
    this.current_user.next({})
    // console.log(this.current_user.getValue())
    this.http.get("user/logout").subscribe(
      (res)=>{
        // console.log(res)
        this.router.navigate(["/"])

      }

      )
    }

  update_all_users(){
    this.http.get("/user/all").subscribe(
      (res)=>{
        // console.log(res)
        this.all_users.next(res)

      }
    )

  }
  show_edit_form(id, cb){
    this.http.get("/verifyadmin").subscribe(
      (result)=>{
        // console.log("in get callback")
        // console.log(result)
        if(result["admin"]==false){
          this.router.navigate(["/"])
        }
      }
    )
    this.show_edit.next(true)
    this.edit_target.next({})
    let users=this.all_users.getValue();
    let temp={}
    // console.log(this.all_users)
    for (let i=0;i<users.length; i++){
      if(users[i]._id==id){
        
        temp= Object.assign({}, users[i]);
        temp["password"]="";
       
        
        this.edit_target.next(temp)
      }
    }


    
    
  }
  execute_edit(){
    // console.log("cur config",this.edit_target.getValue())
    let new_user=this.edit_target.getValue();
    this.http.get("/verifyadmin").subscribe(
      (status)=>{
        console.log(status)
        if (status["admin"]){
          this.http.post("/user/edit", new_user).subscribe(
            (res)=>{
              // console.log(res)
              // console.log(res)
              if(res["status"]=="success"){
                this.update_all_users();
                this.edit_target.next({})
                this.show_edit.next(false)
      
              }
            }
          )

        }


      }
    )

  }
  verify_admin(cb){
    // operates call back on a bool for admin
    
    this.http.get("/verifyadmin").subscribe(
      (status)=>{
        cb(status["admin"])
      
    }
    )
  }


  show_delete(id){
    this.delete_target.next(id);
  }
  delete_user(id){
    // console.log(id)
    this.http.get("/verifyadmin").subscribe(
      (status)=>{
        // console.log(status)
        if (status["admin"]==true){
          this.http.post("/user/delete", {id:id}).subscribe(
            (res)=>{
            // console.log(res)
            this.update_all_users()
            }
          )
        }else{
          // console.log("delete did not fire")
        }
      }
    )
  }
  verify_user(user,cb){
    user["_id"]=this.current_user.getValue()["_id"]
    console.log(user)
    console.log(this.current_user.getValue())
    this.http.post("/user/verifypassword/", user).subscribe(
      (res)=>{
        if (res["verified"]){
          this.accounteditunlocked.next(true);
        }
        else{
          this.failedaccountedit.next(true);
        }
        // console.log(res)
        cb(res)

      }
    )

  }
  execute_account_edit(current_user,pword_box,cb){
    let errors=[]
    if(pword_box.password!=pword_box.password_conf){
      errors.push("passwords do not match")
    }
    if(pword_box.password.length<8){
      errors.push("password not long enough must contain 8 characters")
    }
    if (errors.length>0){
      this.account_edit_errors.next(errors)
    }else{
      this.account_edit_errors.next(errors)
      this.http.post('/user/changepassword/',{user:current_user, password:pword_box.password}).subscribe(
        (res)=>{
          // console.log(res)
          if(res["status"]){
            this.current_user.next(res["result"])
            this.failedaccountedit.next(false)
            this.accounteditunlocked.next(false)
            this.router.navigate(["/home"])
          }
        }
      )
      //more stuff
    }
    
  }
  set_reg_success(state){
    console.log(state)
    this.reg_success.next(state)
  }

}

