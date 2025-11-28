import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Feed } from 'src/app/models/feed';
import { HeadQuarter } from 'src/app/models/headQuarter';
import { FeedService } from 'src/app/services/feed.service';
import { HeadQuarterService } from 'src/app/services/headQuarter.service';

@Component({
  selector: 'app-feed-create',
  templateUrl: './feed-create.component.html',
  styleUrls: ['./feed-create.component.css']
})
export class FeedCreateComponent implements OnInit {
  
  feed: Feed = {
    id:'',
    postDate: '',
    reunionDate: '',
    title: '',
    text: '',
    feedVisibility: '',
    headQuarter: {      
    }
  }

  headQuarterMatSelected: FormControl = new FormControl(null, Validators.required); 
  headQuarterList: HeadQuarter [];
  reunionDateForm: FormControl = new FormControl(null, Validators.required); 
  title: FormControl = new FormControl(null, Validators.minLength(4)); 
  text: FormControl = new FormControl(null, Validators.minLength(4)); 
  publica: boolean = false;
  restrita: boolean = false;
  
  constructor(
    private feedService: FeedService,
    private headQuarterService: HeadQuarterService,
    private toastr: ToastrService,
    private router: Router,
    public _adapter: DateAdapter<Date>
  ) { }

  ngOnInit(): void {
    this.findAllHeadQuarter();
    this._adapter.setLocale('en-GB');
    this.visibility('PUBLICA', false);
  }

  findAllHeadQuarter(){
    this.headQuarterService.findAll().subscribe(resposta =>{
      this.headQuarterList = resposta;
    })
  }

  validaCampos(): boolean{
    return this.title.valid && this.text.valid &&
    this.headQuarterMatSelected.valid &&  this.reunionDateForm.valid 
    && this.feed.feedVisibility != null
  }

  create(): void{  
    if(this.feed.headQuarter.id != null) {        
        this.feedService.create(this.feed).subscribe(() =>{      
          this.toastr.success('Postagem cadastrada com Sucesso!', 'Cadastro');
          this.router.navigate(['feed']);
        }, ex => {      
          if(ex.error.errors){
            ex.error.errors.array.forEach(element => {
              this.toastr.error(element.message);
              console.log('aqui');
            });
          }else{
            console.log(this.feed.feedVisibility);
            this.toastr.error(ex.error.message);
          }
        });
    }
  }

  addHeadQuarter(headQuarterId: any): void{   
    this.feed.headQuarter.id = headQuarterId;    
  }

  addReunionDate(date: Date): void{
    if(date != null){
    this.feed.reunionDate = date.toLocaleDateString('en-GB', { timeZone: 'UTC' });  
    this.feed.postDate = new Date().toLocaleDateString('en-GB', { timeZone: 'UTC' });      
   }
  }

  visibility(type: string, checked: boolean): void {
    console.log("aqui")
    if (checked) {
      // Se marcou um, desmarca o outro
      this.feed.feedVisibility = type;
  
      if (type === 'PUBLICA') {
        this.publica = true;
        this.restrita = false;
      } else {
        this.publica = false;
        this.restrita = true;
      }
  
    } else {
      // Se desmarcou o atual, marca o oposto automaticamente
      if (type === 'PUBLICA') {
        this.publica = false;
        this.restrita = true;
        this.feed.feedVisibility = 'RESTRITA';
      } else {
        this.publica = true;
        this.restrita = false;
        this.feed.feedVisibility = 'PUBLICA';
      }
    }
  }
}
