import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Feed } from 'src/app/models/feed';
import { FeedService } from 'src/app/services/feed.service';
import { FeedDeleteComponent } from '../feed-delete/feed-delete.component';

@Component({
  selector: 'app-feed-list',
  templateUrl: './feed-list.component.html',
  styleUrls: ['./feed-list.component.css']
})
export class FeedListComponent implements OnInit {

  ELEMENT_DATA: Feed[] = [    
  ]
  displayedColumns: string[] = ['position', 'postDate', 'reunionDate', 'title', 'acoes'];
  dataSource = new MatTableDataSource<Feed>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  startDateStart: Date = new Date(Number('2024'), Number('01') - 1, Number('01'));
  endDateStart: Date = new Date();
  startDateForm: FormControl = new FormControl(this.startDateStart); 
  endDateForm: FormControl = new FormControl (this.endDateStart);

  constructor(
    private service: FeedService,
    private dialog: MatDialog,
    public _adapter: DateAdapter<Date>
  ) { }

  ngOnInit(): void {
    this.findbyHeadQuarterIdAndPeriod();
    this._adapter.setLocale('en-GB');
  }
  findbyHeadQuarterIdAndPeriod(){
    if(this.startDateForm.value != null && this.endDateForm.value != null){
      this.service.findbyHeadQuarterIdAndPeriod(1, this.startDateForm.value.toLocaleDateString('fr-CA'),
        this.endDateForm.value.toLocaleDateString('fr-CA')).subscribe(resposta =>{
        this.ELEMENT_DATA = resposta.sort((a, b) => 
          new Date(b.reunionDate).getTime() - new Date(a.reunionDate).getTime());
        this.dataSource = new MatTableDataSource<Feed>(resposta);
        this.dataSource.paginator = this.paginator;
      }); 
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

   openDialog(id: any) {
    const dialogRef = this.dialog.open(FeedDeleteComponent,{
      data:{
        id: id ,
        message: 'Você tem Certeza que quer Deletar?',
        buttonText: {
          ok: 'Deletar',
          cancel: 'Cancelar'
        }
      }
    });  
    this.findbyHeadQuarterIdAndPeriod();      
  }  

}
