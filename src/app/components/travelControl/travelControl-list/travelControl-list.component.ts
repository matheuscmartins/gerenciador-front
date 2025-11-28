import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TravelControl } from 'src/app/models/travelControl';
import { TravelControlService } from 'src/app/services/travelControl.service';
import { MatDialog } from '@angular/material/dialog';
import { DateAdapter } from '@angular/material/core';
import { FormControl } from '@angular/forms';
import { TravelControlDeleteComponent } from '../travelControl-delete/travelControl-delete.component';
import { AuthService } from 'src/app/services/auth.service';

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

  now = new Date();
  startDateStart = new Date(this.now.getFullYear(), 0, 1);  
  endDateStart: Date = new Date();
  startDateForm: FormControl = new FormControl(this.startDateStart); 
  endDateForm: FormControl = new FormControl (this.endDateStart);

  constructor(
    private service: TravelControlService,
    private dialog: MatDialog,
    public _adapter: DateAdapter<Date>,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadTravelsAccordingToRole();
    this._adapter.setLocale('en-GB');
  }

  loadTravelsAccordingToRole(): void { 
    if(this.startDateForm.value != null && this.endDateForm.value != null){

    if (this.authService.hasAnyRole(['ROLE_ADMIN', 'ROLE_COMANDO'])) {
      this.service.FindAllbyPeriod( this.startDateForm.value.toLocaleDateString('fr-CA'),
      this.endDateForm.value.toLocaleDateString('fr-CA')).subscribe(resposta =>{
      this.ELEMENT_DATA = resposta.sort((a, b) => 
        new Date(b.travelDate).getTime() - new Date(a.travelDate).getTime());
      this.dataSource = new MatTableDataSource<TravelControl>(resposta);
      this.dataSource.paginator = this.paginator;
       });     
    }

    const headQuarterId = this.authService.getHeadQuarterId(); 
    this.service.findbyHeadQuarterIdAndPeriod(headQuarterId, this.startDateForm.value.toLocaleDateString('fr-CA'),
        this.endDateForm.value.toLocaleDateString('fr-CA')).subscribe(resposta =>{
        this.ELEMENT_DATA = resposta.sort((a, b) => 
          new Date(b.travelDate).getTime() - new Date(a.travelDate).getTime());
        this.dataSource = new MatTableDataSource<TravelControl>(resposta);
        this.dataSource.paginator = this.paginator;
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
 
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
    this.loadTravelsAccordingToRole();     
  } 

}
