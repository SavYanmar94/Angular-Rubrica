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
  @Output() delete = new EventEmitter<number>();

  //costruttore 
  constructor (private contactService:ContactService) {}

  //metodo per selezionare l'autore che si desidera modificare
  selectContactToUpdate(contact:Contact):void
  {
    this.update.emit(contact);
  }

  //metodo per eliminare un autore 
  deleteContact(contactId:number):void{ 
    
    this.contactService.deleteContact(contactId)
    .subscribe({
      next: response => this.delete.emit(contactId),
      error: e => console.log(e.message)
  })
}
}
