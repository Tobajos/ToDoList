import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import {ApiService} from '../api.service'

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  constructor( private apiService: ApiService, private router : Router){}

  user:any;


  ngOnInit(): void {
    this.updateUser()

  }

  updateUser(): void {
    this.user = this.apiService.getUserFromLocalStorage();
  }

  Logout(){
    this.apiService.logout().subscribe((data:any) =>{
      localStorage.removeItem('user');
      this.router.navigate(['']).then(() => {
          location.reload();
      });
      
    },(error:any)=>{
      console.error(error);
      
    })
  }

}
