import { Component, OnInit } from '@angular/core';
import { filter, map } from 'rxjs';
import { PoemGetScoreService } from 'src/app/Services/poem-get-score.service';
import { PoemService } from 'src/app/Services/poem.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-user-operation',
  templateUrl: './user-operation.component.html',
  styleUrls: ['./user-operation.component.css']
})
export class UserOperationComponent implements OnInit{
  constructor(private userService:UserService,private poemService:PoemService,private poemGetScoreService:PoemGetScoreService ){}
  ngOnInit(): void {
    this.setuser()
  }
  userName:string;
  userScore:number=0;
  poemNumber:number=0;
  setuser(){
    this.userService.getByEmail(localStorage.getItem("userId")).subscribe(response=>{
      this.userName=response.data.fakeName;
      this.setPoemNumber(response.data.id)
    })
  }
  setPoemNumber(userId:number){
    this.poemService.getAll().pipe(map(data=>data.data.filter(d=>d.userId==userId))).subscribe(response=>{
      response.forEach(element => {
        this.poemNumber++;
        this.setPoemScore(element.id)
        console.log(element)
      });
    })
  }
  setPoemScore(poemId:number){
    this.poemGetScoreService.getAll().pipe(map(data=>data.data.filter(d=>d.poemId==poemId))).subscribe(response=>{
      this.userScore+=response[0].score;
      console.log(response[0].score)
    })
  }
}
