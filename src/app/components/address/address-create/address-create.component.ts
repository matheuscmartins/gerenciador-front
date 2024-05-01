import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-address-create',
  templateUrl: './address-create.component.html',
  styleUrls: ['./address-create.component.css']
})
export class AddressCreateComponent implements OnInit {

  logradouro: FormControl = new FormControl(null, Validators.minLength(4));
  number: FormControl = new FormControl(null, Validators.minLength(1));
  postCode: FormControl = new FormControl(null, Validators.minLength(8));
  complement: FormControl = new FormControl(null);

  constructor() { }

  ngOnInit(): void {
  }

  validaCampos(): boolean{
    return this.logradouro.valid && this.number.valid && this.postCode.valid 
  }
}
