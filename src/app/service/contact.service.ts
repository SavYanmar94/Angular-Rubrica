import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../model/contact';
import { HttpClient } from '@angular/common/http';

const CONTACTS_GET_API:string = "http://localhost:3000/contacts";
const CONTACTS_POST_API:string = "http://localhost:3000/contacts";
const CONTACTS_PUT_API:string = "http://localhost:3000/contacts";
const CONTACTS_DELETE_API:string = "http://localhost:3000/contacts";
// perchè il nostro db si chiama contacts 

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  // iniettiamo la dipendenza HttpClient
  constructor(private http:HttpClient) { }
  // perchè il nostro server da li va a prendere le cose , il get , il post e il put , delete 

  // metodo per ottenere la lista dei contatti 
  public getContacts():Observable<Contact[]> {  // contact[] perchè mi serve sapere tutta la tabella
    return this.http.get<Contact[]>(CONTACTS_GET_API);
}

 //metodo per registrare un nuovo contatto
 public createContact(contact:Contact):Observable<Contact>{//ci deve restituire un json
  return this.http.post<Contact>(CONTACTS_POST_API, contact);
}

// metodo per aggiornare i dati di un contatto esistente
public updateContact(contact:Contact):Observable<Contact> {

  return this.http.put<Contact>(`${CONTACTS_PUT_API}/${contact.id}`,contact);

}
// metodo per cancellare i dati di un contatto esistente
public deleteContact(contactId:number):Observable<Contact>
{
  return this.http.delete<Contact>(`${CONTACTS_DELETE_API}/${contactId}`);

}

}
