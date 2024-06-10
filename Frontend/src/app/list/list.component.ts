import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { faCircleCheck, faAngleLeft, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  list: any;
  items: any[] = [];
  newItem: any = {};
  check = faCircleCheck;
  back = faAngleLeft;
  delete = faTrash

  constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.getListDetails(id);
    });
  }

  getListDetails(id: number): void {
    this.apiService.getListDetails(id).subscribe(
      response => {
        console.log('Response:', response);
        this.list = response.list;
        this.items = response.items;
      },
      error => {
        console.error('Error:', error);
      }
    );
  }

  markAsDone(itemId: number): void {
    this.apiService.updateItemStatus(itemId, true).subscribe(
      response => {
        console.log('Item status updated', response);
        window.location.reload();
      },
      error => {
        console.error('Error updating item status', error);
      }
    );
  }

  onSubmitItem(): void {
    this.newItem.list = this.list.id;
    this.apiService.createItem(this.newItem).subscribe(
      response => {
        console.log('Submitted form data:', this.newItem);
        this.items.push(response);
        this.newItem = {};
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteList(): void {
    this.apiService.deleteList(this.list.id).subscribe(
      response => {
        console.log('List deleted successfully', response);
        this.router.navigate(['/']); // Przekierowanie do strony głównej po usunięciu listy
      },
      error => {
        console.error('Error deleting list', error);
      }
    );
  }
}
