import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/models/member';
import { MemberService } from 'src/app/services/member.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DateAdapter } from '@angular/material/core';
import { TravelControl } from 'src/app/models/travelControl';
import { TravelControlService } from 'src/app/services/travelControl.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-travelControl-create',
  templateUrl: './travelControl-create.component.html',
  styleUrls: ['./travelControl-create.component.css']
})
export class TravelControlCreateComponent implements OnInit {

  ELEMENT_DATA: Member[] = [    ]
  @ViewChild(MatPaginator) paginator: MatPaginator;

  travelControl: TravelControl = {
    id:'',
    travelDate:'',
    km: 0, 
    departureLocation:'',    
    arrivalLocation:'',
    description:'',
    kmControl:'',
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
  departureLocationForm: FormControl = new FormControl(null, Validators.minLength(4));  
  arrivalLocationform: FormControl = new FormControl(null, Validators.minLength(4));  
  descriptionForm: FormControl = new FormControl(null, Validators.minLength(4));  
  memberName: FormControl = new FormControl(null, Validators.required);
  headQuarter: FormControl = new FormControl(null, Validators.required); 
  travelDateForm: FormControl = new FormControl(null, Validators.required);   
  kmForm: FormControl = new FormControl(null);   
  kmControlMatSelected: FormControl = new FormControl(null, Validators.required); 
  kmcheio: boolean = false;
  meiokm: boolean = false;

  constructor(
    private memberService: MemberService,
    private travelControlService: TravelControlService,
    private toastr: ToastrService,
    private router: Router,
    public _adapter: DateAdapter<Date>,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadMembersAccordingToRole();
    this._adapter.setLocale('en-GB');
    this.KmControl('0', false);
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

  findAllMember(){
    this.memberService.findAll().subscribe(resposta =>{
      this.ELEMENT_DATA = resposta;      
      this.dataSource = new MatTableDataSource<Member>(resposta);
      this.dataSource.paginator = this.paginator;      
    })
  }

  validaCampos(): boolean{
    return this.travelDateForm.valid && this.kmForm.valid && this.departureLocationForm.valid 
     && this.arrivalLocationform.valid && this.descriptionForm.valid && this.memberName.valid
     && this.headQuarter.valid && this.travelControl.kmControl != ''
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  create(): void{  
    if(this.travelControl.member.id != null) {
        this.travelControlService.create(this.travelControl).subscribe(() =>{      
          this.toastr.success('Viagem cadastrada com Sucesso!', 'Cadastro');
          this.router.navigate(['travelControl']);
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

  addTravelDate(date: Date): void{
    if(date != null){
    this.travelControl.travelDate = date.toLocaleDateString('en-GB', { timeZone: 'UTC' });    
   }
  }

  selectMember(id: any, memberName : string, headQuarter: string): void{   
    this.travelControl.member.id = id;
    this.memberName.setValue (memberName);
    this.headQuarter.setValue(headQuarter);    
  }

  clearMember(): void{
    this.travelControl.member.id = null;
    this.memberName.setValue ("");
    this.headQuarter.setValue("");    
  }

  KmControl(type: string, checked: boolean): void {
    if (checked) {
      // Marca o selecionado, desmarca o outro
      this.travelControl.kmControl = type;
  
      if (type === '0') {
        this.kmcheio = true;
        this.meiokm = false;
      } else {
        this.kmcheio = false;
        this.meiokm = true;
      }
  
    } else {
      // Desmarcou? marca automaticamente o oposto
      if (type === '0') {
        this.kmcheio = false;
        this.meiokm = true;
        this.travelControl.kmControl = '1';
      } else {
        this.kmcheio = true;
        this.meiokm = false;
        this.travelControl.kmControl = '0';
      }
    }
  }

}
