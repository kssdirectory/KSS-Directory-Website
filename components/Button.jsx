import styles from "../styles/generic-button.module.css"

const Button = ({text, onClick}) => {
    return (
        // Todo move to css file
        <button type="button" onClick={onClick} className={styles.generic_button}> 
            {text}
        </button>
    );
}

export default Button;