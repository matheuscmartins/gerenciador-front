import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/models/member';
import { Address } from 'src/app/models/address';
import { MemberService } from 'src/app/services/member.service';
import { AddressService } from 'src/app/services/address.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HeadQuarter } from 'src/app/models/headQuarter';
import { HeadQuarterService } from 'src/app/services/headQuarter.service';
import { DateAdapter } from '@angular/material/core';
import { BloodTypeService } from 'src/app/services/bloodType.service';
import { BloodType } from 'src/app/models/bloodType';
import { AuthService } from 'src/app/services/auth.service';
import { TravelControl } from 'src/app/models/travelControl';
import { TravelControlService } from 'src/app/services/travelControl.service';

@Component({
  selector: 'app-myProfile-list',
  templateUrl: './myProfile-list.component.html',
  styleUrls: ['./myProfile-list.component.css']
})
export class MyProfileListComponent implements OnInit {

  ELEMENT_DATA_Adress: Address[] = [] 
  ELEMENT_DATA_HeadQuarter: HeadQuarter[] = []  
  ELEMENT_DATA: TravelControl[] = []
  @ViewChild(MatAccordion) accordion: MatAccordion;
  displayedColumns: string[] = ['position', 'travelDate', 'location',  'km', 'kmControl'];
  dataSource = new MatTableDataSource<TravelControl>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator) paginatorTravel: MatPaginator;
  
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
  cnh: FormControl = new FormControl(null, Validators.minLength(4));   
  celPhone: FormControl = new FormControl(null, Validators.minLength(4));  
  phone: FormControl = new FormControl(null, Validators.minLength(4));  
  familiarPhone1: FormControl = new FormControl(null, Validators.minLength(4));  
  familiarPhone2: FormControl = new FormControl(null, Validators.minLength(4)); 
  birthDateForm:  FormControl = new FormControl(null);
  bloodTypeMatSelected: FormControl = new FormControl(null); 
  bloodTypeList: BloodType [];
  birthDateStart: Date;
  panelPersonalOpen = false;
  
  //Adress fields
  displayedColumnsAddress: string[] = ['position', 'logradouro', 'number', 'city', 'cep','acoes'];
  dataSourceAddress = new MatTableDataSource<Address>(this.ELEMENT_DATA_Adress);  
  addressLogradouro: FormControl = new FormControl(null, Validators.required);
  addressPostCode: FormControl = new FormControl(null, Validators.required);      
  cityName: FormControl = new FormControl(null, Validators.required); 
  panelAdressOpen = false;   

  //HeadQuarter fields
  headQuarterDescription: FormControl = new FormControl(null, Validators.required);
  displayedColumnsHeadQuarter: string[] = ['position', 'description', 'city', 'acoes'];
  dataSourceHeadQuarter = new MatTableDataSource<HeadQuarter>(this.ELEMENT_DATA_HeadQuarter);  
  headQuarterCity: FormControl = new FormControl(null, Validators.required);
  admissionDateForm: FormControl = new FormControl(null); 
  shutdowDateForm: FormControl = new FormControl(null);
  admissionDateStart: Date;
  shutdowDateStart: Date;
  panelHeadQuarterOpen = false;  
  
  //travels fields
  now = new Date();
  travelStartDateStart = new Date(this.now.getFullYear(), 0, 1);  
  travelEndDateStart: Date = new Date();
  travelStartDateForm: FormControl = new FormControl(this.travelStartDateStart); 
  travelEndDateForm: FormControl = new FormControl (this.travelEndDateStart);
  panelTravelsOpen = false;

  //acess fields
  email: FormControl = new FormControl(null, Validators.minLength(4));  
  password: FormControl = new FormControl(null, Validators.minLength(4));    
  panelAccessOpen = false;

  constructor( private addressService: AddressService,
    private headQuarterService: HeadQuarterService,
    private memberService: MemberService,
    private bloodTypeService: BloodTypeService,
    private travelControlservice: TravelControlService,
    private toastr: ToastrService,
    private router: Router,
    public _adapter: DateAdapter<Date>,    
    private activedRoute : ActivatedRoute,
    fb: FormBuilder,
    public authService: AuthService
    ) { }

  ngOnInit(): void {
    this._adapter.setLocale('en-GB');
    this.member.id = this.activedRoute.snapshot.paramMap.get('id'); 
    this.findAllBloodType();
    this.bloodTypeMatSelected.disable();
    this.findbyId(); 
    this.findTravelsByMemberId();
  }

  findAllBloodType(){
    this.bloodTypeService.findAll().subscribe(resposta =>{
      this.bloodTypeList = resposta;
    })
  }
  alterarImagem()  {
    console.log("Imagem alterada");
  }
  findbyId(): void{
    this.memberService.findById(this.member.id).subscribe(resposta =>{      
      this.member = resposta;       
      
      var [dia, mes, ano] = this.member.birthDate.split('/');
      this.birthDateStart = new Date(Number(ano), Number(mes) - 1, Number(dia)); 
      this.bloodTypeMatSelected.setValue(this.member.bloodType.id);

      this.selectAddress(this.member.address.id,
      this.member.address.logradouro + " - " + this.member.address.number, 
      this.member.address.city.name + " - " + this.member.address.city.uf.acronym,
      this.member.address.postCode );
      this.selectHeadQuarter(this.member.headQuarter.id, this.member.headQuarter.description,
      this.member.headQuarter.address.city.name);

      [dia, mes, ano] = this.member.admissionDate.split('/');
      this.admissionDateStart = new Date(Number(ano), Number(mes) - 1, Number(dia)); 

      if(this.member.shutdowDate != null){
        [dia, mes, ano] = this.member.shutdowDate.split('/');
        this.shutdowDateStart = new Date(Number(ano), Number(mes) - 1, Number(dia));                
      }
      //this.bringProfiles(); 
    })
  }

  togglePersonal(opened: boolean) {
    this.panelPersonalOpen = opened;
  }

  selectAddress(id: any, logradouroNumber : string, cityUf: string, postcode: string): void{   
    this.member.address.id = id;
    this.addressLogradouro.setValue (logradouroNumber);
    this.cityName.setValue(cityUf);
    this.addressPostCode.setValue(postcode);
  }
  toggleAddress(opened: boolean) {
    this.panelAdressOpen = opened;    
  }

  selectHeadQuarter(id: any, description: string, city: string): void{   
    this.member.headQuarter.id = id;
    this.headQuarterDescription.setValue(description);    
    this.headQuarterCity.setValue(city);   
  }

  toggleHeadQuarter(opened: boolean) {
    this.panelHeadQuarterOpen = opened;
  }
  findTravelsByMemberId(){
    if(this.travelStartDateForm.value != null && this.travelEndDateForm.value != null && this.member.id != null){
      const headQuarterId = this.authService.getHeadQuarterId(); 
      this.travelControlservice.findByMemberIdAndPeriod(this.member.id, this.travelStartDateForm.value.toLocaleDateString('fr-CA'),
          this.travelEndDateForm.value.toLocaleDateString('fr-CA')).subscribe(resposta =>{
          this.ELEMENT_DATA = resposta.sort((a, b) => 
            new Date(b.travelDate).getTime() - new Date(a.travelDate).getTime());
          this.dataSource = new MatTableDataSource<TravelControl>(resposta);
          this.dataSource.paginator = this.paginatorTravel;
        });
    }
  }
  toggleTravels(opened: boolean) {
    this.panelTravelsOpen = opened;    
  }

  toggleAccess(opened: boolean) {
    this.panelAccessOpen = opened;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  validaCampos(): boolean{
    return this.password.valid    
  }  
}
