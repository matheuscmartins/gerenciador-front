import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HeadQuarter } from 'src/app/models/headQuarter';
import { Address } from 'src/app/models/address';
import { HeadQuarterService } from 'src/app/services/headQuarter.service';
import { AddressService } from 'src/app/services/address.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-headQuarter-create',
  templateUrl: './headQuarter-create.component.html',
  styleUrls: ['./headQuarter-create.component.css']
})

export class HeadQuarterCreateComponent implements OnInit {  

  ELEMENT_DATA: Address[] = [    ]
  @ViewChild(MatPaginator) paginator: MatPaginator;

  headQuarter: HeadQuarter = {
    id:'',
    description:'',
    address: {
      logradouro: '',
      number: '',
      postCode: ''
    }
  }  
  
  displayedColumns: string[] = ['position', 'logradouro', 'number', 'city', 'cep','acoes'];
  dataSource = new MatTableDataSource<Address>(this.ELEMENT_DATA);
  description: FormControl = new FormControl(null, Validators.minLength(4));  
  addressLogradouro: FormControl = new FormControl(null, Validators.required);
  addressPostCode: FormControl = new FormControl(null, Validators.required);      
  cityName: FormControl = new FormControl(null, Validators.required);      
  
  constructor(
    private addressService: AddressService,
    private headQuarterService: HeadQuarterService,
    private toastr: ToastrService,
    private router: Router,
  ) { }
  
  ngOnInit(): void {
    this.findAllAddress();
  }
  
  findAllAddress(){
    this.addressService.findAll().subscribe(resposta =>{
      this.ELEMENT_DATA = resposta;      
      this.dataSource = new MatTableDataSource<Address>(resposta);
      this.dataSource.paginator = this.paginator;
      console.log(resposta);
    })
  }

  validaCampos(): boolean{
    return this.description.valid && this.addressLogradouro.valid &&
    this.cityName.valid &&  this.addressPostCode.valid
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  create(): void{  
    if(this.headQuarter.address.id != null) {
        this.headQuarterService.create(this.headQuarter).subscribe(() =>{      
          this.toastr.success('Sede cadastrada com Sucesso!', 'Cadastro');
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
  }

  selctAddress(id: any, logradouroNumber : string, cityUf: string, postcode: string): void{   
    this.headQuarter.address.id =id;
    this.addressLogradouro.setValue (logradouroNumber);
    this.cityName.setValue(cityUf);
    this.addressPostCode.setValue(postcode);
  }

  clearAddress(): void{
    this.headQuarter.address.id = null;
    this.addressLogradouro.setValue ("");
    this.cityName.setValue("");
    this.addressPostCode.setValue("");
  }  
}
