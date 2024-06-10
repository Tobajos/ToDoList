import { Component } from '@angular/core';
import {ApiService} from '../api.service'
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

   username:string = ""
   password:string = ""

  constructor(private apiService:ApiService, private router: Router){}

  login():void{
    this.apiService.login({username: this.username, password: this.password}).subscribe(
      (response:any)=>{
        localStorage.setItem('user', JSON.stringify({username:this.username, token:response.token}));
        this.router.navigate(['/'])
      },
      error =>{
        console.log(error)
      }
    )
  }
}
