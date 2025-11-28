import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HeadQuarter } from 'src/app/models/headQuarter';
import { HeadQuarterService } from 'src/app/services/headQuarter.service';
import {MatDialog} from '@angular/material/dialog';
import { HeadQuarterDeleteComponent } from '../headQuarter-delete/headQuarter-delete.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-headQuarter-list',
  templateUrl: './headQuarter-list.component.html',
  styleUrls: ['./headQuarter-list.component.css']
})
export class HeadQuarterListComponent implements OnInit {

  ELEMENT_DATA: HeadQuarter[] = [    
  ]
  displayedColumns: string[] = ['position', 'name', 'city', 'acoes'];
  dataSource = new MatTableDataSource<HeadQuarter>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(    
    private service: HeadQuarterService,
    private dialog: MatDialog,
     public authService: AuthService
      ) { }

  ngOnInit(): void {
    this.findAll();
  }
 
  findAll(){
    this.service.findAll().subscribe(resposta =>{
      this.ELEMENT_DATA = resposta
      this.dataSource = new MatTableDataSource<HeadQuarter>(resposta);
      this.dataSource.paginator = this.paginator;      
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
 
  openDialog(id: any) {
    const dialogRef = this.dialog.open(HeadQuarterDeleteComponent,{
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
