import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContentText from '@mui/material/DialogContentText';
import {connect, ConnectedProps} from "react-redux";
//import {styled} from "@mui/material";
import {RootState} from "../store";
//
// export const GameUIDialog = styled(Dialog)(`
// 	& .MuiDialog-container .MuiPaper-root.MuiDialog-paper {
// 	    background-color: rgba(19, 28, 106, 0.6);
// 	    & h2, p{
// 	        color: white;
// 	    }
// 	    & p{
// 	        font-size: 1.5em;
// 	        padding: 12px;
// 	    }
// 	}
// `) as typeof Dialog


function SimpleDialog({dialog}:PropsFromRedux) {
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
console.log("open", open)

    return (
        <Dialog
            open={open}
            fullWidth
            sx={{
                '& .MuiDialog-container .MuiPaper-root.MuiDialog-paper': {
                    backgroundColor: "rgba(19, 28, 106, 0.6)",
                        "& h2, p":{
                            color: "white"
                        },
                        "& p":{
                        "fontSize":" 1.5em",
                        "padding": "12px"
	                    }
	            }
            }}
        >
            <DialogTitle>{title}</DialogTitle>
                {message()}
        </Dialog>
    );
}

const mapStateToProps = ({dialog}: RootState) => ({dialog});

const connector = connect(mapStateToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(SimpleDialog);