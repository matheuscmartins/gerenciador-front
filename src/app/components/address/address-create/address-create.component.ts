import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Address } from 'src/app/models/address';
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
    city:[]
  }

  logradouro: FormControl = new FormControl(null, Validators.minLength(4));
  number: FormControl = new FormControl(null, Validators.minLength(1));
  postCode: FormControl = new FormControl(null, Validators.minLength(8));
  addressComplement: FormControl = new FormControl(null);
  city: FormControl = new FormControl(null, Validators.required);

  constructor(
    private service: AddressService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  create(): void{
    this.service.create(this.address).subscribe(() =>{
      this.toastr.success('Endereço cadastrado com Sucesso!', 'Cadastro');
    }, ex =>{
      console.log(ex);
    });
  }
  addCity(city: any): void{
    this.address.city.push(city)
  }

  validaCampos(): boolean{
    return this.logradouro.valid && this.number.valid && this.postCode.valid 
  }
}
