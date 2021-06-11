import {
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    ListItemSecondaryAction,
    Typography,
    IconButton
} from '@material-ui/core'
import CheckCircleIcon from '@material-ui/icons/CheckCircleOutlineRounded';
import RemoveIcon from '@material-ui/icons/RemoveCircle';
import { 
    useState,
    useContext,
    Fragment
} from 'react';
import ChatCreatorContext from '../contexts/chatCreatorContext';
import { formatDateString } from '../utils/formatters';

export default ({ contact, context, selectable = false, removable = false }) => {
	const { removeContact, selectContact, selectedContacts } = context;
	const [ selected, setSelected ] = useState(false);

	const toggleContactAndRow = () => {
		!selected ? selectContact(contact) : removeContact(contact);

		setSelected(!selected);
	};

	return (
		<ListItem button onClick={selectable && toggleContactAndRow}>
			<ListItemAvatar>
				<Avatar src={contact.profilePic} />
			</ListItemAvatar>
			<ListItemText
				primary={contact.username}
				secondary={
					<Fragment>
						<Typography component="span" variant="caption" color="textPrimary">
							last seen {formatDateString(contact.lastSeen)}
						</Typography>
					</Fragment>
				}
			/>
			{selected && <RowSelected />}
			{
				removable && !selectable &&
					<ListItemSecondaryAction>
						<IconButton onClick={() => removeContact(contact)} edge="end" aria-label="delete">
							<RemoveIcon />
						</IconButton>
					</ListItemSecondaryAction>
			}
		</ListItem>
	);
};

const RowSelected = () => (
	<ListItemSecondaryAction>
		<IconButton edge="end" aria-label="delete">
			<CheckCircleIcon />
		</IconButton>
	</ListItemSecondaryAction>
);
