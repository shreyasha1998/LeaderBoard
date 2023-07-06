import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './MainNavigation.module.css';

const MainNavigation = () => {
    return (
        <nav className={styles.navbar}>
            <ul className={styles.navbarList}>
                <li className={styles.navbarItem}>
                    <NavLink to="/" className={({ isActive }) => isActive ? `${styles.navbarLink} ${styles.activeLink}` : styles.navbarLink}>
                        Home
                    </NavLink>
                </li>
                <li className={styles.navbarItem}>
                    <NavLink to="/configure" className={({ isActive }) => isActive ? `${styles.navbarLink} ${styles.activeLink}` : styles.navbarLink}>
                        Configure
                    </NavLink>
                </li>
                <li className={styles.navbarItem}>
                    <NavLink to="/playground" className={({ isActive }) => isActive ? `${styles.navbarLink} ${styles.activeLink}` : styles.navbarLink}>
                        Playground
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default MainNavigation;
