import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContentText from '@mui/material/DialogContentText';
import {connect} from "react-redux";
import {styled} from "@mui/material";


export const GameUIDialog = styled(Dialog)`
	// & .MuiDialog-container {
	//     padding: 200px 0 0 0;
	// }
	& .MuiDialog-container .MuiPaper-root.MuiDialog-paper {
	    background-color: rgba(19, 28, 106, 0.6);
	    & h2, p{
	        color: white;
	    }
	    & p{
	        font-size: 1.5em;
	    }
	}
`;


function SimpleDialog({dialog}) {
    const {open, title, text} = dialog

    return (
        <GameUIDialog  open={open} fullWidth>
            <DialogTitle>{title}</DialogTitle>
            <DialogContentText>
                {text}
            </DialogContentText>
        </GameUIDialog>
    );
}

const mapStateToProps = ({dialog}) => ({dialog});

export default connect(mapStateToProps)(SimpleDialog);