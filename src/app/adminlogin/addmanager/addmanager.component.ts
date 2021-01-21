import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-addmanager',
  templateUrl: './addmanager.component.html',
  styleUrls: ['./addmanager.component.css']
})
export class AddmanagerComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  OnSubmit(data){
    var token=localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer '+token);
    this.http.post<any>(environment.url+'/api/addmanager', { deptid: data.deptid,
     name: data.name,email: data.email,regid: data.regid,username: data.username,password: data.password,contact: data.contact },{headers: headers}).subscribe(result => {
       console.log(result.status);
       
      
  });
}
}
