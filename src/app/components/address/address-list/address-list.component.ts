import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Address } from 'src/app/models/address';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css']
})
export class AdressListComponent implements OnInit {

  ELEMENT_DATA: Address[] = [
    {
      id: 1,
      logradouro: 'Rua Brasil',
      number: '505',
      addressComplement: 'complemento',
      postCode: '19040-003',
      city: ['1']
    }
  ]
  displayedColumns: string[] = ['position', 'name', 'weight', 'city', 'symbol', 'acoes'];
  dataSource = new MatTableDataSource<Address>(this.ELEMENT_DATA);

  constructor() { }

  ngOnInit(): void {
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
