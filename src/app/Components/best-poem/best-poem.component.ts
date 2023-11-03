import { Component, OnInit } from '@angular/core';
import { Poem } from 'src/app/Models/poem';
import { PoemUserScoreModel } from 'src/app/Models/poemUserScoreModel';
import { PoemGetScoreService } from 'src/app/Services/poem-get-score.service';
import { PoemScoreService } from 'src/app/Services/poem-score.service';
import { PoemService } from 'src/app/Services/poem.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-best-poem',
  templateUrl: './best-poem.component.html',
  styleUrls: ['./best-poem.component.css']
})
export class BestPoemComponent implements OnInit{
  constructor(private poemService:PoemService,private poemScoreService:PoemScoreService,
    private userService:UserService,private poemGetScoreService:PoemGetScoreService){}
  poemUserScoresModel:PoemUserScoreModel={
    fakeName:"",
    poem:null,
    poemScore:0
  }
  poemUserScoresModels:PoemUserScoreModel[]=[];
  poems:Poem[]=[]
  ngOnInit(): void {
    this.Get()
  }
  Get(){
    this.poemGetScoreService.getAll().subscribe(response=>{
      let score=0;
      let poemId;
      let userId;
      response.data.forEach(element => {
        if (element.score>=score) {
          this.poemUserScoresModel.poemScore=element.score;
          score=element.score;
          poemId=element.poemId;
        }
      });
      this.poemService.getPoemId(poemId).subscribe(response=>{
        this.poemUserScoresModel.poem=response.data
        userId=response.data.userId
        this.userService.getById(userId).subscribe(response=>{
          this.poemUserScoresModel.fakeName=response.data.fakeName;
          console.log(this.poemUserScoresModel)
        })  
      })
      
    })
  }


}
