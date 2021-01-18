import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-managerlogin',
  templateUrl: './managerlogin.component.html',
  styleUrls: ['./managerlogin.component.css']
})
export class ManagerloginComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  OnSubmit(data){
    this.http.post<any>(environment.url+'/api/login', { username: data.email,
     password: data.pass }).subscribe(result => {
       console.log(result.status);
       localStorage.setItem('token',result.token)
  });
}



}
