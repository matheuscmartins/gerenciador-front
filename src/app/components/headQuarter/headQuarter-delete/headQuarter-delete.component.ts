import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HeadQuarterService } from 'src/app/services/headQuarter.service';


@Component({
  selector: 'app-headQuarter-delete',
  templateUrl: './headQuarter-delete.component.html',
  styleUrls: ['./headQuarter-delete.component.css']
})
export class HeadQuarterDeleteComponent  {
  
  message: string = ""
  confirmButtonText = ""
  cancelButtonText = ""
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<HeadQuarterDeleteComponent>,
    private headQuarterService: HeadQuarterService,
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
     
      this.headQuarterService.delete(this.data.id).subscribe(() =>{      
        this.toastr.success('Sede Removida com Sucesso!', 'Delete');
        this.dialogRef.close(true);
        this.router.navigate(['headQuarter']);
      }, ex => {      
        if(ex.error.errors){
          ex.error.errors.array.forEach(element => {
            this.toastr.error(element.message);
            this.router.navigate(['headQuarter']);
          });
        }else{
          this.toastr.error(ex.error.message);
          this.router.navigate(['headQuarter']);
        }
      });
  } 

  onCancelClick(): void{
    this.dialogRef.close(true);
    this.toastr.success('Cancelado com Sucesso!', 'Cancel');
      this.router.navigate(['headQuarter']);
  }
}
