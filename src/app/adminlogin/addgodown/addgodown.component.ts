import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from "../../../environments/environment";


@Component({
  selector: 'app-addgodown',
  templateUrl: './addgodown.component.html',
  styleUrls: ['./addgodown.component.css']
})
export class AddgodownComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  OnSubmit(data){
    var token=localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer '+token);
    this.http.post<any>(environment.url+'/api/addgodown', { regid: data.regid,
     title: data.title,district: data.district,capacity: data.capacity },{headers: headers}).subscribe(result => {
       console.log(result.status);
       
      
  });
}
}
