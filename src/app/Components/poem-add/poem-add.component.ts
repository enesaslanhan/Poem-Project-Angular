import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable, map } from 'rxjs';
import { Poem } from 'src/app/Models/poem';
import { User } from 'src/app/Models/user';
import { PoemGetScoreService } from 'src/app/Services/poem-get-score.service';
import { PoemScoreService } from 'src/app/Services/poem-score.service';
import { PoemService } from 'src/app/Services/poem.service';
import { PunishmentService } from 'src/app/Services/punishment.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-poem-add',
  templateUrl: './poem-add.component.html',
  styleUrls: ['./poem-add.component.css']
})
export class PoemAddComponent implements OnInit{
  
  poemAddForm:FormGroup;
  poemUserId:number
  setUserName:string
  setPoemNumber:number=0
  setUserScore:number=0
  constructor(private poemService:PoemService,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,
    private userservice:UserService,
    private poemGetScoreService:PoemGetScoreService,
    private punishmentService:PunishmentService) {  }
  ngOnInit() {
    this.createPoemForm();
    this.UserIdFind(sessionStorage.getItem("email"));
    this.SetUser();
    this.SetPoemNumber()        
  }

  NowDate:Date
  createPoemForm(){
    this.poemAddForm=this.formBuilder.group({
      poemName:["",Validators.required],
      poemText:["",Validators.required]
    });

  }
  PunishmentGet(){
    this.userservice.getByEmail(sessionStorage.getItem("email")).subscribe(response=>{
      this.punishmentService.getById(4002).subscribe(response=>{
        const punishmentEndDay = new Date(response.data.punishmentEndDay);
        if (punishmentEndDay>new Date()) {
          this.toastrService.error("Cezanız sürdüğü için şiir yükleyemezsiniz")
          this.toastrService.info(`Kalan ceza gününüz : ${punishmentEndDay.getDay()-new Date().getDay()}`)
        }
        else{
          this.Add()
        }
      })
    })
    return true;
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
    else{
      this.toastrService.error("Cezanın devam etmektedir")
    }
  }
  
  UserIdFind(email:string){
    this.userservice.getByEmail(email).subscribe(response=>{
      
      this.poemUserId=response.data.id;
    })
    
  }
  SetUser(){
    this.userservice.getByEmail(sessionStorage.getItem("email")).subscribe(response=>{
      this.setUserName=response.data.fakeName;
      this.poemService.getAll().subscribe(responsePeom=>{
        responsePeom.data.forEach(element=>{
          if (element.userId==response.data.id) {
            this.setPoemNumber++;
            this.poemGetScoreService.getAll().subscribe(responsePoemGetScore=>{
              responsePoemGetScore.data.forEach(element2=>{
                if (element2.poemId==element.id) {
                  this.setUserScore+=element2.score;
                }
              })
            })
          }
        })
        this.setUserScore=this.setUserScore/this.setPoemNumber;
      })
    })
  }
  SetUserFakName(): Observable<User> {
    return this.userservice.getByEmail(sessionStorage.getItem("email"))
      .pipe(
        map(response => response.data) // İlgili veriyi alın
      );
  }
  SetUserScore(){
    this.poemGetScoreService.getAll().subscribe(response=>{
      response.data.forEach(element=>{
        if (element) {
          
        }
      })
    })
  }
  SetPoemNumber(){
    this.poemService.getAll().subscribe(response=>{
      let user;
      this.SetUserFakName().subscribe(response=>{
        user=response.id
      });
      console.log(user);
      response.data.forEach(element=>{
       
      })
    })
  }
  

}
