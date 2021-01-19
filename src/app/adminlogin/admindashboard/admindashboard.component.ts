import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {

  status=0;
  user;

  managerlist:  any[]=[];
  constructor(private http: HttpClient) {
    var token=localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer '+token);
    this.http.post<any>(environment.url+'/api/admininfo',{},{headers: headers}).subscribe(result => {
       if (result.status==1){
              this.status=1
              this.user=result.name;
             }
  });



  this.http.post<any>(environment.url+'/api/managerlist',{},{headers: headers}).subscribe(result => {
    if (result.status==1){
           
           this.managerlist=result.info;
          }
});


};


OnLogout(){
  localStorage.removeItem('token');
  location.replace('/admin');
}

  ngOnInit(): void {
  }

}
