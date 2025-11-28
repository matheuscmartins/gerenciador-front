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
import { AuthService } from 'src/app/services/auth.service';

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
    private activedRoute : ActivatedRoute,
    private authService: AuthService
  ) { }
  
  ngOnInit(): void {
    this.loadMembersAccordingToRole();
     this._adapter.setLocale('en-GB');
     this.infraction.id = this.activedRoute.snapshot.paramMap.get('id'); 
     this.findbyId();  
  }
  loadMembersAccordingToRole(): void { 
    if (this.authService.hasAnyRole(['ROLE_ADMIN', 'ROLE_COMANDO'])) {
      this.findAllMember();
      return;
    }

    const headQuarterId = this.authService.getHeadQuarterId();    
    console.log(headQuarterId);
    this.memberService.findByHeadQuarterId(headQuarterId).subscribe(resposta =>{
      this.ELEMENT_DATA = resposta.sort((a, b) => 
      new Date(b.firstName).getTime() - new Date(a.firstName).getTime());
      this.dataSource = new MatTableDataSource<Member>(resposta);
      this.dataSource.paginator = this.paginator;
      })  
  }

  findbyId(): void{
    this.infractionService.findById(this.infraction.id).subscribe(resposta =>{      
      this.infraction = resposta;
      var [dia, mes, ano] = this.infraction.infractionDate.split('/');
      this.infractionDateStart = new Date(Number(ano), Number(mes) - 1, Number(dia)); 
      
      this.selectMember(this.infraction.member.id, this.infraction.member.firstName + 
        ' - ' + this.infraction.member.lastName, this.infraction.member.headQuarter.description)
        this.infractionType( this.infraction.infractionType, true); 
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
    
  infractionType(type: string, checked: boolean): void {
    const types = ['ESCRITA', 'SUSPENSAO', 'VERBAL', 'DESLIGAMENTO', 'REBAIXAMENTO', 'EXPULSAO'];
  
    if (checked) {
      // Marca apenas o selecionado, desmarca todos os outros
      this.infraction.infractionType = type;
      types.forEach(t => this[t.toLowerCase()] = (t === type));
  
    } else {
      // Se desmarcou VERBAL → marca ESCRITA
      if (type === 'VERBAL') {
        this.infraction.infractionType = 'ESCRITA';
        types.forEach(t => this[t.toLowerCase()] = (t === 'ESCRITA'));
      } else {
        // Se desmarcou qualquer outro → marca VERBAL
        this.infraction.infractionType = 'VERBAL';
        types.forEach(t => this[t.toLowerCase()] = (t === 'VERBAL'));
      }
    }
  }
  
}
