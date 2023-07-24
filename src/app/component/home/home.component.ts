import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/model/contact';
import { ContactService } from 'src/app/service/contact.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  contacts: Contact[] | undefined; // Lista di contatti
  serverError: any; // Variabile per gestire eventuali errori dal server
  contactsFormPopupVisible: boolean = false; // Variabile per gestire la visibilità del popup del form dei contatti
  contactToUpdate: Contact | undefined; // Contatto selezionato per la modifica

  constructor(private contactService: ContactService) { }

  // Inizializzazione del componente
  ngOnInit(): void {
    // Chiamata al servizio per ottenere la lista di contatti
    this.contactService.getContacts()
      .subscribe({
        next: response => this.contacts = response, // Assegna la risposta alla lista di contatti
        error: e => this.serverError = e.message // Gestione degli errori, in caso di errore viene assegnato il messaggio di errore alla variabile serverError
      })
  }

  // Metodo per attivare il popup del form per i contatti
  activateContactFormPopup(): void {
    this.contactsFormPopupVisible = true;
  }

  // Metodo per disattivare il popup del form per i contatti
  deactivateContactFormPopup(): void {
    this.contactToUpdate = undefined; // Resettare il contatto selezionato per la modifica
    this.contactsFormPopupVisible = false;
  }

  // Metodo chiamato quando viene registrato un nuovo contatto e si desidera chiudere il popup del form
  addNewContactAndDeactivatePopup(contact: Contact): void {
    this.contactsFormPopupVisible = false;
    if (this.contacts) // Verifica che la lista di contatti sia definita
      this.contacts.push(contact); // Aggiunge il nuovo contatto alla lista di contatti
  }

  // Metodo per attivare il popup del form per la modifica di un contatto esistente
  activateContactFormPopupandUpdate(contact: Contact): void {
    this.contactToUpdate = contact; // Assegna il contatto selezionato per la modifica alla variabile contactToUpdate
    this.contactsFormPopupVisible = true; // Attiva il popup del form
  }

  // Metodo per gestire la cancellazione di un contatto
  deleteContact(contactId: number): void {
    if (this.contacts) {
      // Cerca l'indice del contatto da eliminare all'interno della lista di contatti
      let index = this.contacts.findIndex(a => a.id == contactId);
      // Elimina il contatto dalla lista utilizzando l'indice trovato
      this.contacts.splice(index, 1);
    }
  }
}
