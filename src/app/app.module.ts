import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrderTableComponent } from './order-table/order-table.component';
import { HttpClientModule } from '@angular/common/http';
import { OrderListService } from './order-list.service';
import { MatTableModule } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    OrderTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
     MatTableModule,
     FormsModule,
     MatCheckboxModule,
     MatFormFieldModule,
     MatSelectModule
     
   
    
    
  ],
  providers: [OrderListService,Window,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
