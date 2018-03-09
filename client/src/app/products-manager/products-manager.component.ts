import { Component, OnInit } from '@angular/core';
import { ProductService } from './../product.service';



@Component({
  selector: 'app-products-manager',
  templateUrl: './products-manager.component.html',
  styleUrls: ['./products-manager.component.css']
})
export class ProductsManagerComponent implements OnInit {
  new_product;
  all_products:Array<any>;
  delete_target;
  edit_product;


  constructor(private pservice:ProductService) { 
    this.new_product={
      name:"",
      display:"",
      desc:"",
      link:"",
      img_link:"",
      



    }
  }

  ngOnInit() {
    
  
        this.pservice.all_products.subscribe(
          (res)=>{
            this.all_products=res;


          }
        )
        this.pservice.delete_target.subscribe(
          (res)=>{
            this.delete_target=res;
          }
        )
        this.pservice.edit_product.subscribe(
          (res)=>{
            this.edit_product=res;
          }
        )



  }
  addproduct(){
    // console.log("hitting add product")
    // console.log(this.new_product)
    this.pservice.add_product(this.new_product, 
      (res)=>{
        // console.log(res)
      this.pservice.update_all_products(
        (res2)=>{
          // console.log(res2)
        }
      )


      this.new_product={
        name:"",
        display:"",
        desc:"",
        link:"",
        img_link:"",
      }
    })

  }
  update_all_products(){
    this.pservice.update_all_products(
      (res)=>{
        // console.log(res)
      }
    )

  }
  edit(id){
    // console.log(id)
    let all=this.all_products
    this.pservice.edit_product.next({});
    for(let i=0; i<all.length;i++){
      if (all[i]._id==id){
        this.pservice.edit_product.next(all[i]);
      }

    }
  }
  show_delete(id){
    // console.log(id)
    this.pservice.show_delete(id)
    // console.log(typeof(id), id)
    // console.log(this.delete_target==id)
  }
  hide_delete(){
    this.pservice.show_delete("")
  }
  delete(id){
    // console.log(id)
    this.pservice.delete(id)
  }
  execute_edit_product(id){
    this.pservice.execute_edit_product(this.edit_product)
  }
  
}
