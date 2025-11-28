import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { Feed } from 'src/app/models/feed';
import { FeedService } from 'src/app/services/feed.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  feedList: Feed[] = [];
  dataSource = new MatTableDataSource<Feed>(this.feedList);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  obs: Observable<any>;
  private feedSub: Subscription;
  isLoading = false;

  constructor(
    private feedService: FeedService,
    public _adapter: DateAdapter<Date>,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadFeedsAccordingToRole();
  }

  /** 🔹 Carrega os feeds conforme o perfil do usuário logado */
  private loadFeedsAccordingToRole(): void {
    this.isLoading = true;

    if (this.authService.hasAnyRole(['ROLE_ADMIN', 'ROLE_COMANDO'])) {
      this.findAll();
      return;
    }

    const headQuarterId = this.authService.getHeadQuarterId();
    if (!headQuarterId) {
      console.warn('Usuário sem headQuarterId — nenhum feed será exibido.');
      this.feedList = [];
      this.isLoading = false;
      return;
    }

    const currentYear = new Date().getFullYear();
    const startDate = `${currentYear}-01-01`;
    const endDate = this.formatDate(new Date());

    this.feedSub = this.feedService
      .findbyHeadQuarterIdAndPeriod(headQuarterId, startDate, endDate)
      .subscribe({
        next: (feeds) => {
          this.applyFeedResponse(feeds);
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Erro ao buscar feeds por sede/período:', err);
          this.feedList = [];
          this.isLoading = false;
        },
      });
  }

  /** 🔹 Busca todos os feeds (somente para admins/comando) */
  private findAll(): void {
    this.feedSub = this.feedService.findAll().subscribe({
      next: (feeds) => {
        this.applyFeedResponse(feeds);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar todos os feeds:', err);
        this.isLoading = false;
      },
    });
  }

  /** 🔹 Aplica resposta de feed na tabela e ordena por data */
  private applyFeedResponse(feeds: Feed[]): void {
    this.feedList = feeds.sort(
      (a, b) => new Date(b.reunionDate).getTime() - new Date(a.reunionDate).getTime()
    );

    this.dataSource = new MatTableDataSource<Feed>(this.feedList);
    setTimeout(() => {
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
      this.obs = this.dataSource.connect();
    });
  }

  /** 🔹 Formata a data no padrão yyyy-MM-dd */
  private formatDate(date: Date): string {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  }

  ngOnDestroy(): void {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
    if (this.feedSub) {
      this.feedSub.unsubscribe();
    }
  }
}
