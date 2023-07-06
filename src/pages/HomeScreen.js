import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HomeScreen.module.css';
import curtainImage from '../images/curtain.png'

const HomeScreen = () => {
    const navigate = useNavigate();

    const handleStartButtonClick = () => {
        navigate('/configure');
    };

    return (
        <div className={styles.container}>
            <div className={styles.encloser}>
                <div className={styles.content}>
                    <h1 className={styles.title}>Welcome to Our Website</h1>
                    <p className={styles.description}>Explore and Discover New Things</p>
                </div>
                <div className={styles.imageContainer}>
                    <img src={curtainImage} alt="Curtain" className={styles.curtainImage} />
                </div>
                <button className={styles.startButton} onClick={handleStartButtonClick}>
                    Let's Start
                </button>
            </div>
        </div>
    );
};

export default HomeScreen;
