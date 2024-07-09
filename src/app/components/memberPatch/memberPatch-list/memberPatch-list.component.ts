import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MemberPatch } from 'src/app/models/memberPatch';
import { MemberPatchService } from 'src/app/services/memberPatch.service';

@Component({
  selector: 'app-memberPatch-list',
  templateUrl: './memberPatch-list.component.html',
  styleUrls: ['./memberPatch-list.component.css']
})
export class MemberPatchListComponent implements OnInit {

  ELEMENT_DATA: MemberPatch[] = [ ]
  displayedColumns: string[] = ['position', 'name', 'memberName', 'headQuarter','admissionDate', 'acoes'];
  dataSource = new MatTableDataSource<MemberPatch>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: MemberPatchService
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(){
    this.service.findAll().subscribe(resposta =>{
      this.ELEMENT_DATA = resposta
      this.dataSource = new MatTableDataSource<MemberPatch>(resposta);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
