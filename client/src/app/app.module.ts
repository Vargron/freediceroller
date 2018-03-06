import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'


import { AppComponent } from './app.component';
import { NonLoggedinComponent } from './non-loggedin/non-loggedin.component';
import {RollService} from './roll.service';
import {RoutingService} from './routing.service';
import { LoginComponent } from './login/login.component';
import { UserhomeComponent } from './userhome/userhome.component';
import { UsermanagerComponent } from './usermanager/usermanager.component'
import { UserService} from './user.service'
import { CharacterService} from './character.service';
import { ProductService } from './product.service'
import { ViewcharacterComponent } from './viewcharacter/viewcharacter.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ProductsComponent } from './products/products.component';
import { ProductsManagerComponent } from './products-manager/products-manager.component';

@NgModule({
  declarations: [
    AppComponent,
    NonLoggedinComponent,
    LoginComponent,
    UserhomeComponent,
    UsermanagerComponent,
    ViewcharacterComponent,
    AboutusComponent,
    ProductsComponent,
    ProductsManagerComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [RollService, RoutingService, UserService, CharacterService, ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
