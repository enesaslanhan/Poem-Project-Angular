import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../Models/responseModel';
import { PoemScore } from '../Models/poemScore';
import { DataResponseModel } from '../Models/dataResponseModel';

@Injectable({
  providedIn: 'root'
})
export class PoemScoreService {

  constructor(private httpClient:HttpClient) { }
  apiUrl="https://localhost:44386/api/poemscores/";

  add(poemScore:PoemScore):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"add",poemScore)
  }
  getAll():Observable<DataResponseModel<PoemScore[]>>{
    return this.httpClient.get<DataResponseModel<PoemScore[]>>(this.apiUrl+"getall");
  }
  getPoemId(poemId:number):Observable<DataResponseModel<PoemScore[]>>{
    return this.httpClient.get<DataResponseModel<PoemScore[]>>(this.apiUrl+"getbypoemid?poemid="+poemId);
  }
}
