import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Poem } from 'src/app/Models/poem';
import { PoemService } from 'src/app/Services/poem.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-poem-add',
  templateUrl: './poem-add.component.html',
  styleUrls: ['./poem-add.component.css']
})
export class PoemAddComponent implements OnInit{
  
  poemAddForm:FormGroup;
  poemUserId:number
  deneme:string=''
  constructor(private poemService:PoemService,private toastrService:ToastrService,private formBuilder:FormBuilder,private userservice:UserService) {  }
  ngOnInit() {
    this.createPoemForm();
    this.UserIdFind(sessionStorage.getItem("email"));
  }

  createPoemForm(){
    this.poemAddForm=this.formBuilder.group({
      poemName:["",Validators.required],
      poemText:["",Validators.required]
    });

  }

  Add(){   
    if (this.poemAddForm.valid) {
      
      let poemModel=Object.assign({},this.poemAddForm.value)
      let poem:Poem={
        poemName:poemModel.poemName,
        poemText:poemModel.poemText,
        userId:this.poemUserId,
        id:0
      }
      console.log(poem)   
      
      this.poemService.add(poem).subscribe(response=>{
        this.toastrService.success("Şiiriniz Siteye Eklenmiştir Sayın Yazar","başarılı")
      },errorResponse=>{
        this.toastrService.error("Şiiriniz siteye eklenemedi","başarısız")
      })
    }
  }
  
  UserIdFind(email:string){
    this.userservice.getByEmail(email).subscribe(response=>{
      
      this.poemUserId=response.data.id;
    })
    
  }



}