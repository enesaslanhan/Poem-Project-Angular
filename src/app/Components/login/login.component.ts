import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,FormControl,Validators } from '@angular/forms';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  constructor(private userService:UserService,private formBuilder:FormBuilder){}
  login=true;
  sign=false;
  userAddForm:FormGroup;
  createUserAddForm(){
    this.userAddForm=this.formBuilder.group({
      email:["",Validators.required],
      fakeName:["",Validators.required],
      password:["",Validators.required],
    });
  }
  ngOnInit(){
    this.createUserAddForm();
  }
  signup(){
    this.sign=true;
    this.login=false;
  }
  loginUp(){
    this.sign=false;
    this.login=true;
  }
  Add(){
    if (this.userAddForm.valid) {
      let userModel=Object.assign({},this.userAddForm.value)
      this.userService.add(userModel).subscribe(response=>{
        this.loginUp()
        alert("Kayıt olundu");
      })
    }
  }



}
