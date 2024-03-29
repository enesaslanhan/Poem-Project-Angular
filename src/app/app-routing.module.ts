import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { PoemAddComponent } from './Components/poem-add/poem-add.component';
import { AuthGuard } from './guards/auth-guard';
import { PoemsComponent } from './Components/poems/poems.component';
import { BestPoemComponent } from './Components/best-poem/best-poem.component';
import { HomeComponent } from './Components/home/home.component';
import { PoemOperationsComponent } from './Admin/Components/poem-operations/poem-operations.component';
import { UserOperationComponent } from './Admin/Components/user-operation/user-operation.component';

const routes: Routes = [

  {path:'login', component:LoginComponent},
  {path:'poem-add',canActivate:[AuthGuard],component:PoemAddComponent},
  {path:'poems',component:PoemsComponent},
  {path:'best-poem',component:BestPoemComponent},
  {path:'home',component:HomeComponent},
  {path:'admin/poems-opertaions',component:PoemOperationsComponent},
  {path:'admin/user-opertaions',component:UserOperationComponent},
  {path:'',component:PoemsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
