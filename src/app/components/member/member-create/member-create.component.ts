import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {MatAccordion} from '@angular/material/expansion';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/models/member';
import { Address } from 'src/app/models/address';
import { MemberService } from 'src/app/services/member.service';
import { AddressService } from 'src/app/services/address.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HeadQuarter } from 'src/app/models/headQuarter';
import { HeadQuarterService } from 'src/app/services/headQuarter.service';
import { DateAdapter, MatDateFormats } from '@angular/material/core';
import { BloodTypeService } from 'src/app/services/bloodType.service';
import { BloodType } from 'src/app/models/bloodType';
import { MatDatepicker } from '@angular/material/datepicker';

@Component({
  selector: 'app-member-create',
  templateUrl: './member-create.component.html',
  styleUrls: ['./member-create.component.css']
})
export class MemberCreateComponent implements OnInit {
   
 
  ELEMENT_DATA_Adress: Address[] = [    ]
  @ViewChild(MatPaginator) paginatorAdress: MatPaginator;
  ELEMENT_DATA_HeadQuarter: HeadQuarter[] = [    ]
  @ViewChild(MatPaginator) paginatorHeadQuarter: MatPaginator;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  
  member: Member = {
    id:'',
    firstName: '',
    lastName: '',
    nickName:  '',
    rg:  '',
    cpf:  '',
    cnh:  '',
    celPhone:  '',
    phone:  '',
    familiarPhone1:  '',
    familiarPhone2:  '',
    email:  '',
    password:  '',
    birthDate:  '',
    admissionDate:  '',
    shutdowDate:  '',    
    imagePath: '',    
    address: {
      logradouro: '',
      number: '',
      postCode: ''
    },
    profile: [],
    headQuarter: {      
     },
    bloodType: {
      description: ''
    }
  }  
  
  //Member fields
  firstName: FormControl = new FormControl(null, Validators.minLength(4)); 
  lastName: FormControl = new FormControl(null, Validators.minLength(4));  
  nickName: FormControl = new FormControl(null, Validators.minLength(4));  
  rg: FormControl = new FormControl(null, Validators.minLength(4));  
  cpf: FormControl = new FormControl(null, Validators.minLength(4));  
  celPhone: FormControl = new FormControl(null, Validators.minLength(4));  
  phone: FormControl = new FormControl(null, Validators.minLength(4));  
  familiarPhone1: FormControl = new FormControl(null, Validators.minLength(4));  
  familiarPhone2: FormControl = new FormControl(null, Validators.minLength(4)); 
  date:  FormControl = new FormControl(null);
  bloodTypeMatSelected: FormControl = new FormControl(null); 
  bloodTypeList: BloodType [];
  
  //Adress fields
  displayedColumnsAddress: string[] = ['position', 'logradouro', 'number', 'city', 'cep','acoes'];
  dataSourceAddress = new MatTableDataSource<Address>(this.ELEMENT_DATA_Adress);  
  addressLogradouro: FormControl = new FormControl(null, Validators.required);
  addressPostCode: FormControl = new FormControl(null, Validators.required);      
  cityName: FormControl = new FormControl(null, Validators.required);    

  //HeadQuarter fields
  headQuarterDescription: FormControl = new FormControl(null, Validators.required);
  displayedColumnsHeadQuarter: string[] = ['position', 'description', 'city', 'acoes'];
  dataSourceHeadQuarter = new MatTableDataSource<HeadQuarter>(this.ELEMENT_DATA_HeadQuarter);  
  headQuarterCity: FormControl = new FormControl(null, Validators.required);
  admissionDate: FormControl = new FormControl(null); 
  shutdowDate: FormControl = new FormControl(null);
  
  //acess fields
  email: FormControl = new FormControl(null, Validators.minLength(4));  
  password: FormControl = new FormControl(null, Validators.minLength(4));  
  
  constructor(
    private addressService: AddressService,
    private headQuarterService: HeadQuarterService,
    private memberService: MemberService,
    private bloodTypeService: BloodTypeService,
    private toastr: ToastrService,
    private router: Router,
    public _adapter: DateAdapter<Date>
  ) {   }
  
  ngOnInit(): void {
    this.findAllAddress();
    this.findAllHeadQuarter();
   this. findAllBloodType();
    this._adapter.setLocale('en-GB');
  }
  
  findAllAddress(){
    this.addressService.findAll().subscribe(resposta =>{
      this.ELEMENT_DATA_Adress = resposta;
      this.dataSourceAddress = new MatTableDataSource<Address>(resposta);
      this.dataSourceAddress.paginator = this.paginatorAdress;
    })
  }
  
  findAllHeadQuarter(){
    this.headQuarterService.findAll().subscribe(resposta =>{
      this.ELEMENT_DATA_HeadQuarter = resposta;     
      this.dataSourceHeadQuarter = new MatTableDataSource<HeadQuarter>(resposta);
      this.dataSourceHeadQuarter.paginator = this.paginatorHeadQuarter;
    })
  }
  findAllBloodType(){
    this.bloodTypeService.findAll().subscribe(resposta =>{
      this.bloodTypeList = resposta;
    })
  }

  validaCampos(): boolean{
    return this.firstName.valid && this.lastName.valid && this.firstName.valid && this.rg.valid &&
    this.cpf.valid && this.celPhone.valid  && this.addressLogradouro.valid &&
    this.headQuarterDescription.valid && this.email.valid && this.password.valid &&    
    this.cityName.valid &&  this.addressPostCode.valid &&  this.headQuarterDescription.valid
  }

  applyFilterAddress(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceAddress.filter = filterValue.trim().toLowerCase();
  }
  applyFilterHeadQuarter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceHeadQuarter.filter = filterValue.trim().toLowerCase();
  }

  create(): void{  
    if(this.member.address.id != null) {
        this.memberService.create(this.member).subscribe(() =>{      
          this.toastr.success('Associado cadastrada com Sucesso!', 'Cadastro');
          this.router.navigate(['member']);
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

  selectAddress(id: any, logradouroNumber : string, cityUf: string, postcode: string): void{   
    this.member.address.id = id;
    this.addressLogradouro.setValue (logradouroNumber);
    this.cityName.setValue(cityUf);
    this.addressPostCode.setValue(postcode);
  }

  clearAddress(): void{
    this.member.address.id = null;
    this.addressLogradouro.setValue ("");
    this.cityName.setValue("");
    this.addressPostCode.setValue("");
  }
  selectHeadQuarter(id: any, description: string, city: string): void{   
    this.member.headQuarter.id = id;
    this.headQuarterDescription.setValue(description);    
    this.headQuarterCity.setValue(city);   
  }
  clearHeadQuarter(): void{
    this.member.headQuarter.id = null;
    this.headQuarterDescription.setValue("");  
    this.headQuarterCity.setValue(""); 
    this.admissionDate.setValue(""); 
    this.shutdowDate.setValue("");
  }
  addBirthDate(date: Date): void{
    if(date != null){
    this.member.birthDate = date.toLocaleDateString('en-GB', { timeZone: 'UTC' });   
    
   }
  }
  addAdmissionDate(date: Date): void{
    if(date != null){
    this.member.admissionDate = date.toLocaleDateString('en-GB', { timeZone: 'UTC' });    
   }
  }
  addShutdowDate(date: Date): void{
    if(date != null){
    this.member.shutdowDate = date.toLocaleDateString('en-GB', { timeZone: 'UTC' });    
   }
  }

  addBloodType(bloodTypeId: any): void{   
    this.member.bloodType.id = bloodTypeId;    
  }
  addPerfil(profile: any): void {
    if(this.member.profile.includes(profile)) {
      this.member.profile.splice(this.member.profile.indexOf(profile), 1);
    } else {
      this.member.profile.push(profile);
    }    
  }
   
}
