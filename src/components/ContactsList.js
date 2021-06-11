import styled from 'styled-components'
import { List } from '@material-ui/core'
import contactSampleData from '../sample-data/contacts'
import ContactListItem from './ContactListItem';

const StyledList = styled(List)`
    overflow-y: scroll;
    //position: absolute !important;
    height: 100%;
    width: 100%;
`;

export default ({ selectable = false, removable = false, context, contacts = contactSampleData, absolute = false }) => {
    let ListElement = StyledList;
    // if (absolute) {
    //     ListElement = styled(StyledList)`
    //         position: absolute !important;
    //     `
    // }
    
    return (
        <ListElement style={{ position: absolute ? 'absolute !important' : 'inherit' }}>
            {contacts.map((contact) => <ContactListItem removable={removable} selectable={selectable} context={context} key={contact._id} contact={contact} />)}
            <div style={{ height: '250px' }} />
        </ListElement>
    );
};