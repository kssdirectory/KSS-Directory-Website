import buttonGroup from "../styles/button-group.module.css"

const SimpleButtonGroup = ({buttonData, renderButtonFunc}) => {
    const buttons = []
    for (const button of buttonData){
        buttons.push(renderButtonFunc(button));
    }

    return (
        <div className={buttonGroup.button_group_div}>
            {buttons}
        </div>
    );
}

export default SimpleButtonGroup;