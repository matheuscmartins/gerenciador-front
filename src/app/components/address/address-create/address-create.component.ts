import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Address } from 'src/app/models/address';
import { City } from 'src/app/models/city';
import { Country } from 'src/app/models/country';
import { Uf } from 'src/app/models/uf';
import { AddressService } from 'src/app/services/address.service';
import { CityService } from 'src/app/services/city.service';
import { CountryService } from 'src/app/services/country.service';
import { UfService } from 'src/app/services/uf.service';

@Component({
  selector: 'app-address-create',
  templateUrl: './address-create.component.html',
  styleUrls: ['./address-create.component.css']
})

export class AddressCreateComponent implements OnInit {  

  address: Address = {
    id:'',
    logradouro:'',
    number:'',
    addressComplement:'',
    postCode:'',
    city: { }
  }  
  
  countryList: Country [];
  ufList: Uf [];
  cityList: City[];
  logradouro: FormControl = new FormControl(null, Validators.minLength(4));
  number: FormControl = new FormControl(null, Validators.minLength(1));
  postCode: FormControl = new FormControl(null, Validators.minLength(8));
  addressComplement: FormControl = new FormControl(null);  
  countryMatSelected: FormControl = new FormControl(null);
  ufMatSelected: FormControl = new FormControl(null);
  cityMatSelected: FormControl = new FormControl(null, Validators.required);

  constructor(
    private countryService: CountryService,
    private ufService : UfService,
    private cityService: CityService,
    private addressService: AddressService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.countryFindAll();
  }

  create(): void{   
    this.addressService.create(this.address).subscribe(() =>{      
      this.toastr.success('Endereço cadastrado com Sucesso!', 'Cadastro');
      this.router.navigate(['address']);
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

  addCity(cityId: any): void{   
    this.address.city.id = cityId;    
  }

  validaCampos(): boolean{
    return this.logradouro.valid && this.number.valid 
    && this.postCode.valid && this.cityMatSelected.valid
  }

  countryFindAll(){
    this.countryService.findAll().subscribe(resposta =>{       
     this.countryList = resposta 
    })
  }

  ufFindByCountryId(countryId: any ){
    if(countryId!= null){
    this.ufService.findByContryId(countryId).subscribe(resposta =>{     
     this.ufList = resposta      
      })
    }
  }
  cityFindByUfId(ufId: any ){
    if(ufId!= null){
    this.cityService.findByUfId(ufId).subscribe(resposta =>{     
     this.cityList = resposta 
     })
    }
  }
}
