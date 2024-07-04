import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Infraction } from 'src/app/models/infraction';
import { InfractionService } from 'src/app/services/infraction.service';
import { MatDialog } from '@angular/material/dialog';
import { InfractionDeleteComponent } from '../infraction-delete/infraction-delete.component';


@Component({
  selector: 'app-infraction-list',
  templateUrl: './infraction-list.component.html',
  styleUrls: ['./infraction-list.component.css']  
})
export class InfractionListComponent implements OnInit {

  ELEMENT_DATA: Infraction[] = [    
  ]
  displayedColumns: string[] = ['position', 'name', 'infractionType', 'infractionDate', 'acoes'];
  dataSource = new MatTableDataSource<Infraction>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(    
    private service: InfractionService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.findAll();
  }
 
  findAll(){
    this.service.findAll().subscribe(resposta =>{
      this.ELEMENT_DATA = resposta
      this.dataSource = new MatTableDataSource<Infraction>(resposta);
      this.dataSource.paginator = this.paginator;
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
 
  openDialog(id: any) {
    const dialogRef = this.dialog.open(InfractionDeleteComponent,{
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
  }
 
}
