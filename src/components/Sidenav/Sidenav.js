import { useEffect, useState } from "react";
import { navData } from "../../lib/navData";
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { NavLink } from "react-router-dom";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import styles from "./sidenav.module.css";
import momentLogo from '../../assets/image.ico';
import Avatar from '@mui/material/Avatar';
import profilePic from '../../assets/Encanto-Avatar.webp';

export default function Sidenav() {
    const [open, setopen] = useState(true);

    const toggleOpen = () => {
        setopen(!open)
    }
    return (
        <div className={open ? styles.sidenav : styles.sidenavClosed}>
            <div className={styles.profilePic}>
                {
                    open ?
                        <Avatar alt="Remy Sharp" src={profilePic} sx={{ width: 160, height: 160 }} />
                        :
                        <Avatar alt="Remy Sharp" src={profilePic} sx={{ width: 40, height: 40 }} />
                }
                {
                    open ?
                        <div className={styles.userText} >Mirabel</div>
                        :
                        <div className={styles.userTextMin} >Mirabel</div>
                }

            </div>
            <div className={styles.logoSection}>
                <div className={styles.logo}>
                    <img src={momentLogo} width="22"
                        height="22" />
                </div>
                {
                    open ?
                        <div className={styles.logoText}> moment energy </div>
                        :
                        ""
                }
            </div>
            <button className={styles.menuBtn} onClick={toggleOpen}>
                {open ? <KeyboardDoubleArrowLeftIcon /> : <KeyboardDoubleArrowRightIcon />}
            </button>
            {navData.map(item => {
                return <NavLink key={item.id} className={styles.sideitem} to={item.link}>
                    {item.icon}
                    <span className={open ? styles.linkText : styles.linkTextClosed}>{item.text}</span>
                </NavLink>
            })}
        </div>
    )
}