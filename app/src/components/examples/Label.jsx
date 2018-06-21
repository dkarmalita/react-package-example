import React from 'react'
import styles from './styled.components.module.scss'

export const Label = (props) => <div {...props}
    style={{ fontWeight: '300', fontSize: 12, ...props.style }} className={styles.label} />
