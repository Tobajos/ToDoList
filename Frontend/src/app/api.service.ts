import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders  } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseURL = 'http://127.0.0.1:8000/api/'

  constructor(private http: HttpClient) { }

  getList(): Observable<any> {
    return this.http.get(this.baseURL + 'test');
  }

}
