import { Link, useHistory } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import Button, { FixedButton } from '../components/Button'
import AuthContext from '../contexts/authContext'
import { get, post } from '../utils/axios'
import styled from 'styled-components'
import {
    Fragment
} from 'react'
import moment from 'moment'
import { 
    List,
    Paper, 
    ListItem, 
    ListItemAvatar, 
    ListItemText, 
    Typography,
    Avatar,
    Grow
} from '@material-ui/core'
import SlideUpPaper from '../components/SlideUpPaper'
import { PROFILE_PIC } from '../components/style-constants'
import Padding from '../components/Padding'
import useClickEvent from '../effects/useClickEvent'
import ChatCreatorContext from '../contexts/chatCreatorContext'
import ContactsList from '../components/ContactsList'
import { formatDateString } from '../utils/formatters'
import ScrollToTop from '../components/ScrollToTop'

const ChatRow = ({ show = true, chat }) => (
    <Grow timeout={400} in={show} >
        <Link to={`/chat/${chat._id}`}>
                    <Paper elevation={4} style={{ padding: '0.2em', margin: '0.3em 0' }}>
                    {
                    !chat.lastMessage.sender
                        ? (
                            <List>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar src=""/>
                                    </ListItemAvatar>  
                                    <ListItemText
                                        primary="No messages"
                                        secondary={
                                            <Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                color="textPrimary"
                                            
                                                >
                                                -
                                            </Typography>
                                    </Fragment>
                                }
                            />                      
                                </ListItem>
                            </List>
                        )
                        : (
                        <List>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar src={chat.lastMessage.sender.profilePic}/>
                                </ListItemAvatar>  
                                <ListItemText
                                    primary={chat.lastMessage.messageBody}
                                    secondary={
                                        <Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            color="textPrimary"
                                        
                                            >
                                            { chat.lastMessage.sender.username }
                                        </Typography>
                                        </Fragment>
                            }
                        />                      
                            </ListItem>
                        </List>
                         )
                        }
                    </Paper>
            
        </Link>
    </Grow>
)


const Section = styled.section`
    padding-top: 0.5em;
    display: flex;
    flex-direction: column;
    margin-bottom: 1em;
`

const ChatHome = () => {
    let hash = window.location.hash;

    const [ slideUpOpen, setSlideUpOpen ] = useState(false);
    const [ chats, setChats ] = useState([]);

    const history = useHistory();

    const auth = useContext(AuthContext)
    const { token, user, contacts } = auth;

    const [ selectedContacts, setSelectedContacts ] = useState([]);

	const selectContact = async (contactToAdd) => {
		let selectedContactsSet = new Set(selectedContacts);
		selectedContactsSet.add(contactToAdd);
		setSelectedContacts([ ...selectedContactsSet ]);
	};

	const removeContact = (contactToRemove) => {
		const filteredContacts = selectedContacts.filter((contact) => contact._id !== contactToRemove._id);
		setSelectedContacts(filteredContacts);
	};

	const startChat = async () => {
		/**
         * notes:
         * 
         * here we will need to create a chat for
         * the logged in user then open this chat
         * 
         * this chat will only be visible to the creator at this point
         * once the creator sends the first message the message will appear to 
         * all contacts involved
         * 
         * we can check isClean to test if the chat has had a message or not
         * 
         * a trigger will also need to be created when a message
         * is sent to notify users
         * 
        */

		//make call to API to create chat will selected contacts

        const response = await post('/chats', {
            selectedContacts: selectedContacts.map((contact) => contact._id),
            name: 'newChat1'
        }, token);
        
        history.push(`/chat/${response.newChatId}`);
        setSlideUpOpen(false);
		//history.push('/chat/new-chat-id') new-chat-id will be returned for the API after creating a chat
	};


    useEffect(() => {
        /**
         *
         * notes: 
         * we will need to subscribe to an 
         * event listener here to check for updates to the
         * chat then unsubscribe in the returned function
         *  
         */
        if (token) {
            loadMyChats();
        }

        return () => {
        }
    }, [])

    const loadMyChats = async () => {
        const response = await get('/chats', token)
    
        setChats(response);
    }

    if (!token) {
        return <Padding><p>Please log in to continue</p></Padding>
    }

    return (
        <div className="chat-container">
            <ScrollToTop />
            <FixedButton position="bottom" style={{ marginTop: '0.3em' }} variant="contained" color="primary" onClick={() => setSlideUpOpen(!slideUpOpen)}>New Chat</FixedButton>
            <Padding>
                <Section>
                    <p>{user.username} <small style={{ color: 'grey' }}>last seen {formatDateString(user.lastSeen)}</small></p>
                    {
                        chats.map((chat, key) => (
                            <ChatRow chat={chat} key={key}/>
                        ))
                    }
                </Section>
            </Padding>
            <SlideUpPaper title={"Choose a contact:"} open={slideUpOpen} setSlideUpOpen={setSlideUpOpen}>
                <ChatCreatorContext.Provider
                    value={{
                        removeContact,
                        selectContact,
                        selectedContacts
                    }}
                >
                    <ChatContactPickerWrapper contacts={contacts} />
                    {selectedContacts.length > 0 && <FixedButton onClick={() => startChat()}>Next</FixedButton>}
                </ChatCreatorContext.Provider>    
            </SlideUpPaper>
        </div>
    )
}

const ChatContactPickerWrapper = ({ contacts }) => {
	const context = useContext(ChatCreatorContext);

	return (
		<div>
			<ContactsList selectable={true} absolute={true} contacts={contacts} context={context} />
		</div>
	)
}

export default ChatHome;