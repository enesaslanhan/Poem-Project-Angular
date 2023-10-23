import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../Models/user';
import { ResponseModel } from '../Models/responseModel';
import { Observable } from 'rxjs';
import { DataResponseModel } from '../Models/dataResponseModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }

  apiUrl= "https://localhost:44386/api/users/";

  add(user:User):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"add",user);
  }
  getByEmail(email:string):Observable<DataResponseModel<User>>{
    return this.httpClient.get<DataResponseModel<User>>(this.apiUrl+"getbyemail?email="+email);
  }
  

}
