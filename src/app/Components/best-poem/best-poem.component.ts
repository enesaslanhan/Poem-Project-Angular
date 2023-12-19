import { Component, OnInit } from '@angular/core';
import { Poem } from 'src/app/Models/poem';
import { PoemGetScore } from 'src/app/Models/poemGetScore';
import { PoemUserScoreModel } from 'src/app/Models/poemUserScoreModel';
import { PoemGetScoreService } from 'src/app/Services/poem-get-score.service';
import { PoemScoreService } from 'src/app/Services/poem-score.service';
import { PoemService } from 'src/app/Services/poem.service';
import { UserService } from 'src/app/Services/user.service';
import { map,filter,pairwise,pipe} from 'rxjs';
import { User } from 'src/app/Models/user';
@Component({
  selector: 'app-best-poem',
  templateUrl: './best-poem.component.html',
  styleUrls: ['./best-poem.component.css']
})
export class BestPoemComponent implements OnInit{
  constructor(private poemService:PoemService,private poemScoreService:PoemScoreService,
    private userService:UserService,private poemGetScoreService:PoemGetScoreService){}
 
  peoplePoints=0;
  poemScore=0;
  poem:Poem;
  user:User;
  ngOnInit(): void {
    this.GetPoem();
  }

  NumberOfPeopleGivingPoints(id:number){
    this.poemGetScoreService.getAll().pipe(map(data=>data.data.filter(d=>d.poemId==id))).subscribe(response=>{
      this.poemScore=response[0].score;
      this.peoplePoints=response[0].numberOfUser;
      console.log(this.peoplePoints)
    })
  }
  GetPoem(){
    this.poemGetScoreService.getAll().subscribe(response=>{
      let score=0;
      let poemId;
      response.data.forEach(element => {
        if (element.score>=score) {
          score=element.score;
          poemId=element.poemId;
        }
      })
      this.NumberOfPeopleGivingPoints(poemId);
      this.SetPoem(poemId);
    })  
  }
  SetPoem(id:number){
    this.poemService.getPoemId(id).subscribe(response=>{
      this.poem=response.data;
      this.SetFakeName(response.data.userId);
    })
  }
  SetFakeName(id:number){
    this.userService.getById(id).subscribe(response=>{
      this.user=response.data;
    })
  }
}
