import { CanActivate } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root' // Servisi uygulamanın kök modülüne ekleyin
  })

export class AuthGuard implements CanActivate {
    /**
     *
     */
    constructor(private toastrService:ToastrService) {
       
        
    }
    canActivate(): boolean {
        if (sessionStorage.getItem("email")) {
            return true;
          }
          else{
            this.toastrService.info("Lütfen giriş yapınız")
            return false;
            
          }
    }
}
