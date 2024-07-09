import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InfractionService } from 'src/app/services/infraction.service';


@Component({
  selector: 'app-infraction-delete',
  templateUrl: './infraction-delete.component.html',
  styleUrls: ['./infraction-delete.component.css']
})
export class InfractionDeleteComponent {

  message: string = ""
  confirmButtonText = ""
  cancelButtonText = ""

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<InfractionDeleteComponent>,
    private infractionService: InfractionService,
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
        this.infractionService.delete(this.data.id).subscribe(() =>{      
          this.toastr.success('Advertência Removida com Sucesso!', 'Delete');
          this.dialogRef.close(true);
          this.router.navigate(['infraction']);
        }, ex => {      
          if(ex.error.errors){
            ex.error.errors.array.forEach(element => {
              this.toastr.error(element.message);
              this.router.navigate(['infraction']);
            });
          }else{
            this.toastr.error(ex.error.message);
            this.router.navigate(['infraction']);
          }
        });
    } 
  
    onCancelClick(): void{
      this.dialogRef.close(true);
      this.toastr.success('Cancelado com Sucesso!', 'Cancel');
      this.router.navigate(['infraction']);
    }

}
