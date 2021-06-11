import { Fragment } from 'react';
import {
	Slide,
	Paper,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Typography,
	Avatar,
	IconButton,
	List,
	ListItemSecondaryAction
} from '@material-ui/core';
import { useState, useContext } from 'react';
import styled from 'styled-components';
import CloseIcon from '@material-ui/icons/CloseRounded';
import { FixedButton } from './Button';
import ChatCreatorContext from '../contexts/chatCreatorContext';
import { useHistory } from 'react-router';
import ContactsList from './ContactsList';
import useClickEvent from '../effects/useClickEvent';

const StyledCloseIcon = styled(CloseIcon)`
    cursor: pointer;
`;

const SlideUpPaper = ({ open, setSlideUpOpen, children, title = 'Dialog' }) => {
	const history = useHistory();

	const handleClickOut = () => {
		setSlideUpOpen(false)
	}

	const clickEvent = useClickEvent({
		handleClickOut
	});

	return (
		<Slide ref={clickEvent} timeout={200} direction="up" in={open} mounstOnEnter unmountOnExit>
			<Paper
				elevation={4}
				style={{
					zIndex: 1,
					position: 'relative',
					height: '96vh',
					position: 'fixed',
					width: '100%',
					bottom: '-30px',
					// borderRadius: '2em',
					// left: '2%'
				}}
				boxshadow={3}
				position="bottom"
			>
				<div>
					{/* <svg className={classes.svg}>
                        <polygon points="0,100 50,00, 100,100" className={classes.polygon} />
                        </svg> */}
					<div
						style={{
							padding: '0 1em',
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center'
						}}
					>
						<h4>{title}</h4>
						<IconButton onClick={() => setSlideUpOpen(false)}>
							<StyledCloseIcon />
						</IconButton>
					</div>
					{children}
				</div>
			</Paper>
		</Slide>
	);
};

export default SlideUpPaper;
