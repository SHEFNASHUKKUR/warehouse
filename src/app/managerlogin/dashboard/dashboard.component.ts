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
  rfidlist:  any[]=[];
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


  this.http.post<any>(environment.url+'/api/rfid',{},{headers: headers}).subscribe(result => {
    if (result.status==1){
           
           this.rfidlist=result.info;
          }
});

}





OnLogout(){
  localStorage.removeItem('token');
  location.replace('/manager');
}

  ngOnInit(): void {
  }

}
