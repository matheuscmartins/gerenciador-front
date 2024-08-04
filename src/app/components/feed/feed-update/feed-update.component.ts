import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Feed } from 'src/app/models/feed';
import { HeadQuarter } from 'src/app/models/headQuarter';
import { FeedService } from 'src/app/services/feed.service';
import { HeadQuarterService } from 'src/app/services/headQuarter.service';

@Component({
  selector: 'app-feed-update',
  templateUrl: './feed-update.component.html',
  styleUrls: ['./feed-update.component.css']
})
export class FeedUpdateComponent implements OnInit {

  feed: Feed = {
    id:'',
    postDate: '',
    reunionDate: '',
    title: '',
    text: '',
    headQuarter: {      
    }
  }
  headQuarterMatSelected: FormControl = new FormControl(null, Validators.required); 
  headQuarterList: HeadQuarter [];
  reunionDateForm: FormControl = new FormControl(null); 
  reunionDateStart: Date;  
  title: FormControl = new FormControl(null, Validators.minLength(4)); 
  text: FormControl = new FormControl(null, Validators.minLength(4)); 

  constructor(
    private feedService: FeedService,
    private headQuarterService: HeadQuarterService,
    private toastr: ToastrService,
    private router: Router,
    public _adapter: DateAdapter<Date>,
    private activedRoute : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.findAllHeadQuarter();
    this._adapter.setLocale('en-GB');
    this.feed.id = this.activedRoute.snapshot.paramMap.get('id'); 
    this.findbyId(); 
  }

  findAllHeadQuarter(){
    this.headQuarterService.findAll().subscribe(resposta =>{
      this.headQuarterList = resposta;
    })
  }

  findbyId(): void{
    this.feedService.findById(this.feed.id).subscribe(resposta =>{      
      this.feed = resposta;
      var [dia, mes, ano] = this.feed.reunionDate.split('/');
      this.reunionDateStart = new Date(Number(ano), Number(mes) - 1, Number(dia)); 
      this.headQuarterMatSelected.setValue(this.feed.headQuarter.id);      
        })
  }

  validaCampos(): boolean{
    return this.title.valid && this.text.valid &&
    this.headQuarterMatSelected.valid &&  this.reunionDateForm.valid 
  }

  addHeadQuarter(headQuarterId: any): void{   
    this.feed.headQuarter.id = headQuarterId;    
  }

  addReunionDate(date: Date): void{
    if(date != null){
    this.feed.reunionDate = date.toLocaleDateString('en-GB', { timeZone: 'UTC' });  
    this.feed.postDate = new Date().toLocaleDateString('en-GB', { timeZone: 'UTC' });  
    console.log(this.feed.postDate);
   }
  }

  update(): void{  
    if(this.feed.headQuarter.id != null) {
        this.feedService.update(this.feed).subscribe(() =>{      
          this.toastr.success('Postagem atualizada com Sucesso!', 'Update');
          this.router.navigate(['feed']);
        }, ex => {      
          if(ex.error.errors){
            ex.error.errors.array.forEach(element => {
              this.toastr.error(element.message);
            });
          }else{
            this.toastr.error(ex.error.message);
          }
        });
      }
  }

}
