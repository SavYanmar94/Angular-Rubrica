import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from 'src/app/model/contact';
import { ContactService } from 'src/app/service/contact.service';

@Component({
  selector: 'app-contacts-table',
  templateUrl: './contacts-table.component.html',
  styleUrls: ['./contacts-table.component.css']
})
export class ContactsTableComponent {

  @Input() contactsChild:Contact[]|undefined;
  @Output() update = new EventEmitter <Contact>()
  @Output() delete = new EventEmitter<Contact>();
  @Input() isVisible: boolean = false;

  //costruttore 
  constructor (private contactService:ContactService) {}

  //metodo per selezionare l'autore che si desidera modificare
  selectContactToUpdate(contact:Contact):void
  {
    this.update.emit(contact);
  }


openConfirmPopup(contact:Contact): void
  {
    this.delete.emit(contact);
  }

}
