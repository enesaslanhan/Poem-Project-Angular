import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable, elementAt, forkJoin, map, switchMap } from 'rxjs';
import { Poem } from 'src/app/Models/poem';
import { PoemDataModel } from 'src/app/Models/poemDataModel';
import { PoemScore } from 'src/app/Models/poemScore';
import { PoemUserScoreModel } from 'src/app/Models/poemUserScoreModel';
import { PoemScoreService } from 'src/app/Services/poem-score.service';
import { PoemService } from 'src/app/Services/poem.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-poems',
  templateUrl: './poems.component.html',
  styleUrls: ['./poems.component.css']
})
export class PoemsComponent implements OnInit {
  poems:Poem[]=[]
  poemData:PoemDataModel[]=[]
  poemUserScores:PoemUserScoreModel[]=[]
  totalScore:0
  totalUser:0
  poemUserScoreModel:PoemUserScoreModel;
  scoreForm:FormGroup;
  CreateScoreForm(){
    this.scoreForm=this.formBuilder.group({
      score:["",Validators.required]
    })
  }
  poemDataModel:PoemDataModel={
    poem:null,
    fakeName:"",
    puan:7
  }
  poemDetail:Poem={
    poemName:"",
    poemText:"",
    userId:0,
    id:0
  };
  
  
  poemScoreModel:PoemScore={
    id:0,
    poemId:0,
    score:0,
    userId:0
  }
  
  detail:boolean=false
  constructor(private poemService:PoemService,private userService:UserService,
    private poemScoreService:PoemScoreService,private formBuilder:FormBuilder,
    private toastrService:ToastrService) { }
  ngOnInit(): void {
    this.GetAll();
    this.CreateScoreForm();
  }
  // ...

GetAll() {
  this.poemService.getAll().pipe(
    switchMap(poemResponse => {
      const observables = poemResponse.data.map(element => {
        return this.UserGetById(element.userId).pipe(
          switchMap(fakeName => {
            return this.PoemScoreGetByPoemId(element.id).pipe(
              map(poemScore => ({
                fakeName: fakeName,
                poem: element,
                poemScore: poemScore
              }))
            );
          })
        );
      });

      return forkJoin(observables);
    })
  ).subscribe(
    (poemUserScores: { fakeName: string; poem: Poem; poemScore: number }[]) => {
      // poemUserScores, tüm verilerin birleştirilmiş sonucu
      this.poemUserScores = poemUserScores;
    }
  );
}

// ...

  UserGetById(userId: number): Observable<string> {
    return this.userService.getById(userId).pipe(
      map(response => response.data.fakeName)
    );
  }
  PoemScoreGetByPoemId(poemId: number): Observable<number> {
    return this.poemScoreService.getAll().pipe(
      map(response => {
        let totalScore = 0;
        let totalUser = 0;
        response.data.forEach(element => {
          if (element.poemId == poemId) {
            totalScore += element.score;
            totalUser++;
          }
        });
        return totalScore / totalUser;
      })
    );
  }
  PoemDetail(poem:Poem){
    this.poemDetail.poemName=poem.poemName
    this.poemDetail.poemText=poem.poemText
    this.poemDetail.id=poem.id
    this.detail=true;
  }
  TurnBack(){
    this.detail=false
    location.reload()
  }

  //PoemScore İşlemleri
  
  SetPoemScore(poem:Poem){
    console.log(poem)  
    this.userService.getByEmail(sessionStorage.getItem("email")).subscribe(response=>{
      this.poemScoreModel.userId=response.data.id;
      if (this.scoreForm.valid) {
      this.poemScoreModel.score=this.scoreForm.value.score
      this.poemScoreModel.poemId=poem.id
      this.addPoemScore(this.poemScoreModel);
      }
    })    
  }
  addPoemScore(poemScore:PoemScore){
    this.poemScoreService.add(poemScore).subscribe(response=>{
      this.toastrService.success("Puan verildi")
    },errorResponse=>{
      this.toastrService.error("Puan Verilemedi")
    })
  }

  

}
