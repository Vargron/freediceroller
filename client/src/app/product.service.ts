import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'Rxjs/behaviorsubject';

@Injectable()
export class ProductService {
  all_products:BehaviorSubject<any>=new BehaviorSubject([]);
  cur_products:BehaviorSubject<any>= new BehaviorSubject([]);
  delete_target:BehaviorSubject<String>=new BehaviorSubject("");
  edit_product:BehaviorSubject<Object>=new BehaviorSubject({});
  search_term:BehaviorSubject<String>= new BehaviorSubject("");

  constructor(private Http:HttpClient, private router:Router) { 
    

  }

  add_product(product,cb){
    console.log(product)
    this.Http.post('/product/add', product).subscribe(
      (res)=>{
        console.log(res)
        cb()
      }
    )
    

  }
  update_all_products(cb){
    this.Http.get('/product/all').subscribe(
      (res)=>{
        // console.log(res)
        this.all_products.next(res["result"])
        this.cur_products.next(res["result"])
        cb(res)
      }
    )
  }
  show_delete(id){
    this.delete_target.next(id)
    console.log(typeof(this.delete_target.getValue()), this.delete_target.getValue())
    
  }
  delete(id){
    this.Http.post("/product/delete", {_id:id}).subscribe(
      (res)=>{
        console.log(res)
        this.update_all_products(
          (res)=>{

          }
        )

      }
    )
  }
  execute_edit_product(product){
    this.Http.post("/product/edit", product).subscribe(
      (res)=>{
        // console.log(res)
        this.edit_product.next({})
        this.update_all_products((res)=>{

        })
      }
    )
    // console.log(product)
    
  }
  execute_search(sbox){
    function search_and_count(large,small){
      let cur_match_indicies=[];
      let cur_index=0;
      let next_matches=[];
      let count=0;
      while(cur_index<large.length){
      // console.log(cur_index, cur_match_indicies)
      next_matches=[]
    
      for(let i=0;i<cur_match_indicies.length;i++){
        if (cur_match_indicies[i]==small.length){
        count++
        }
        else if (large[cur_index]==small[cur_match_indicies[i]]){
        next_matches.push(cur_match_indicies[i]+1)
        }
      }
      cur_match_indicies=next_matches;
      if(large[cur_index]==small[0]){
        cur_match_indicies.push(1)
      }
      cur_index++;
      }
      return count
    
    
    }
    // console.log(sbox.text)

    let cur=[]
    let tarboxes=["name", "desc"]
    let source=this.all_products.getValue()
    // console.log(source)
    let curstring=""
    let curcount=0
    let catcharr=[]
    let max=0
    for(let i=0;i<source.length; i++){
      console.log(source[i])
      
      curstring=""+source[i]["name"]+source[i]["desc"];
      curcount=0
      // for(let j=0;j<tarboxes.length;j++){
      //   curstring+=source[i][j]
      // }
      console.log(curstring)
      curcount=search_and_count(curstring,sbox.text);
      // console.log(curcount)
      if (curcount>0){
        if (curcount>max){
          max=curcount;
        }
        if (!catcharr[curcount]){
          catcharr[curcount]=[source[i]]
        }else{
          catcharr[curcount].push(source[i])
        }
        
      }
      
      
      

    }
    // console.log(catcharr)
    // console.log(max)
    let finalsort=[]
    for(let i=max; i>0;i--){
      if(catcharr[i]){
        finalsort=finalsort.concat(catcharr[i]);
        // console.log(finalsort)
      }
    }
    console.log(sbox.text)
    this.search_term.next(sbox.text)
    this.cur_products.next(finalsort)
  }
  undo_search(){
    this.cur_products.next(this.all_products.getValue())
  }


  

}
