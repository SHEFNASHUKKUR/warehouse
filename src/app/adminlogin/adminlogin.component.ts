import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  OnSubmit(data){
    this.http.post<any>(environment.url+'/api/admin', { username: data.user,
     password: data.pass }).subscribe(result => {
  });
}

}
