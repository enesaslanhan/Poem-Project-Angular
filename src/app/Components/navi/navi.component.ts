import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit{
  /**
   *
   */
  constructor(private roterService:Router,private toastService:ToastrService,private userService:UserService ){ }
  ngOnInit(): void {
    this.UserControlName();
  }
  userControl="";
  logOutButton=false;
  deneme="poem-add"
  
  toggleOpen(){
    const toggleBtn=document.querySelector('.toggle_btn')
    const toggleBtnIcon=document.querySelector('.toggle_btn i')
    const dropDownMenu=document.querySelector('.dropdown_menu')
    dropDownMenu.classList.toggle('open')
    const isOpen=dropDownMenu.classList.contains('open')
    if (isOpen) {
      toggleBtnIcon.classList.add('fa-xmark');
      toggleBtnIcon.classList.remove('fa-bars');
    } else {
      toggleBtnIcon.classList.add('fa-bars');
      toggleBtnIcon.classList.remove('fa-xmark');
    }
  }
  UserControlName(){
    if (sessionStorage.getItem("email")!=null) {
      this.userService.getByEmail(sessionStorage.getItem("email")).subscribe(response=>{
        this.userControl=response.data.fakeName;
        this.logOutButton=true;
      })

    }
    else{
      this.userControl="Giriş";
      this.logOutButton=false;
    }
  }
  LogOut(){
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("password");
    this.UserControlName();  
  }
  /*
  LogIn(){
    if (this.logOutButton==true) {
      this.deneme="poem-add";
    }
    else{
      this.deneme="login"
    }
  }
  */

}
