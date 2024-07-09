import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MemberPatch } from 'src/app/models/memberPatch';
import { Member } from 'src/app/models/member';
import { MemberPatchService } from 'src/app/services/memberPatch.service';
import { MemberService } from 'src/app/services/member.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DateAdapter } from '@angular/material/core';
import { PatchService } from 'src/app/services/patch.service';
import { Patch } from 'src/app/models/patch';

@Component({
  selector: 'app-memberPatch-update',
  templateUrl: './memberPatch-update.component.html',
  styleUrls: ['./memberPatch-update.component.css']
})
export class MemberPatchUpdateComponent implements OnInit {

  ELEMENT_DATA: Member[] = [    ]
  @ViewChild(MatPaginator) paginator: MatPaginator;

  memberPatch: MemberPatch = {
    id:'',
    description:'',
    admissionDate:'',   
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
    }, 
    patch:{
      name: ''
    }
  }  

  displayedColumns: string[] = ['position', 'firstName', 'lastName', 'nickName', 'headQuarter','acoes'];
  dataSource = new MatTableDataSource<Member>(this.ELEMENT_DATA);
  description: FormControl = new FormControl(null, Validators.minLength(4));  
  memberName: FormControl = new FormControl(null, Validators.required);
  headQuarter: FormControl = new FormControl(null, Validators.required); 
  admissionDateForm: FormControl = new FormControl(null);   
  patchMatSelected: FormControl = new FormControl(null, Validators.required); 
  patchList: Patch [];
  admissionDateStart: Date;

  constructor(
    private memberService: MemberService,
    private memberPatchService: MemberPatchService,
    private patchService: PatchService,
    private toastr: ToastrService,
    private router: Router,
    public _adapter: DateAdapter<Date>,
    private activedRoute : ActivatedRoute,
    fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.findAllPatch();
    this.findAllMember();
     this._adapter.setLocale('en-GB');
    this.memberPatch.id = this.activedRoute.snapshot.paramMap.get('id'); 
    this.findbyId();   
  }
  findbyId(): void{
    this.memberPatchService.findById(this.memberPatch.id).subscribe(resposta =>{      
      this.memberPatch = resposta;  
      var [dia, mes, ano] = this.memberPatch.admissionDate.split('/');
      this.admissionDateStart = new Date(Number(ano), Number(mes) - 1, Number(dia)); 
      this.patchMatSelected.setValue(this.memberPatch.patch.id);
      this.selectMember(this.memberPatch.member.id, this.memberPatch.member.firstName + 
        ' - ' + this.memberPatch.member.lastName, this.memberPatch.member.headQuarter.description)
    }) 
  }
  findAllPatch(){
    this.patchService.findAll().subscribe(resposta =>{
      this.patchList = resposta;
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
    this.headQuarter.valid &&  this.headQuarter.valid && this.patchMatSelected.valid
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  addPatch(patchId: any): void{   
    this.memberPatch.patch.id = patchId;    
  }

  addAdmissionDate(date: Date): void{
    if(date != null){
    this.memberPatch.admissionDate = date.toLocaleDateString('en-GB', { timeZone: 'UTC' });    
   }
  }

  selectMember(id: any, memberName : string, headQuarter: string): void{   
    this.memberPatch.member.id = id;
    this.memberName.setValue (memberName);
    this.headQuarter.setValue(headQuarter);    
  }

  clearMember(): void{
    this.memberPatch.member.id = null;
    this.memberName.setValue ("");
    this.headQuarter.setValue("");    
  }

  update(): void{  
    if(this.memberPatch.member.id != null) {
        this.memberPatchService.update(this.memberPatch).subscribe(() =>{      
          this.toastr.success('Graduação atualizada com Sucesso!', 'Update');
          this.router.navigate(['memberPatch']);
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
