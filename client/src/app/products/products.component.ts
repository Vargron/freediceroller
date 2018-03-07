import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  cur_products;
  all_products;
  searchbox;
  search_term;

  constructor(private pservice:ProductService) { 
    this.searchbox={
      text:"",
    }
    
  }

  ngOnInit() {
    this.pservice.update_all_products(()=>{
      //this needs to execute on page build in order for images to work
    })

    this.pservice.cur_products.subscribe(
      (res)=>{
        this.cur_products=res;
      }
    )
    this.pservice.all_products.subscribe(
      (res)=>{
        this.all_products=res;
      }
    )
    this.pservice.search_term.subscribe(
      (res)=>{
        this.search_term=res
      }
    )

  }
  execute_search(){
    console.log(this.searchbox)
    this.pservice.execute_search(this.searchbox)
  }
  undo_search(){
    this.pservice.undo_search()
  }



}
