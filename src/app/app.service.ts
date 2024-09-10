import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) {
  }

  sendQuery(data: any) {
    // return this.http.post('https://testologia.com/intensive-price', data);
    console.log(data)
    return this.http.post(environment.api + 'choice', data);
    // return this.http.post(environment.api + 'requests', data);
  }

  getData() {
//    return this.http.get(environment.api + 'burger');
  }
}