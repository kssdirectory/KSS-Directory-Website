import buttonGroup from "../styles/button-group.module.css"

const ButtonGroup = ({buttons}) => {
    return (
        <div className={buttonGroup.button_group_div}>
            {buttons}
        </div>
    );
}

export default ButtonGroup;