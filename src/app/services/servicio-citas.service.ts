import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ServicioCitasService {
  constructor(private http: HttpClient) {        
   }

  public getJson(url:string){
    return this.http.get(url);
  }

}


 