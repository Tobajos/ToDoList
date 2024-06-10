import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = "";
  password: string = "";

  constructor(private apiService: ApiService, private router: Router) {}

  register(): void {
    const userData = {
      username: this.username,
      password: this.password
    };

    this.apiService.register(userData).subscribe(
      (response: any) => {
        localStorage.setItem('user', JSON.stringify({ username: this.username, token: response.token }));
        this.router.navigate(['/']);
      },
      error => {
        console.log(error);
      }
    );
  }
}
