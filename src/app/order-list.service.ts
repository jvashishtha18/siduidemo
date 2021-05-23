import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderListService {

  constructor(
    private http:HttpClient
    ) 
    {
 }
url= new URL(window.location.href).origin+'/api/orders.json';
//url='https://iudx.s3.ap-south-1.amazonaws.com/orders.json';

getOrderListData():Observable<any>{
  console.log(this.url);
 return  this.http.get<any>(this.url);
}
}
