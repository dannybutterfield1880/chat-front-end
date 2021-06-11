import { Button, Paper } from '@material-ui/core'
import {
    useEffect,
    useContext,
    useState
} from 'react'
import useDebounce from '../effects/useDebounce'
import { post, get, del } from '../utils/axios'
import { useHistory, useParams } from 'react-router'
import { PusherContext } from '../App'
import Padding from '../components/Padding'
import styled from 'styled-components'
import useInput from '../effects/useInput'
import AuthContext from '../contexts/authContext'
import { scrollDown } from '../utils/window'

const Message = ({ message }) => {
    const { user } = useContext(AuthContext);
    const isMine = message.sender._id === user._id
    return (
        <Paper style={{ 
            background: isMine ? 'rgb(158 169 230)' : 'white', 
            marginBottom: '0.5em', 
            padding: '0.5em',
            width: '80%',
            float: isMine ? 'right' : 'left'
        }}>{message.sender.username + ' - ' + message.messageBody}</Paper>
    )
}

const Chat = () => {
    const { id } = useParams()
    const { pusher } = useContext(PusherContext)
    const { token, user } = useContext(AuthContext)
    const [ messages, setMessages ] = useState([])
    const history = useHistory()
    const [ sendDisabled, setSendDisabled ] = useState(true);
    const [ usersTyping, setUsersTyping ] = useState([]);
    const [ typing, setTyping ] = useState(false)
    const [ typingTimeout, setTypingTimeout ] = useState(0)
    var throttleTime = 200; //0.2 seconds
    const toggleTyping = async (typing = true) => {
        await post(`/user-typing`, {
            username: user.username,
            chatId: id,
            typing
        }, token)
    }

    const [ messageValue, messageInput, setMessageValue ] = useInput({ 
        type: 'text', 
        placeholder: 
        'type a message...', 
        variant: "flat",
        outline: "none",
        onChangeCallback: (value) => {
            (value.length > 0) ? setSendDisabled(false) : setSendDisabled(true)
            if (!usersTyping.includes(user.username)) {
                toggleTyping(true);
                setTyping(true)
            }
            if (value.length <= 0) {
                toggleTyping(false)
                setTyping(false)
            }
           
        },
        onPressEnter: () => {
            !sendDisabled && sendMessage();
        }
    })

    const debouncedMessageValue = useDebounce(messageValue, 2000);


    useEffect(() => {
        loadMessages()
    }, [])

    // Here's where the API call happens
  // We use useEffect since this is an asynchronous action
  useEffect(
        () => {
        // Make sure we have a value (user has entered something in input)
            if (debouncedMessageValue) {
                // Set isSearching state
                console.log('stopped')
                if (messageValue.length <= 0) {
                    setTyping(false);
                    toggleTyping(false);
                }
                

                //MAKE API CALL TO REMOVE USER FROM TYPING


                // Fire off our API call
                //searchCharacters(debouncedSearchTerm).then(results => {
                // Set back to false since request finished
                //setIsSearching(false);
                // Set results state
                //setResults(results);
                
            } /* else {
                setResults([]);
            } */
        },
        // This is the useEffect input array
        // Our useEffect function will only execute if this value changes ...
        // ... and thanks to our hook it will only change if the original ...
        // value (searchTerm) hasn't changed for more than 500ms.
        [debouncedMessageValue]
    );

    useEffect(() => {
        var channel = pusher.subscribe(`messages-${id}`);

        const receiveNewMessage = (data) => {
            console.log('new message', data)
            setMessages([
                ...messages,
                data
            ])
            scrollDown()
        }

        channel.bind('new-message', receiveNewMessage);
        return () => {
            channel.unbind('new-message')
        }
    }, [messages])

    console.log(usersTyping)

    useEffect(() => {
        var channel = pusher.subscribe(`${id}-typing`);

        const receiveTypingStarted = (data) => {
            console.log('user typing', data)
            // setMessages([
            //     ...messages,
            //     data
            // ])
            // scrollDown()
            setUsersTyping([
                ...usersTyping,
                data.username
            ])
        }

        const receiveTypingEnded = (data) => {
            const filteredUsersTyping = removeUserFromTypingList(usersTyping, data)  

            setUsersTyping(filteredUsersTyping)
        }

        channel.bind('typing-started', receiveTypingStarted);
        channel.bind('typing-stopped', receiveTypingEnded);
        return () => {
            channel.unbind(`${id}-typing`)
        }
    }, [messageValue])

    const removeUserFromTypingList = (users, userToRemove) => {
        return users.filter((username) => {
            return userToRemove.username !== username
        })
    }

    const loadMessages = async () => {
        const response = await get(`/chats/${id}`, token)
    
        setMessages(response);
        scrollDown()
    }

    const sendMessage = async () => {
        await post(`/chats/${id}`, {
            messageBody: messageValue
        }, token);

        setMessageValue("")
        setSendDisabled(true)
        setTyping(false)
        toggleTyping(false)

        setUsersTyping([])
    }


    return (
        <div className="chat-container" style={{ overflow: 'hidden', paddingTop: '7em' }}>
            <Padding style={{ position: 'relative', bottom: "60px" }}>
                <Button color="secondary" variant="text" onClick={async () => {
                    await del(`/chats/${id}`, token);
                    history.push('/')
                }}>delete chat</Button>
                {
                    messages.map((message, i) => (
                        <Message message={message} key={i} />
                    ))
                }
                {
                    usersTyping.length > 0 && <p>{usersTyping.map((user) => user)} is typing...</p>
                }
            </Padding>
            <MessageSection>
                { messageInput }
                <Button 
                    style={{
                        lineHeight: '2.1em',
                        borderRadius: 0
                    }} 
                    variant="contained" 
                    color="primary" 
                    onClick={sendMessage}
                    disabled={sendDisabled}
                >Send</Button>
            </MessageSection>
        </div>
    )
}

const MessageSection = styled.section`
    display: flex;
    position: fixed;
    bottom: 0;
    align-items: center;
    width: 100%;
    background: white;
`

export default Chat;