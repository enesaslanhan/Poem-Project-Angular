import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { PoemAddComponent } from './Components/poem-add/poem-add.component';
import { AuthGuard } from './guards/auth-guard';

const routes: Routes = [

  {path:'login', component:LoginComponent},
  {path:'poem-add',canActivate:[AuthGuard],component:PoemAddComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
