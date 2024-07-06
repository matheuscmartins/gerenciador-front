import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RoleDuty } from 'src/app/models/roleDuty';
import { Member } from 'src/app/models/member';
import { RoleDutyService } from 'src/app/services/roleDuty.service';
import { MemberService } from 'src/app/services/member.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-role-duty-update',
  templateUrl: './role-duty-update.component.html',
  styleUrls: ['./role-duty-update.component.css']
})
export class RoleDutyUpdateComponent implements OnInit {

  ELEMENT_DATA: Member[] = [    ]
  @ViewChild(MatPaginator) paginator: MatPaginator;

  roleDuty: RoleDuty = {
    id:'',
    roleName:'',
    startDate:'',
    endDate:'',
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
    roleName: FormControl = new FormControl(null, Validators.minLength(4));  
    memberName: FormControl = new FormControl(null, Validators.required);
    headQuarter: FormControl = new FormControl(null, Validators.required); 
    startDateForm: FormControl = new FormControl(null, Validators.required); 
    endDateForm: FormControl = new FormControl(null); 
    startDateStart: Date;
    endDateStart: Date;

  constructor(
    private memberService: MemberService,
    private roleDutyService: RoleDutyService,
    private toastr: ToastrService,
    private router: Router,
    public _adapter: DateAdapter<Date>,
    private activedRoute : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.findAllMember();
     this._adapter.setLocale('en-GB');
     this.roleDuty.id = this.activedRoute.snapshot.paramMap.get('id'); 
     this.findbyId();  
  }

  findbyId(): void{
    this.roleDutyService.findById(this.roleDuty.id).subscribe(resposta =>{      
      this.roleDuty = resposta;
      var [dia, mes, ano] = this.roleDuty.startDate.split('/');
      this.startDateStart = new Date(Number(ano), Number(mes) - 1, Number(dia)); 
      
      if(this.roleDuty.endDate != null){
        [dia, mes, ano] = this.roleDuty.endDate.split('/');
        this.endDateStart = new Date(Number(ano), Number(mes) - 1, Number(dia));                
      }

      this.selectMember(this.roleDuty.member.id, this.roleDuty.member.firstName + 
        ' - ' + this.roleDuty.member.lastName, this.roleDuty.member.headQuarter.description)        
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
    return this.roleName.valid && this.memberName.valid &&
    this.headQuarter.valid ;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  update(): void{  
    if(this.roleDuty.member.id != null) {
        this.roleDutyService.update(this.roleDuty).subscribe(() =>{      
          this.toastr.success('Cargo atualizado com Sucesso!', 'Update');
          this.router.navigate(['roleDuty']);
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

  addStartDate(date: Date): void{
    if(date != null){
    this.roleDuty.startDate = date.toLocaleDateString('en-GB', { timeZone: 'UTC' });    
   }
  }

  addEndDate(date: Date): void{
    if(date != null){
    this.roleDuty.endDate = date.toLocaleDateString('en-GB', { timeZone: 'UTC' });    
   }
  }

  clearEndDate():void{
    this.roleDuty.endDate = null;
    this.endDateForm.setValue("");
  }

  selectMember(id: any, memberName : string, headQuarter: string): void{   
    this.roleDuty.member.id = id;
    this.memberName.setValue (memberName);
    this.headQuarter.setValue(headQuarter);    
  }

  clearMember(): void{
    this.roleDuty.member.id = null;
    this.memberName.setValue ("");
    this.headQuarter.setValue("");    
  }

}
