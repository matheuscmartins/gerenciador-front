import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TravelControlService } from 'src/app/services/travelControl.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-travelControl-delete',
  templateUrl: './travelControl-delete.component.html',
  styleUrls: ['./travelControl-delete.component.css']
})
export class TravelControlDeleteComponent  {

  message: string = ""
  confirmButtonText = ""
  cancelButtonText = ""
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<TravelControlDeleteComponent>,
    private travelControlService: TravelControlService,
    private toastr: ToastrService,
    private router: Router
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
    this.travelControlService.delete(this.data.id).subscribe(() =>{      
        this.toastr.success('Viagem Removida com Sucesso!', 'Delete');
        this.dialogRef.close(true);
        this.router.navigate(['travelControl']);
      }, ex => {      
        if(ex.error.errors){
          ex.error.errors.array.forEach(element => {
            this.toastr.error(element.message);
            this.router.navigate(['travelControl']);
          });
        }else{
          this.toastr.error(ex.error.message);
          this.router.navigate(['travelControl']);
        }
    });
  } 

  onCancelClick(): void{
    this.dialogRef.close(true);
    this.toastr.success('Cancelado com Sucesso!', 'Cancel');
    this.router.navigate(['travelControl']);
  }
  
}
