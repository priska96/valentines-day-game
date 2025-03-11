import { CircularProgress } from '@mui/material';
import styles from '../stylesApp.module.css';

const LoadingIndicator = () => {
    return (
        <div className={styles.startGameButtonContainer}>
            <CircularProgress color="inherit" /> Loading game assets...
        </div>
    );
};

export default LoadingIndicator;
