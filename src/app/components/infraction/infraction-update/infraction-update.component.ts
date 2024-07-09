import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Infraction } from 'src/app/models/infraction';
import { Member } from 'src/app/models/member';
import { InfractionService } from 'src/app/services/infraction.service';
import { MemberService } from 'src/app/services/member.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-infraction-update',
  templateUrl: './infraction-update.component.html',
  styleUrls: ['./infraction-update.component.css']
})
export class InfractionUpdateComponent implements OnInit {

  ELEMENT_DATA: Member[] = [ ]
  @ViewChild(MatPaginator) paginator: MatPaginator;

  infraction: Infraction = {
    id:'',
    description:'',
    infractionDate:'',
    infractionType: '',
    member:{
      firstName: '',
      lastName: '',
      nickName: '',
      rg: '',
      cpf: '',
      cnh: '',
      celPhone: '',
      phone: '',
      familiarPhone1: '',
      familiarPhone2: '',
      email: '',
      password: '',
      birthDate: '',
      admissionDate: '',
      shutdowDate: '',
      imagePath: '',
      profile: [],
      bloodType: {
        description: ''
      }
    }
    }    
  
  displayedColumns: string[] = ['position', 'firstName', 'lastName', 'nickName', 'headQuarter','acoes'];  
  dataSource = new MatTableDataSource<Member>(this.ELEMENT_DATA);
  description: FormControl = new FormControl(null, Validators.minLength(4));  
  memberName: FormControl = new FormControl(null, Validators.required);
  headQuarter: FormControl = new FormControl(null, Validators.required); 
  infractionDateForm: FormControl = new FormControl(null); 
  infractionDateStart: Date;
  escrita: boolean = false;
  suspensao: boolean = false;
  verbal: boolean = false;
  desligamento: boolean = false;
  rebaixamento: boolean = false;
  expulsao: boolean = false;

  constructor(
    private memberService: MemberService,
    private infractionService: InfractionService,
    private toastr: ToastrService,
    private router: Router,
    public _adapter: DateAdapter<Date>,
    private activedRoute : ActivatedRoute
  ) { }
  
  ngOnInit(): void {
    this.findAllMember();
     this._adapter.setLocale('en-GB');
     this.infraction.id = this.activedRoute.snapshot.paramMap.get('id'); 
     this.findbyId();  
  }

  findbyId(): void{
    this.infractionService.findById(this.infraction.id).subscribe(resposta =>{      
      this.infraction = resposta;
      var [dia, mes, ano] = this.infraction.infractionDate.split('/');
      this.infractionDateStart = new Date(Number(ano), Number(mes) - 1, Number(dia)); 
      
      this.selectMember(this.infraction.member.id, this.infraction.member.firstName + 
        ' - ' + this.infraction.member.lastName, this.infraction.member.headQuarter.description)
        this.infractionType(true, this.infraction.infractionType); 
      })
  }

  findAllMember(){
    this.memberService.findAll().subscribe(resposta =>{
      this.ELEMENT_DATA = resposta;      
      this.dataSource = new MatTableDataSource<Member>(resposta);
      this.dataSource.paginator = this.paginator;      
    })
  }

  validaCampos(): boolean{
    return this.description.valid && this.memberName.valid &&
    this.headQuarter.valid  && this.infraction.infractionType != null;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  update(): void{  
    if(this.infraction.member.id != null) {
        this.infractionService.update(this.infraction).subscribe(() =>{      
          this.toastr.success('Advertência atualizada com Sucesso!', 'Update');
          this.router.navigate(['infraction']);
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

  addInfractionDate(date: Date): void{
    if(date != null){
    this.infraction.infractionDate = date.toLocaleDateString('en-GB', { timeZone: 'UTC' });    
   }
  }
  
  selectMember(id: any, memberName : string, headQuarter: string): void{   
    this.infraction.member.id = id;
    this.memberName.setValue (memberName);
    this.headQuarter.setValue(headQuarter);    
  }

  clearMember(): void{
    this.infraction.member.id = null;
    this.memberName.setValue ("");
    this.headQuarter.setValue("");    
  }
    
  infractionType(checked: boolean, infractionType: string): void{
    if(infractionType != null && checked){
      switch (infractionType) {        
        case 'ESCRITA':
          this.infraction.infractionType = infractionType;
          this.escrita= true;
          this.suspensao = false;
          this.verbal = false;
          this.desligamento = false;
          this.rebaixamento = false;
          this.expulsao = false;
          break;
        case 'SUSPENSAO':
          this.infraction.infractionType = infractionType;
          this.escrita= false;
          this.suspensao = true;
          this.verbal = false;
          this.desligamento = false;
          this.rebaixamento = false;
          this.expulsao = false;
          break;
          case 'VERBAL':
          this.infraction.infractionType = infractionType;
          this.escrita= false;
          this.suspensao = false;
          this.verbal = true;
          this.desligamento = false;
          this.rebaixamento = false;
          this.expulsao = false;
          break;
          case 'DESLIGAMENTO':
          this.infraction.infractionType = infractionType;
          this.escrita= false;
          this.suspensao = false;
          this.verbal = false;
          this.desligamento = true;
          this.rebaixamento = false;
          this.expulsao = false;
          break;
          case 'REBAIXAMENTO':
          this.infraction.infractionType = infractionType;
          this.escrita= false;
          this.suspensao = false;
          this.verbal = false;
          this.desligamento = false;
          this.rebaixamento = true;
          this.expulsao = false;
          break;
          case 'EXPULSAO':
          this.infraction.infractionType = infractionType;
          this.escrita= false;
          this.suspensao = false;
          this.verbal = false;
          this.desligamento = false;
          this.rebaixamento = false;
          this.expulsao = true;
          break;   
      }
    }
      if(!checked){
        if(this.verbal){
          this.infraction.infractionType = null;
      }else {this.infraction.infractionType = '0';}
          this.escrita= false;
          this.suspensao = false;
          this.verbal = true;
          this.desligamento = false;
          this.rebaixamento = false;
          this.expulsao = false;
      }
  }
}
