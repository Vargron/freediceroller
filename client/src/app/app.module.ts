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

@NgModule({
  declarations: [
    AppComponent,
    NonLoggedinComponent,
    LoginComponent,
    UserhomeComponent,
    UsermanagerComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [RollService, RoutingService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
