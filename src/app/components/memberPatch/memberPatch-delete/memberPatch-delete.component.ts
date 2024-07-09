import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MemberPatchService } from 'src/app/services/memberPatch.service';

@Component({
  selector: 'app-memberPatch-delete',
  templateUrl: './memberPatch-delete.component.html',
  styleUrls: ['./memberPatch-delete.component.css']
})
export class MemberPatchDeleteComponent  {

  message: string = ""
  confirmButtonText = ""
  cancelButtonText = ""

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<MemberPatchDeleteComponent>,
    private memberPatchervice: MemberPatchService,
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
    this.memberPatchervice.delete(this.data.id).subscribe(() =>{      
      this.toastr.success('Graduação Removida com Sucesso!', 'Delete');
      this.dialogRef.close(true);
      this.router.navigate(['memberPatch']);
    }, ex => {      
      if(ex.error.errors){
        ex.error.errors.array.forEach(element => {
          this.toastr.error(element.message);
          this.router.navigate(['memberPatch']);
        });
      }else{
        this.toastr.error(ex.error.message);
        this.router.navigate(['memberPatch']);
      }
    });
  } 

  onCancelClick(): void{
    this.dialogRef.close(true);
    this.toastr.success('Cancelado com Sucesso!', 'Cancel');
    this.router.navigate(['memberPatch']);
  }
}
