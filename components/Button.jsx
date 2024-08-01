import styles from "../styles/generic-button.module.css"

const Button = ({text, selected, stateID = 0, onClick}) => {
    function clickForwarder(){
        onClick(stateID);
    }

    return (
        <button type="button" onClick={clickForwarder} className={[styles.generic_button, selected ? styles.selected : ""].join(" ")}> 
            {text}
        </button>
    );
}

export default Button;