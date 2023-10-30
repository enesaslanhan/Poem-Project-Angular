import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { elementAt } from 'rxjs';
import { Poem } from 'src/app/Models/poem';
import { PoemDataModel } from 'src/app/Models/poemDataModel';
import { PoemScore } from 'src/app/Models/poemScore';
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
  GetAll(){
    this.poemService.getAll().subscribe(response=>{
      response.data.forEach(element => {
        this.userService.getById(element.userId).subscribe(response=>{
          this.poemDataModel.fakeName=response.data.fakeName
          this.poemDataModel.poem=element;
          this.poemData.push(this.poemDataModel);
          this.poemDataModel={
          fakeName:"",
          poem:null,
          puan:7
        }
        })   
      });
    })
  }
  PoemDetail(poem:Poem){
    this.poemDetail.poemName=poem.poemName
    this.poemDetail.poemText=poem.poemText
    this.poemDetail.id=poem.id
    this.detail=true;
  }
  TurnBack(){
    this.detail=false
  }
  
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
    })
  }

  

}
