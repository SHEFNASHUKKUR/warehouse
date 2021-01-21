import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment"; 

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
ch;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  searchr: any[]=[];
  gtitle: any[]=[];
onchange(event:any) {
  this.ch=event.target.value;
  this.http.post<any>(environment.url+'/api/selectgodown',{godown:this.ch}).subscribe(result => {
    this.gtitle=result.info;
});
}
OnSubmit(data){

  this.http.post<any>(environment.url+'/api/search', { district: data.district,
  title: data.title }).subscribe(result => {
  this.searchr=result.info;  
     
     
    
});
}
}
