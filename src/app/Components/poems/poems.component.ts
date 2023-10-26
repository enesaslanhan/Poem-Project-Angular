import { Component, OnInit } from '@angular/core';
import { elementAt } from 'rxjs';
import { Poem } from 'src/app/Models/poem';
import { PoemService } from 'src/app/Services/poem.service';

@Component({
  selector: 'app-poems',
  templateUrl: './poems.component.html',
  styleUrls: ['./poems.component.css']
})
export class PoemsComponent implements OnInit {
  poems:Poem[]=[]
  constructor(private poemService:PoemService) { }
  ngOnInit(): void {
    this.GetAll();
  }
  GetAll(){
    this.poemService.getAll().subscribe(response=>{
      response.data.forEach(element => {
        this.poems.push(element);
      });
    })
  }

}
