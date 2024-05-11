import { Component, OnInit } from '@angular/core';
import { FormControl, NgModel, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HeadQuarter } from 'src/app/models/headQuarter';
import { City } from 'src/app/models/city';
import { Country } from 'src/app/models/country';
import { Uf } from 'src/app/models/uf';
import { HeadQuarterService } from 'src/app/services/headQuarter.service';
import { CityService } from 'src/app/services/city.service';
import { CountryService } from 'src/app/services/country.service';
import { UfService } from 'src/app/services/uf.service';

@Component({
  selector: 'app-headQuarter-update',
  templateUrl: './headQuarter-update.component.html',
  styleUrls: ['./headQuarter-update.component.css']
})
export class HeadQuarterUpdateComponent implements OnInit {

  headQuarter: HeadQuarter = {
    id:'',
    description:'',    
     address: {
       logradouro: '',
       number: '',
       postCode: ''
     }
  }  
  
  countryList: Country [];
  ufList: Uf [];
  cityList: City[];
  description: FormControl = new FormControl(null, Validators.minLength(4));  
  countryMatSelected: FormControl = new FormControl(null);
  ufMatSelected: FormControl = new FormControl(null);
  cityMatSelected: FormControl = new FormControl(null, Validators.required);

  constructor(
    private countryService: CountryService,
    private ufService : UfService,
    private cityService: CityService,
    private headQuarterService: HeadQuarterService,
    private toastr: ToastrService,
    private router: Router,
    private activedRoute : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.countryFindAll();
    this.headQuarter.id = this.activedRoute.snapshot.paramMap.get('id');   
    this.findbyId();  
    //console.log(this.headQuarter.city.name);
  }
  findbyId(): void{
    this.headQuarterService.findById(this.headQuarter.id).subscribe(resposta =>{      
      this.headQuarter = resposta;       
      //this.listMatSelecteds();       
    }) 
  }

  update(): void{   
    this.headQuarterService.update(this.headQuarter).subscribe(() =>{      
      this.toastr.success('Endereço atualizado com Sucesso!', 'Update');
      this.router.navigate(['headQuarter']);
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
    //this.headQuarter.city.id = cityId;    
  }

  validaCampos(): boolean{
    return this.description.valid 
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

