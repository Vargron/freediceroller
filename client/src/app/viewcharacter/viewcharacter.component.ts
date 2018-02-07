import { Component, OnInit } from '@angular/core';
import { CharacterService} from '.././character.service';
import { RollService } from '.././roll.service';

@Component({
  selector: 'app-viewcharacter',
  templateUrl: './viewcharacter.component.html',
  styleUrls: ['./viewcharacter.component.css']
})
export class ViewcharacterComponent implements OnInit {
  current_character;
  new_roll;


  constructor(private cservice:CharacterService, private rservice:RollService) { }

  ngOnInit() {
    this.cservice.current_character.subscribe(
      (res)=>{
        this.current_character=res;
      }
    )
    this.new_roll={
      name:"",
      rollstring:"",

    }
    
  }
  addroll(){
    console.log(this.new_roll)
    this.rservice.validatestring(this.new_roll.rollstring, 
    (test)=>{
      if(!test){
        alert("invalid rollstring")

      }else{
        this.cservice.addroll(this.new_roll){
          
          this.new_roll={
            name:"",
            rollstring:"",
      
          }
        }
      


      }

    })


    

  }

}
