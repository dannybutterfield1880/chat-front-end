import {
    createContext,
} from 'react';

const CHAT_CREATOR_CONTEXT = {
  removeContact: () => {},
  selectContact: () => {},
  selectedContacts: () => {}
};
  
const ChatCreatorContext = createContext(CHAT_CREATOR_CONTEXT);

export default ChatCreatorContext