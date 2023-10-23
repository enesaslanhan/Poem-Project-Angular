import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,FormControl,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  constructor(private userService:UserService,private formBuilder:FormBuilder,private toastrService:ToastrService){
    
  }
  login=true;
  sign=false;
  userLoginForm:FormGroup;
  userAddForm:FormGroup;
  createUserAddForm(){
    this.userAddForm=this.formBuilder.group({
      email:["",Validators.required],
      fakeName:["",Validators.required],
      password:["",Validators.required],
    });
  }
  controlLoginForm(){
    this.userLoginForm=this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required]
    });
  }
  ngOnInit(){
    this.createUserAddForm();
    this.controlLoginForm();
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
        this.toastrService.success(response.message)
        this.loginUp()
        this.userAddForm.reset()
      },errorResponse=>{
        this.toastrService.error(errorResponse.error);
      })
    }
  }
  loginControl(){
    if (this.userLoginForm.valid) {
      let userModel=Object.assign({},this.userLoginForm.value)
      this.userService.getByEmail(userModel.email).subscribe(response=>{
        if (response.data.password==userModel.password) {
          this.toastrService.success("Giriş Başarılı")
          sessionStorage.setItem("email",response.data.email);
          sessionStorage.setItem("password",response.data.password);
        }
        else{
          this.toastrService.error("Parola Hatası")
        }
      },errorResponse=>{
        this.toastrService.error("Kullanıcı bulunamadı");
      })
    }
  }
  


}
