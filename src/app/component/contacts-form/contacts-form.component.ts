import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Contact } from 'src/app/model/contact';
import { ContactService } from 'src/app/service/contact.service';

@Component({
  selector: 'app-contacts-form',
  templateUrl: './contacts-form.component.html',
  styleUrls: ['./contacts-form.component.css']
})
export class ContactsFormComponent {
  @Input() isVisible: boolean = false; // Proprietà di input per controllare la visibilità del form
  @Output() leave = new EventEmitter(); // Evento emesso quando si lascia il form
  @Output() create = new EventEmitter<Contact>(); // Evento emesso quando si crea un nuovo contatto
  serverError: any; // Variabile per gestire eventuali errori dal server
  @Input() contact: Contact | undefined; // Contatto in input da modificare nel form

  constructor(private contactService: ContactService) {}

  // Gestore del form quando viene sottomesso
  formManager(form: NgForm): void {
    console.log(form.value);

    // Se un contatto è presente, effettua l'aggiornamento del contatto
    if (this.contact) {
      this.updateContact(form);
    } else {
      // Altrimenti, crea un nuovo contatto
      this.createContact(form);
    }
  }

  // Metodo per lasciare il form
  leaveContactForm(form: NgForm): void {
    form.reset(); // Resettare il form
    this.leave.emit(); // Emettere l'evento 'leave' per notificare al componente padre che si sta lasciando il form
  }

  // Metodo per creare un nuovo contatto e registrarlo
  createContact(form: NgForm): void {
    let cell = (form.value['cell'] as string).startsWith('+')
      ? form.value['cell']
      : '+39' + form.value['cell'];

    // Creazione dell'oggetto 'contact' con i dati inseriti nel form
    let contact: Contact = {
      name: form.value['name'], // Nome del contatto
      lastname: form.value['lastname'], // Cognome del contatto
      email: form.value['email'], // Indirizzo email del contatto
      cell: cell // Numero di cellulare del contatto
    };

    // Chiamata al servizio per creare il contatto sul server
    this.contactService.createContact(contact).subscribe({
      next: response => {
        form.reset(); // Resettare il form dopo la creazione del contatto
        this.create.emit(response); // Emettere l'evento 'create' per notificare al componente padre che un nuovo contatto è stato creato
      },
      error: e => (this.serverError = 'Problemi con il server') // Gestione degli errori durante la chiamata al server
    });
  }

  // Metodo per aggiornare un contatto esistente
  updateContact(form: NgForm): void {
    if (this.contact) {
      let cell = (form.value['cell'] as string).startsWith('+')
        ? form.value['cell']
        : '+39' + form.value['cell'];

      // Aggiornamento dei dati del contatto con quelli inseriti nel form
      this.contact.name = form.value['name'];
      this.contact.lastname = form.value['lastname'];
      this.contact.email = form.value['email'];
      this.contact.cell = cell;

      // Chiamata al servizio per aggiornare il contatto sul server
      this.contactService.updateContact(this.contact).subscribe({
        next: response => {
          form.reset(); // Resettare il form dopo l'aggiornamento del contatto
          this.leave.emit(); // Emettere l'evento 'leave' per notificare al componente padre che si sta lasciando il form
        },
        error: e => (this.serverError = 'Problemi con il server') // Gestione degli errori durante la chiamata al server
      });
    }
  }
}

