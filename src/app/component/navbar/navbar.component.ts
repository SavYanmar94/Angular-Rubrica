import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  @Output() contactsFormPopup = new EventEmitter();

  // attivazione popup form autore invocato al click del link della navbar
  activateContactFormPopup():void {  //questo metodo deve emettere l'evento
    this.contactsFormPopup.emit();   //emit è un metodo di typescript che emette l'evento
    
  }

}
