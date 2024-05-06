import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AddressService } from 'src/app/services/address.service';


@Component({
  selector: 'app-address-delete',
  templateUrl: './address-delete.component.html',
  styleUrls: ['./address-delete.component.css']
})
export class AddressDeleteComponent  {
  
  message: string = ""
  confirmButtonText = ""
  cancelButtonText = ""
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<AddressDeleteComponent>,
    private addressService: AddressService,
    private toastr: ToastrService,
    private router: Router,
    ) {
      if(data){
    this.message = data.message || this.message;
    if (data.buttonText) {
      this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
      this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
    }
      }
  }

  onConfirmClick(): void {
     
      this.addressService.delete(this.data.id).subscribe(() =>{      
        this.toastr.success('Endereço Removido com Sucesso!', 'Delete');
        this.dialogRef.close(true);
        this.router.navigate(['address']);
      }, ex => {      
        if(ex.error.errors){
          ex.error.errors.array.forEach(element => {
            this.toastr.error(element.message);
            this.router.navigate(['address']);
          });
        }else{
          this.toastr.error(ex.error.message);
          this.router.navigate(['address']);
        }
      });
  } 

  onCancelClick(): void{
    this.dialogRef.close(true);
    this.toastr.success('Cancelado com Sucesso!', 'Cancel');
      this.router.navigate(['address']);
  }
}
