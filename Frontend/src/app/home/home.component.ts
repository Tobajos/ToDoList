import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  list: any[] = [];
  user: any;
  newList: any = {}

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.user = this.apiService.getUserFromLocalStorage();
    this.getList();
  }

  getList(): void {
    this.apiService.getList()
      .subscribe(
        (data: any) => {
          this.list = data
        },
        error => {
          console.log('error', error)
        }
      )
    }

  onSubmit(): void {
    this.apiService.createList(this.newList).subscribe(response => {
      console.log('Submitted form data:', this.newList);
      window.location.reload();
    }, error => {
      console.log(error);
    })
  }
}
