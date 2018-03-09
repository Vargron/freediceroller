import { Component , OnInit } from '@angular/core';
import { Router }  from '@angular/router';
import { UserService }  from './user.service';
import { ProductService } from './product.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
 
  current_user;
  all_products;

  constructor(private uservice:UserService, private router:Router, private pservice:ProductService){

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
    this.pservice.update_all_products(
      (res)=>{



      }
    )
    this.pservice.all_products.subscribe(
      (res)=>{
        this.all_products=res;

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
    (res)=>{
        if (res){
          this.router.navigate(["/usermanager"])
        }else{
          // console.log("redirecting")
          this.router.navigate(["/"])
        }
      }
    )
  } 
  sendtologin(){
    this.router.navigate([''])
  }
  show_about_us(){
    this.router.navigate(["/aboutus"])
  }
  show_products(){
        this.router.navigate(['/products'])
  }
  show_products_manager(){
    this.uservice.verify_admin(
      (res)=>{
        // console.log(res)
        if(res){
          this.router.navigate(['/productsmanager'])
        }
        else{
          this.router.navigate(['/'])
        }
        
      }
    )
  }
  change_password(){
    if (this.current_user){
      this.router.navigate(["/changepassword"])
    }else{
      this.router.navigate(["/"])
    }
  }
  



}
