import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Address } from 'src/app/models/address';
import { City } from 'src/app/models/city';
import { AddressService } from 'src/app/services/address.service';

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

  logradouro: FormControl = new FormControl(null, Validators.minLength(4));
  number: FormControl = new FormControl(null, Validators.minLength(1));
  postCode: FormControl = new FormControl(null, Validators.minLength(8));
  addressComplement: FormControl = new FormControl(null);
  city: FormControl = new FormControl(null);

  constructor(
    private service: AddressService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  create(): void{   
    this.service.create(this.address).subscribe(() =>{      
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
    return this.logradouro.valid && this.number.valid && this.postCode.valid 
  }
}
