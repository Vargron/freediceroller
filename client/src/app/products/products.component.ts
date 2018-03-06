import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  cur_products;
  searchbox;

  constructor(private pservice:ProductService) { 
    this.searchbox={
      text:"",
    }
    
  }

  ngOnInit() {

    this.pservice.cur_products.subscribe(
      (res)=>{
        this.cur_products=res;
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
