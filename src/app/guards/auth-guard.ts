import { CanActivate, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root' // Servisi uygulamanın kök modülüne ekleyin
  })

export class AuthGuard implements CanActivate {
    /**
     *
     */
    constructor(private toastrService:ToastrService,private router:Router) {
       
        
    }
    canActivate(): boolean {
        if (sessionStorage.getItem("email")) {
            return true;
          }
          else{
            this.toastrService.info("Lütfen giriş yapınız")
            this.router.navigate(['login'])
            return false;
            
          }
    }
}
