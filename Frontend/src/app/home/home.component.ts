import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service'

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  list: any[]=[]

  constructor(private apiService: ApiService){}

  ngOnInit():void{
    this.getList()
  }

  getList(): void{
    this.apiService.getList()
    .subscribe(
      (data: any)=>{
      this.list = data
    },
    error=>{
      console.log('error',error)
    }
  )
  }

}
