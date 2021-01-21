import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainComponent } from './main/main.component';
import { Routes, RouterModule } from '@angular/router';
import { ManagerloginComponent } from './managerlogin/managerlogin/managerlogin.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { DashboardComponent } from './managerlogin/dashboard/dashboard.component';
import { AdmindashboardComponent } from './adminlogin/admindashboard/admindashboard.component';
import { SearchComponent } from './search/search.component';
import { StockComponent } from './managerlogin/dashboard/stock/stock.component';
import { TagassignComponent } from './managerlogin/tagassign/tagassign.component';
import { CommodityComponent } from './managerlogin/dashboard/commodity/commodity.component';
import { AddgodownComponent } from './adminlogin/addgodown/addgodown.component';
import { AddmanagerComponent } from './adminlogin/addmanager/addmanager.component';


const routes: Routes = [ 

  { path: '', component: LandingComponent },
  { path: 'manager', component: ManagerloginComponent },
  { path: 'admin', component: AdminloginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'administrator', component: AdmindashboardComponent },
  { path: 'search', component: SearchComponent },
  { path: 'stock', component: StockComponent },
  { path: 'tagassign', component: TagassignComponent },
  { path: 'commodity', component: CommodityComponent },
  { path: 'addgodown', component: AddgodownComponent },
  { path: 'addmanager', component: AddmanagerComponent }
];





@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    SidebarComponent,
    MainComponent,
    ManagerloginComponent,
    AdminloginComponent,
    DashboardComponent,
    AdmindashboardComponent,
    SearchComponent,
    StockComponent,
    TagassignComponent,
    CommodityComponent,
    AddgodownComponent,
    AddmanagerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule
  ],
  
  providers: [RouterModule],
  bootstrap: [AppComponent]
})

export class AppModule { }
