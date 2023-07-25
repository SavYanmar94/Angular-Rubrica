import { Component,Input, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Contact } from 'src/app/model/contact';
import { ContactService } from 'src/app/service/contact.service';

@Component({
  selector: 'app-delete-popup',
  templateUrl: './delete-popup.component.html',
  styleUrls: ['./delete-popup.component.css']
})
export class DeletePopupComponent {

  constructor(private contactService: ContactService) { }

  //attributi 
  //attributi
  @Input() isVisible: boolean = false;
  @Output() leave = new EventEmitter();
  @Input() contact:Contact | undefined;
  @Output() delete = new EventEmitter<number>();
  confirmPopupVisible: boolean = false;
  @Input() contactsChild:Contact[] | undefined; 

  confirmFormContacts(form:NgForm): void
  {
    if(this.contact)
    this.deleteContact()
    this.closeConfirmPopup(form)
  } 

  //metodo per chiudere popup
  closeConfirmPopup(form:NgForm): void 
  {
    this.leave.emit();
  }

  //chiudo popup dopo cancellazione
  deleteContactandDeactivatePopup(contact: Contact): void
  {
    this.confirmPopupVisible = false;
    this.deleteContact()
  }

  //metodo per cancellare contatto
  deleteContact(): void
  {
    this.contactService.deleteContact(this.contact?.id!) //uso costruttore per chiamare metodo in cui ci passo identificatore
      .subscribe ({
        next: response => this.delete.emit(this.contact?.id!),
        error: e => console.log(e.message)
      })
      
  }


}
