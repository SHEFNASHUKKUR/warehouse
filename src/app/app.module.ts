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


const routes: Routes = [ 

  { path: '', component: LandingComponent },
  { path: 'manager', component: ManagerloginComponent },
  { path: 'admin', component: AdminloginComponent },
  { path: 'dashboard', component: DashboardComponent }
];





@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    SidebarComponent,
    MainComponent,
    ManagerloginComponent,
    AdminloginComponent,
    DashboardComponent
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
