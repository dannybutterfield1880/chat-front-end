import {
    createContext,
} from 'react';

const CONTACTS_CONTEXT = {
    selectedContacts: [],
    setSelectedContacts: () => {},
    removeContact: () => {},
    selectContact: () => {},
    selectedContacts: () => {}
  };
  
const ContactsContext = createContext({});

export default ContactsContext