import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Member } from 'src/app/models/member';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']  
})
export class MemberListComponent implements OnInit {

  ELEMENT_DATA: Member[] = [ ]
  displayedColumns: string[] = ['position', 'firstName', 'lastName', 'nickName', 'headQuarter', 'acoes'];
  dataSource = new MatTableDataSource<Member>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(    
    private service: MemberService
    
  ) { }

  ngOnInit(): void {
    this.findAll();
  }
 
  findAll(){
    this.service.findAll().subscribe(resposta =>{
      this.ELEMENT_DATA = resposta;      
      this.dataSource = new MatTableDataSource<Member>(resposta);
      this.dataSource.paginator = this.paginator;
    })
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }  
 
}
