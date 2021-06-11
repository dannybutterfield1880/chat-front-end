import { Fragment } from 'react'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'

const HeaderList = styled.ul`
    list-style: none;
    padding: 0;
    display: flex;
    justify-content: space-around;
`

const HeaderListItem = styled.li`
    padding: 0 0.7em;
`

const Wrapper = ({ children, isLoggedIn, setToken }) => {
    const history = useHistory();

    return (
        <HeaderList>
            <HeaderListItem>
                <Link to='/'>Home</Link>
            </HeaderListItem>
    
            {
                isLoggedIn 
                ?
                    <Fragment>
                        <HeaderListItem>
                            <Link to="/contacts">Contacts</Link>
                        </HeaderListItem>
                        <HeaderListItem>
                            <a href="#" onClick={() => {
                                setToken(null)
                                history.push('/login')
                            }}>Logout</a>
                        </HeaderListItem>
                    </Fragment>
                    
                :
                    <HeaderListItem>
                        <Link to='/login'>Login</Link>
                    </HeaderListItem>    
                    
            }
        </HeaderList>
    )
}

export default Wrapper;