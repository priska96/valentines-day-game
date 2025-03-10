import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Backdrop from '@mui/material/Backdrop';
import DialogContentText from '@mui/material/DialogContentText';
import './dialog.css';
import { useRootStore } from '@/store/useRootStore';
import { DialogActionEnum } from '@/store/enums';

function SimpleDialog() {
    const { dialog } = useRootStore();
    const { open, title, text, action } = dialog;

    const update = (
        e: React.MouseEvent<HTMLElement, MouseEvent> | undefined
    ) => {
        if (!e) return;
        const x = e.clientX;
        const y = e.clientY;
        document
            .getElementById('darkFun')
            ?.style.setProperty('--cursorX', x + 'px');
        document
            .getElementById('darkFun')
            ?.style.setProperty('--cursorY', y + 'px');
    };
    const message = () => {
        if (action === DialogActionEnum.VIDEO) {
            return (
                <video height="400" controls>
                    <source src={text} type="video/mp4" />
                </video>
            );
        }
        if (action === DialogActionEnum.PHOTO) {
            return (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: 500,
                        alignItems: 'center',
                    }}
                >
                    <img
                        style={{ height: '100%' }}
                        src={text}
                        alt="specia-reward"
                    />

                    <Backdrop
                        id="darkFun"
                        open={open}
                        onMouseMove={update}
                        //onClick={() => props.closeDoorModal(false)}
                    ></Backdrop>
                </div>
            );
        }
        return <DialogContentText>{text}</DialogContentText>;
    };
    return (
        <Dialog
            open={open}
            fullWidth
            sx={{
                '& .MuiDialog-container .MuiPaper-root.MuiDialog-paper': {
                    backgroundColor: 'rgba(19, 28, 106, 0.6)',
                    '& h2, p': {
                        color: 'white',
                    },
                    '& p': {
                        fontSize: ' 1.5em',
                        padding: '12px',
                    },
                },
            }}
        >
            <DialogTitle>{title}</DialogTitle>
            {message()}
        </Dialog>
    );
}

export default SimpleDialog;
