import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Member } from 'src/app/models/member';
import { AuthService } from 'src/app/services/auth.service';
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
    private service: MemberService,
    public authService: AuthService    
  ) { }

  ngOnInit(): void {
    this.loadMembersAccordingToRole();
  }
  
  loadMembersAccordingToRole(): void { 
    if (this.authService.hasAnyRole(['ROLE_ADMIN', 'ROLE_COMANDO'])) {
      this.findAll();
      return;
    }

    const headQuarterId = this.authService.getHeadQuarterId();    
    console.log(headQuarterId);
    this.service.findByHeadQuarterId(headQuarterId).subscribe(resposta =>{
      this.ELEMENT_DATA = resposta.sort((a, b) => 
      new Date(b.firstName).getTime() - new Date(a.firstName).getTime());
      this.dataSource = new MatTableDataSource<Member>(resposta);
      this.dataSource.paginator = this.paginator;
      })  
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
