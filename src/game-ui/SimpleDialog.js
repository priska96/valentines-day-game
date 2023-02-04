import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContentText from '@mui/material/DialogContentText';
import {setContents} from "./slices/dialogSlice";
import {connect} from "react-redux";
import {fireAction} from "../tile-view/slices/npcSlice";
import {fireAction as fireActionObject} from "../tile-view/slices/objectSlice"
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


function SimpleDialog({dialog, npc, objectNPC, setContents, fireAction}) {
    const {open, title, text} = dialog

    const handleClose = () => {
        const openerId = dialog.openerId;
        setContents({open: false, title: '', text: '', openerId: ''});
        if (openerId.startsWith("object-")) {
            fireActionObject({id: openerId});
        } else {
            fireAction();
        }
    };


    return (
        <GameUIDialog onClose={handleClose} open={open} fullWidth>
            <DialogTitle>{title}</DialogTitle>
            <DialogContentText>
                {text}
            </DialogContentText>
        </GameUIDialog>
    );
}

const mapStateToProps = ({dialog, npc, objectNPC}) => ({dialog, npc, objectNPC});

const mapDispatch = {fireAction, setContents};

export default connect(mapStateToProps, mapDispatch)(SimpleDialog);