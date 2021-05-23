import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { from } from 'rxjs';
import { OrderListService } from '../order-list.service';
import { ExportExcelUtil } from './export-excel';


@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.css']
})
export class OrderTableComponent implements OnInit {
  selectedStatus:any;
  selectedWarehouse:any;
listData:any;
exportSource=[];
  constructor(
    private http:OrderListService
  ) {
    this.getOrderListData();
   }

  ngOnInit(): void {
    this.selectedStatus="All";
    this.selectedWarehouse="All";
  }
  getOrderListData(){
this.http.getOrderListData().subscribe(res=>{
  this.listData=res;
  this.dataSource = new MatTableDataSource<PeriodicElement>(this.listData);
  this.exportSource =  this.listData;


})
  }
  
 dataSource = new MatTableDataSource<PeriodicElement>();


 displayedColumns = [
   "tableCheckBox",
  "ref_id",
 "user",
 "product",
 "date",
 "distribution",
 "status",
 "price"
 
 ]


 orderFilter = (value: any) => {
   //console.log("order filter",value.target.value);
  this.dataSource.filter =value.target.value;

  this.dataSource.filterPredicate = (data: PeriodicElement, filter: string): boolean => {
    return data.ref_id.toLowerCase().includes(filter) || data.items[0]["name"].toLowerCase().includes(filter) || data.warehouse.toLowerCase().includes(filter) 
    || data.order_status.toLowerCase().includes(filter) ||  data.user.first_name.toLowerCase().includes(filter) ||   data.user.last_name.toLowerCase().includes(filter)
    ||   data.items[0]["price"]==filter
    ;
  };

   }


   changewareshouse = (value: any) => {
    this.selectedStatus="All";
    
    var temp=value.value;


    if(temp== "All"){
      temp="";
    }
   

    this.dataSource.filterPredicate = (data: PeriodicElement, filter: string): any => {
      if(this.dataSource.filter)
      return data.warehouse==filter ;
    };
  

    this.dataSource.filter =temp;

 




     
  }
   changestatus = (value: any) => {
    this.selectedWarehouse="All";

    var temp=value.value;


    if(temp== "All"){
      temp="";
    }
   
   
   
    this.dataSource.filterPredicate = (data: PeriodicElement, filter: string): any => {
      if(this.dataSource.filter)
      return data.order_status==filter ;
    };
  

    this.dataSource.filter =temp;

 




     
  }


  exportProductList(){

    const orderList = this.exportSource.map(data => ({
      'Ref.ID': data["ref_id"] ,
      'Customer': data["user"]["first_name"] +" "+data["user"]["last_name"],
      'Product(s)': data["items"][0]["name"] ,
      'Date': data["date"] ,
      "Distribution":data["warehouse"],
      "Status":data["order_status"],
      "Price":data["items"][0]["price"]

    



    }));
    ExportExcelUtil.exportArrayToExcel( orderList, 'order_list');
  }

}


export interface PeriodicElement {
  ref_id:string;
  user:any;
  items:any;
  date:string;
  warehouse:string;
  order_status:string;


}



