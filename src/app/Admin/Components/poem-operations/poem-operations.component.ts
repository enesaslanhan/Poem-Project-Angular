import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { Poem } from 'src/app/Models/poem';
import { PoemGetScore } from 'src/app/Models/poemGetScore';
import { User } from 'src/app/Models/user';
import { PoemGetScoreService } from 'src/app/Services/poem-get-score.service';
import { PoemService } from 'src/app/Services/poem.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-poem-operations',
  templateUrl: './poem-operations.component.html',
  styleUrls: ['./poem-operations.component.css']
})
export class PoemOperationsComponent implements OnInit{
  constructor(private poemService:PoemService,private userService:UserService,private poemGetScoreService:PoemGetScoreService,
    private toastr:ToastrService){}
  ngOnInit(): void {
    this.SetPoem()
  }

  poemss:Poem[]=[]
  poemGetScores:PoemGetScore[]=[]
  users:User[]=[]

  SetPoem(){
    this.poemService.getAll().subscribe(response=>{
      response.data.forEach(element=>{
        this.poemss.push(element)
        this.poemGetScoreService.getAll().pipe(map(data=>data.data.filter(d=>d.poemId==element.id))).subscribe(response2=>{
          this.poemGetScores.push(response2[0])
          this.userService.getById(element.userId).subscribe(response3=>{
            this.users.push(response3.data)
          },error=>{},()=>{
  
          })
        })
      })
    })
  }
  index:number=0;

  right(){
    if(this.index>=this.users.length-1){
      this.index=0;
  
    }
    else{
      this.index++
    }
  }
  left(){
    if (this.index<0) {
      this.index=this.users.length-2
    }
    else{
      this.index--;
    }
  }
  remove(index:number){
    console.log(this.poemss[index].id);
    this.poemService.delete(this.poemss[index].id).subscribe(response=>{
      this.toastr.success(`"${this.poemss[index].poemName}" İsimli şiir silinmiştir.`);
    },error=>{
      this.toastr.error(`"${this.poemss[index].poemName}" İsimli şiir Silinemedi.`)
    },()=>location.reload())
    /*this.poemGetScoreService.delete(this.poemss[index].id).subscribe(response=>{
      
    })*/
  }
  
}
