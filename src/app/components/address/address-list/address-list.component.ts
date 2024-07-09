import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Address } from 'src/app/models/address';
import { AddressService } from 'src/app/services/address.service';
import { MatDialog } from '@angular/material/dialog';
import { AddressDeleteComponent } from '../address-delete/address-delete.component';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css']  
})

export class AdressListComponent implements OnInit {

  ELEMENT_DATA: Address[] = [    
  ]
  displayedColumns: string[] = ['position', 'name', 'weight', 'city', 'symbol', 'acoes'];
  dataSource = new MatTableDataSource<Address>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(    
    private service: AddressService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.findAll();
  }
 
  findAll(){
    this.service.findAll().subscribe(resposta =>{
      this.ELEMENT_DATA = resposta
      this.dataSource = new MatTableDataSource<Address>(resposta);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
 
  openDialog(id: any) {
    const dialogRef = this.dialog.open(AddressDeleteComponent,{
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
