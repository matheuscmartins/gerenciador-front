import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Infraction } from 'src/app/models/infraction';
import { Member } from 'src/app/models/member';
import { InfractionService } from 'src/app/services/infraction.service';
import { MemberService } from 'src/app/services/member.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DateAdapter } from '@angular/material/core';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-infraction-create',
  templateUrl: './infraction-create.component.html',
  styleUrls: ['./infraction-create.component.css']
})
export class InfractionCreateComponent implements OnInit {  

  ELEMENT_DATA: Member[] = [    ]
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
  infractionDateForm: FormControl = new FormControl(null, Validators.required); 
  escrita: boolean = false;
  suspensao: boolean = false;
  verbal: boolean = true;
  desligamento: boolean = false;
  rebaixamento: boolean = false;
  expulsao: boolean = false;

  constructor(
    private memberService: MemberService,
    private infractionService: InfractionService,
    private toastr: ToastrService,
    private router: Router,
    public _adapter: DateAdapter<Date>
  ) { }
  
  ngOnInit(): void {
    this.findAllMember();
     this._adapter.setLocale('en-GB');
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
    this.headQuarter.valid &&  this.headQuarter.valid && this.infractionDateForm.valid && this.infraction.infractionType != null
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  create(): void{  
    if(this.infraction.member.id != null) {
        this.infractionService.create(this.infraction).subscribe(() =>{      
          this.toastr.success('Advertência cadastrada com Sucesso!', 'Cadastro');
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
    console.log(checked);
    console.log(infractionType);
    if(infractionType != null && checked){
      switch (infractionType) {        
        case '0':
          this.infraction.infractionType = infractionType;
          this.escrita= true;
          this.suspensao = false;
          this.verbal = false;
          this.desligamento = false;
          this.rebaixamento = false;
          this.expulsao = false;
          break;
        case '1':
          this.infraction.infractionType = infractionType;
          this.escrita= false;
          this.suspensao = true;
          this.verbal = false;
          this.desligamento = false;
          this.rebaixamento = false;
          this.expulsao = false;
          break;
          case '2':
          this.infraction.infractionType = infractionType;
          this.escrita= false;
          this.suspensao = false;
          this.verbal = true;
          this.desligamento = false;
          this.rebaixamento = false;
          this.expulsao = false;
          break;
          case '3':
          this.infraction.infractionType = infractionType;
          this.escrita= false;
          this.suspensao = false;
          this.verbal = false;
          this.desligamento = true;
          this.rebaixamento = false;
          this.expulsao = false;
          break;
          case '4':
          this.infraction.infractionType = infractionType;
          this.escrita= false;
          this.suspensao = false;
          this.verbal = false;
          this.desligamento = false;
          this.rebaixamento = true;
          this.expulsao = false;
          break;
          case '5':
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
