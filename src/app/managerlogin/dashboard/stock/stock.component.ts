import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from "../../../../environments/environment";

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  comoditylist:  any[]=[];
  constructor(private http: HttpClient) {
    var token=localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer '+token);
    this.http.post<any>(environment.url+'/api/stockshow',{},{headers: headers}).subscribe(result => {
      if (result.status==1){
             
             this.comoditylist=result.info;
            }
  });
   }

  ngOnInit(): void {
  }

}
