import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders  } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseURL = 'http://127.0.0.1:8000/api/'

  constructor(private http: HttpClient) { }

  getUserFromLocalStorage() {
    const userString = localStorage.getItem('user');
    return userString ? JSON.parse(userString) : null;
  }

  login(data:any){
    return this.http.post(`${this.baseURL}login`,data);
  }

  register(data:any){
    return this.http.post(`${this.baseURL}register`,data);
  }

  logout(){
    let user = this.getUserFromLocalStorage();
    
    const headers = new HttpHeaders({
      'Authorization': `Token ${user.token}`
    });

    return this.http.post(`${this.baseURL}logout`,null,{headers})
  }

  
  getList() {
    let user = this.getUserFromLocalStorage();
    
    const headers = new HttpHeaders({
      'Authorization': `Token ${user.token}`
    });
    console.log(headers);
  
    return this.http.get(`${this.baseURL}getList`, { headers });
  }

  getListDetails(id:number): Observable<any> {
    let user = this.getUserFromLocalStorage();
    
    const headers = new HttpHeaders({
      'Authorization': `Token ${user.token}`
    });
    console.log(headers);
  
    return this.http.get(`${this.baseURL}getList/${id}`, { headers });
  }
  
  updateItemStatus(id: number, status: boolean): Observable<any> {
    let user = this.getUserFromLocalStorage();

    const headers = new HttpHeaders({
      'Authorization': `Token ${user.token}`
    });

    return this.http.patch(`${this.baseURL}items/${id}`, { status }, { headers });
  }

  createList(data:any): Observable<any> {
    let user = this.getUserFromLocalStorage();

    const headers = new HttpHeaders({
      'Authorization':`Token ${user.token}`
    });

    return this.http.post(`${this.baseURL}createList`,data, {headers})
  }

  createItem(data:any):Observable<any>{
    let user = this.getUserFromLocalStorage();

    const headers = new HttpHeaders({
      'Authorization':`Token ${user.token}`
    });

    return this.http.post(`${this.baseURL}addItem`,data,{headers});
  }

  deleteList(id: number): Observable<any> {
    let user = this.getUserFromLocalStorage();
  
    const headers = new HttpHeaders({
      'Authorization': `Token ${user.token}`
    });
  
    return this.http.delete(`${this.baseURL}deleteList/${id}`, { headers });
  }

}
