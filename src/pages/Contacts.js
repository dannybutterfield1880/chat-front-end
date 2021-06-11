import { useHistory } from 'react-router';
import ContactsList from '../components/ContactsList';
import Padding from '../components/Padding';
import styled from 'styled-components'
import FormPaper from '../components/FormPaper';
import { del, get, post } from '../utils/axios'
import React, {
    useContext,
    useState,
    useEffect
} from 'react'
import AuthContext from '../contexts/authContext';


import ContactsContext from '../contexts/contactsContext'
import { IconButton } from '@material-ui/core';
import SlideUpPaper from '../components/SlideUpPaper';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { PROFILE_PIC } from '../components/style-constants';
import ScrollToTop from '../components/ScrollToTop';

const MyDialog = ({ onAccept, onCancel, open = false, text }) => {

    return (
     <Dialog
        open={open}
        onClose={onCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{`Add ${text}?`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={onAccept} color="primary" autoFocus>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    )
}

const Contacts = () => {   
    const [selectedContact, setSelectedContact] = useState(null);
    const [ slideUpOpen, setSlideUpOpen ] = useState(false);
    const { token, contacts, loadContacts } = useContext(AuthContext);

    const selectContact = (contact) => {
        setSelectedContact(contact);
        setSlideUpOpen(false);        
    }

    const removeContact = async (contact) => {
        await del(`/contacts/${contact._id}`, token);  
        loadContacts(token)
    }

    const addNewContact = async () => {
        await post('/contacts', { contactToAdd: selectedContact._id }, token)
        setSelectedContact(null);
        loadContacts(token)
    }

    return (
        <ContactsContext.Provider value={{
            selectContact,
            removeContact,
            slideUpOpen, 
            setSlideUpOpen
        }}>
            <ScrollToTop />
            <ContactsContextWrapper contacts={contacts} />
            <MyDialog 
                text={selectedContact && selectedContact.username}
                contact={selectedContact}
                onAccept={() => addNewContact()}
                onCancel={() => setSelectedContact(null)} 
                open={(selectedContact) ? true : false }
            />
        </ContactsContext.Provider>
    )
}

const ContactsContextWrapper = ({ contacts }) => {
    const context = useContext(ContactsContext);
    const { token } = useContext(AuthContext);
    const [ searchedUsers, setSearchedUsers ] = useState([]);
    const [ searchValue, setSearchValue ] = useState('');

    const searchUsers = async () => {
        const results = await post('/users', { search: searchValue }, token);
        setSearchedUsers(results)
    }

    const {
        slideUpOpen, 
        setSlideUpOpen
    } = context

    return (
        <div>
            <FormPaper rounded={false} style={{ minHeight: '100vh' }}>
                <Padding>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'spaceBetween',
                        width: '100%',
                        alignItems: 'center',
                        textAlign: 'center'
                    }}>
                        <h2 style={{ flex: '0 0 88%' }}>Contacts</h2>
                        <IconButton onClick={() => setSlideUpOpen(!slideUpOpen)} style={{  width: '2.2em' }}>
                            <span style={{ flex: '0 0 20%' }}>+</span>
                        </IconButton>
                    </div>
                </Padding>
                <ContactsList selectable={false} removable={true} contacts={contacts} context={context} />
                <SlideUpPaper title={"Add a contact"} open={slideUpOpen} setSlideUpOpen={setSlideUpOpen}>
                    <Padding>
                        <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
                        <Button fullWidth variant="contained" color="primary" onClick={() => searchUsers()}>Search</Button>
                    </Padding>
                    <ContactsList selectable={true} context={context} contacts={searchedUsers} />
                </SlideUpPaper>
                <MyDialog />
            </FormPaper>
        </div>
    )
}

const TextInput = styled.input`
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    color: black;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
`;

const SearchBar = React.memo(({ searchValue, setSearchValue }) => {

    return <TextInput 
        value={searchValue} 
        onChange={e => setSearchValue(e.target.value)} 
        type={'text'} 
        placeholer={'search'}
    />
})

export default Contacts;