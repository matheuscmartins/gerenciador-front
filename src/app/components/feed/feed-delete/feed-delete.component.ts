import { Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FeedService } from 'src/app/services/feed.service';

@Component({
  selector: 'app-feed-delete',
  templateUrl: './feed-delete.component.html',
  styleUrls: ['./feed-delete.component.css']
})
export class FeedDeleteComponent  {

  message: string = ""
  confirmButtonText = ""
  cancelButtonText = ""
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<FeedDeleteComponent>,
    private feedService: FeedService,
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
    this.feedService.delete(this.data.id).subscribe(() =>{      
        this.toastr.success('Postagem Removida com Sucesso!', 'Delete');
        this.dialogRef.close(true);
        this.router.navigate(['feed']);
      }, ex => {      
        if(ex.error.errors){
          ex.error.errors.array.forEach(element => {
            this.toastr.error(element.message);
            this.router.navigate(['feed']);
          });
        }else{
          this.toastr.error(ex.error.message);
          this.router.navigate(['feed']);
        }
    });
  } 

  onCancelClick(): void{
    this.dialogRef.close(true);
    this.toastr.success('Cancelado com Sucesso!', 'Cancel');
    this.router.navigate(['feed']);
  }
}
