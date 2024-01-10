import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Punishment } from '../Models/punishmentModel';
import { Observable } from 'rxjs';
import { ResponseModel } from '../Models/responseModel';
import { DataResponseModel } from '../Models/dataResponseModel';

@Injectable({
  providedIn: 'root'
})
export class PunishmentService {

  constructor(private httpClient:HttpClient) { }
  apiUrl="https://localhost:44386/api/punishments/";

  add(punishment:Punishment):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"add",punishment);
  }
  getAll():Observable<DataResponseModel<Punishment[]>>{
    return this.httpClient.get<DataResponseModel<Punishment[]>>(this.apiUrl+"getall");
  }
  getById(id:number):Observable<DataResponseModel<Punishment>>{
    return this.httpClient.get<DataResponseModel<Punishment>>(this.apiUrl+"getbyid?id="+id)
  }


}
