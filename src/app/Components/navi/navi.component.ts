import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit{
  /**
   *
   */
  constructor(private roterService:Router,private toastService:ToastrService) { }
  ngOnInit(): void {
    
  }
  
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
  

}
