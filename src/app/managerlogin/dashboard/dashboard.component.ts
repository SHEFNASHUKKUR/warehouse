import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  status=0;
  user;
  constructor(private http: HttpClient) {
    var token=localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer '+token);
    this.http.post<any>(environment.url+'/api/managerinfo',{},{headers: headers}).subscribe(result => {
       if (result.status==1){
              this.status=1
              this.user=result.name;
             }
  });
}

  ngOnInit(): void {
  }

}
