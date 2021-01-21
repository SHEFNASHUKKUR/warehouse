import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from "../../../../environments/environment";

@Component({
  selector: 'app-commodity',
  templateUrl: './commodity.component.html',
  styleUrls: ['./commodity.component.css']
})
export class CommodityComponent implements OnInit {


  constructor(private http: HttpClient) { 
    
  }

  ngOnInit(): void {
  }
  OnSubmit(data){
    var token=localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer '+token);
    this.http.post<any>(environment.url+'/api/commodityadd', { commodity: data.commodity,
     quantity: data.capacity },{headers: headers}).subscribe(result => {
       console.log(result.status);

       
       
      
  });
}
}
