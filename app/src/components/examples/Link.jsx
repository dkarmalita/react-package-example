import React from 'react'
import styles from './styled.components.module.scss'

export const Link = (props) => <span
    {...props}
    className={styles.link}
    style={{ fontWeight: '300', fontSize: 14, ...props.style }}
/>
