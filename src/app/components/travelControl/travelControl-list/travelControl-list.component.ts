import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TravelControl } from 'src/app/models/travelControl';
import { TravelControlService } from 'src/app/services/travelControl.service';
import { MatDialog } from '@angular/material/dialog';
import { DateAdapter } from '@angular/material/core';
import { FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
//import { AddressDeleteComponent } from '../address-delete/address-delete.component';

@Component({
  selector: 'app-travelControl-list',
  templateUrl: './travelControl-list.component.html',
  styleUrls: ['./travelControl-list.component.css']
})
export class TravelControlListComponent implements OnInit {

  ELEMENT_DATA: TravelControl[] = [    
  ]
  displayedColumns: string[] = ['position', 'travelDate', 'location', 'name', 'km', 'kmControl', 'acoes'];
  dataSource = new MatTableDataSource<TravelControl>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  
  startDateStart: Date = new Date(Number('2024'), Number('01') - 1, Number('01'));
  endDateStart: Date = new Date();
  startDateForm: FormControl = new FormControl(this.startDateStart); 
  endDateForm: FormControl = new FormControl (this.endDateStart);

  constructor(
    private service: TravelControlService,
    private dialog: MatDialog,
    public _adapter: DateAdapter<Date>
  ) { }

  ngOnInit(): void {
    this.findbyHeadQuarterIdAndPeriod();
    this._adapter.setLocale('en-GB');
  }

  /* findAll(){
    this.service.findAll().subscribe(resposta =>{
      this.ELEMENT_DATA = resposta
      this.dataSource = new MatTableDataSource<TravelControl>(resposta);
      this.dataSource.paginator = this.paginator;
    })
  } */

  findbyHeadQuarterIdAndPeriod(){
     this.service.findbyHeadQuarterIdAndPeriod(1, this.startDateStart.toLocaleDateString('fr-CA'),
     this.endDateStart.toLocaleDateString('fr-CA')).subscribe(resposta =>{
      this.ELEMENT_DATA = resposta
      this.dataSource = new MatTableDataSource<TravelControl>(resposta);
      this.dataSource.paginator = this.paginator;
    }) 
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
 /*
  openDialog(id: any) {
    const dialogRef = this.dialog.open(TravelControlDeleteComponent,{
      data:{
        id: id ,
        message: 'Você tem Certeza que quer Deletar?',
        buttonText: {
          ok: 'Deletar',
          cancel: 'Cancelar'
        }
      }
    });  
    this.findAll();   
  } */

}
