import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, elementAt, forkJoin, map, switchMap, timer } from 'rxjs';
import { PoemListModel } from 'src/app/Models/PoemListModel';
import { Poem } from 'src/app/Models/poem';
import { PoemDataModel } from 'src/app/Models/poemDataModel';
import { PoemScore } from 'src/app/Models/poemScore';
import { PoemUserScoreModel } from 'src/app/Models/poemUserScoreModel';
import { PoemGetScoreService } from 'src/app/Services/poem-get-score.service';
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
    private toastrService:ToastrService,private RouterService:Router,private poemGetScoreService:PoemGetScoreService) { }
  ngOnInit(): void {
    this.GetAll();
    this.CreateScoreForm();
    this.GetPoem();
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
      if (sessionStorage.getItem("email")!=null) {
        this.userService.getByEmail(sessionStorage.getItem("email")).subscribe(response=>{
          this.poemScoreModel.userId=response.data.id;
          if (this.scoreForm.valid) {
          this.poemScoreModel.score=this.scoreForm.value.score
          this.poemScoreModel.poemId=poem.id
          this.addPoemScore(this.poemScoreModel);
          }
        })
      }
      else{
        this.toastrService.error("Puan Verebilmek için giriş Yapmalısınız");
        this.RouterService.navigate(["login"])
      }
    
  }
  addPoemScore(poemScore:PoemScore){
    this.poemScoreService.add(poemScore).subscribe(response=>{
      this.toastrService.success("Puan verildi")
    },errorResponse=>{
      this.toastrService.error("Puan Verilemedi")
    })
  }


poemListModel:PoemListModel={
  poem:null,
  poemGetSocre:null,
  user:null
}
poemListModels:PoemListModel[]=[]

GetPoem(){
  this.poemService.getAll().subscribe(response=>{
    response.data.forEach(poem=>{
      this.poemService.getPoemId(poem.id).subscribe(response=>{
        this.SetPoemGetScore(response.data.id);
      },error=>{},()=>this.PoemListModelClear())
    });    
  },error=>{},()=>{console.log(this.poemListModels)})
  
}
SetPoem(poemId:Number){
  this.poemService.getPoemId(poemId).subscribe(response=>{
    this.poemListModel.poem=response.data
  },error=>{},()=>{
    this.SetUser(this.poemListModel.poem.userId);
  })
}

SetPoemGetScore(id:number){
  this.poemGetScoreService.getAll().pipe(map(data=>data.data.filter(d=>d.poemId==id))).subscribe(response=>{
    this.poemListModel.poemGetSocre=response[0];
  },error=>{},
  ()=>{
    this.SetPoem(this.poemListModel.poemGetSocre.poemId);
  });
}
PoemListModelClear(){
  this.poemListModel.poem=null;
  this.poemListModel.poemGetSocre=null;
  this.poemListModel.user=null;
  
}
SetUser(userId:number){
  this.userService.getById(userId).subscribe(response=>{
    this.poemListModel.user=response.data;
  },error=>{},()=>{
    this.poemListModels.push(this.poemListModel);
    //this.PoemListModelClear();
  })
}




























  
  

}
