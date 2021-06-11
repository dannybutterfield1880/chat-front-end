import { useState } from 'react';

import { get } from '../utils/axios'

const useAuthContextValue = () => {
    const [user, setUser] = useState({});
    const [token, setToken] = useState(null);
    const [contacts, setContacts] = useState([]);

    const loadContacts = async (token) => {
        const results = await get('/contacts', token)
        setContacts(results)
    }
    
    return { 
        token, setToken, 
        user, setUser,
        contacts, setContacts, loadContacts
    }
}

export default useAuthContextValue;