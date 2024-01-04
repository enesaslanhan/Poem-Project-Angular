import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../Models/responseModel';
import { Poem } from '../Models/poem';
import { DataResponseModel } from '../Models/dataResponseModel';

@Injectable({
  providedIn: 'root'
})
export class PoemService {

  constructor(private httpClient:HttpClient) { }
  apiUrl= "https://localhost:44386/api/poems/";

  add(poem:Poem):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"add",poem);
  }
  getAll():Observable<DataResponseModel<Poem[]>>{
    return this.httpClient.get<DataResponseModel<Poem[]>>(this.apiUrl+"getall");
  }
  getPoemId(poemId:Number):Observable<DataResponseModel<Poem>>{
    return this.httpClient.get<DataResponseModel<Poem>>(this.apiUrl+"getbypoemid?poemid="+poemId)
  }
  delete(poemId:number):Observable<ResponseModel>{
    return this.httpClient.delete<ResponseModel>(this.apiUrl+"delete?poemid="+poemId)
  }

}
