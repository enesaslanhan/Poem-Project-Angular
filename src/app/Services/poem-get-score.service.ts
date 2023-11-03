import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataResponseModel } from '../Models/dataResponseModel';
import { PoemGetScore } from '../Models/poemGetScore';

@Injectable({
  providedIn: 'root'
})
export class PoemGetScoreService {

  constructor(private httpClient:HttpClient) { }
  apiUrl="https://localhost:44386/api/poemgetscores/";

  getAll():Observable<DataResponseModel<PoemGetScore[]>>{
    return this.httpClient.get<DataResponseModel<PoemGetScore[]>>(this.apiUrl+"getall");
  }
}
