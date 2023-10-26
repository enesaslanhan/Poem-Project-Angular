import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { PoemAddComponent } from './Components/poem-add/poem-add.component';
import { AuthGuard } from './guards/auth-guard';
import { PoemsComponent } from './Components/poems/poems.component';

const routes: Routes = [

  {path:'login', component:LoginComponent},
  {path:'poem-add',canActivate:[AuthGuard],component:PoemAddComponent},
  {path:'poems',component:PoemsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
