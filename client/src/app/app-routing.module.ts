import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NonLoggedinComponent } from './non-loggedin/non-loggedin.component';
import { LoginComponent } from './login/login.component';
import { UserhomeComponent } from './userhome/userhome.component';
import { UsermanagerComponent} from './usermanager/usermanager.component';
import { ViewcharacterComponent} from './viewcharacter/viewcharacter.component'


const routes: Routes = [
  { path: '', pathMatch: 'full',  component: NonLoggedinComponent },
  { path: 'login', pathMatch: 'full',  component: LoginComponent },
  { path: 'home', pathMatch: 'full',  component: UserhomeComponent },
  { path: 'usermanager', pathMatch: 'full',  component: UsermanagerComponent },
  { path: 'viewcharacter', pathMatch: 'full',  component: ViewcharacterComponent },

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
