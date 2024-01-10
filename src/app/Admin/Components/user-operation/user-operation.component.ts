import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { filter, map } from 'rxjs';
import { Punishment } from 'src/app/Models/punishmentModel';
import { User } from 'src/app/Models/user';
import { PoemGetScoreService } from 'src/app/Services/poem-get-score.service';
import { PoemService } from 'src/app/Services/poem.service';
import { PunishmentService } from 'src/app/Services/punishment.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-user-operation',
  templateUrl: './user-operation.component.html',
  styleUrls: ['./user-operation.component.css']
})
export class UserOperationComponent implements OnInit{
  constructor(private userService:UserService,
    private poemService:PoemService,
    private poemGetScoreService:PoemGetScoreService,
    private punishmentService:PunishmentService,
    private toastrService:ToastrService){}
  ngOnInit(): void {
    this.setuser()
   
  }
  user:User;
  userScore:number=0;
  poemNumber:number=0;
  setuser(){
    this.userService.getByEmail(localStorage.getItem("userId")).subscribe(response=>{
      this.user=response.data;
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
  punishment:Punishment={
    id:0,
    punishmentStartingDay:new Date(),
    userId:0,
    punishmentEndDay:null
  }
  SetPunishment(day:number){
    const today = new Date(); // Şu anki tarihi alır
    const threeDaysLater = new Date(today.getTime() + (day * 24 * 60 * 60 * 1000)); // 3 gün ekler
    this.punishment.userId=this.user.id;
    this.punishment.punishmentEndDay=threeDaysLater;
    this.Punishment(this.punishment)
  }
  Punishment(punishment:Punishment){
    this.punishmentService.add(punishment).subscribe(response=>{
      this.toastrService.success("Ceza verildi")
    },error=>{
      this.toastrService.error("Ceza Verilemedi");
    })
  } 
}
