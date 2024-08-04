import { Component, OnInit, ViewChild } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Feed } from 'src/app/models/feed';
import { FeedService } from 'src/app/services/feed.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  feedList: Feed[] = []
  dataSource = new MatTableDataSource<Feed>(this.feedList);;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  obs: Observable<any>;

  constructor(
    private feedService: FeedService,
    public _adapter: DateAdapter<Date>
  ) { }

  ngOnInit(): void {
    this.findAll();
  }
  
  findAll(): void{
    this.feedService.findAll().subscribe(resposta =>{
      this.feedList = resposta.sort((a, b) => 
      new Date(b.reunionDate).getTime() - new Date(a.reunionDate).getTime());
      this.dataSource = new MatTableDataSource<Feed>(resposta);
      this.dataSource.paginator = this.paginator;
      this.obs = this.dataSource.connect();
    })
  }
  ngOnDestroy() {
    if (this.dataSource) { 
      this.dataSource.disconnect(); 
    }
  }

}
