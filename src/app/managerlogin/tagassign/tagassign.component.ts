import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-tagassign',
  templateUrl: './tagassign.component.html',
  styleUrls: ['./tagassign.component.css']
})
export class TagassignComponent implements OnInit {

taglist:  any[]=[];
  constructor(private http: HttpClient) { 
    var token=localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer '+token);
    this.http.post<any>(environment.url+'/api/tagshow',{},{headers: headers}).subscribe(result => {
      if (result.status==1){
             
             this.taglist=result.info;
            }
  });
  }

  ngOnInit(): void {
  }
  
  OnSubmit(data){
    var token=localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer '+token);
    this.http.post<any>(environment.url+'/api/tagassign', { tagnumber: data.tagnumber,
     item: data.item,quantity: data.quantity },{headers: headers}).subscribe(result => {
       console.log(result.status);
       location.reload();
       
       
      
  });
}

}



