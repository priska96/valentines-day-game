import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContentText from '@mui/material/DialogContentText';
import {connect} from "react-redux";
import {styled} from "@mui/material";

export const GameUIDialog = styled(Dialog)`
	& .MuiDialog-container .MuiPaper-root.MuiDialog-paper {
	    background-color: rgba(19, 28, 106, 0.6);
	    & h2, p{
	        color: white;
	    }
	    & p{
	        font-size: 1.5em;
	        padding: 12px;
	    }
	}
`;


function SimpleDialog({dialog}) {
    const {open, title, text,action} = dialog

    const message = () => {
        if(action ==='video'){
            return(<video height="400" controls>
                    <source src={text} type="video/mp4"/>
                </video>
            )
        }
        return (<DialogContentText>{text}</DialogContentText>)
    }


    return (
        <GameUIDialog  open={open} fullWidth>
            <DialogTitle>{title}</DialogTitle>
                {message()}
        </GameUIDialog>
    );
}

const mapStateToProps = ({dialog}) => ({dialog});

export default connect(mapStateToProps)(SimpleDialog);