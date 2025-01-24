import { inject, Injectable } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ConfirmDialogComponent } from '../modal/confirm-dialog/confirm-dialog.component';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {
  static confirm(): import("@angular/router").MaybeAsync<import("@angular/router").GuardResult> {
    throw new Error('Method not implemented.');
  }
  bsModalRef?: BsModalRef;
  private modalService = inject(BsModalService);

  confirm(
    title = 'Confirmation',
    message = 'Are you sure you want to do this?',
    btnOkText = 'OK',
    btnCancelText = 'Cancel'
  ){
    const config: ModalOptions = {
      initialState: {
        title,
        message,
        btnOkText,
        btnCancelText
      }
    };
    this.bsModalRef = this.modalService.show(ConfirmDialogComponent, config);
    return this.bsModalRef.onHidden?.pipe(
      map(() => {
        if (this.bsModalRef?.content) {
          return this.bsModalRef.content.result;
        } else {
          return false;
        }
      })
    )
  }
}
