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
    headQuarter: {      
    }
  }

  headQuarterMatSelected: FormControl = new FormControl(null, Validators.required); 
  headQuarterList: HeadQuarter [];
  reunionDateForm: FormControl = new FormControl(null, Validators.required); 
  title: FormControl = new FormControl(null, Validators.minLength(4)); 
  text: FormControl = new FormControl(null, Validators.minLength(4)); 
  
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
  }

  findAllHeadQuarter(){
    this.headQuarterService.findAll().subscribe(resposta =>{
      this.headQuarterList = resposta;
    })
  }

  validaCampos(): boolean{
    return this.title.valid && this.text.valid &&
    this.headQuarterMatSelected.valid &&  this.reunionDateForm.valid 
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
            });
          }else{
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
    console.log(this.feed.postDate);
   }
  }

}
