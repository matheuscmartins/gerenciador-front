import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { RoleDuty } from 'src/app/models/roleDuty';
import { RoleDutyService } from 'src/app/services/roleDuty.service';

@Component({
  selector: 'app-roleDuty-list',
  templateUrl: './roleDuty-list.component.html',
  styleUrls: ['./roleDuty-list.component.css']
})
export class RoleDutyListComponent implements OnInit {

  ELEMENT_DATA: RoleDuty[] = [    
  ]
  displayedColumns: string[] = ['position', 'roleName', 'memberName', 'headQuarter','startDate', 'endDate', 'acoes'];
  dataSource = new MatTableDataSource<RoleDuty>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: RoleDutyService,
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(){
    this.service.findAll().subscribe(resposta =>{
      this.ELEMENT_DATA = resposta
      this.dataSource = new MatTableDataSource<RoleDuty>(resposta);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
