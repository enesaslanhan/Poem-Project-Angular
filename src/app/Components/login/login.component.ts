import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  login=true;
  sign=false;
  
  ngOnInit(): void {
    
  }
  signup(){
    this.sign=true;
    this.login=false;
  }

}
