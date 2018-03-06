import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NonLoggedinComponent } from './non-loggedin/non-loggedin.component';
import { LoginComponent } from './login/login.component';
import { UserhomeComponent } from './userhome/userhome.component';
import { UsermanagerComponent} from './usermanager/usermanager.component';
import { ViewcharacterComponent} from './viewcharacter/viewcharacter.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ProductsComponent } from './products/products.component';
import { ProductsManagerComponent } from './products-manager/products-manager.component';


const routes: Routes = [
  { path: '', pathMatch: 'full',  component: NonLoggedinComponent },
  { path: 'login', pathMatch: 'full',  component: LoginComponent },
  { path: 'home', pathMatch: 'full',  component: UserhomeComponent },
  { path: 'usermanager', pathMatch: 'full',  component: UsermanagerComponent },
  { path: 'viewcharacter', pathMatch: 'full',  component: ViewcharacterComponent },
  { path: 'aboutus', pathMatch: 'full',  component: AboutusComponent },
  { path: 'products', pathMatch: 'full',  component: ProductsComponent },
  { path: 'productsmanager', pathMatch: 'full',  component: ProductsManagerComponent  },


  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
