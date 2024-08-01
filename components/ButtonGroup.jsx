import { useState } from "react";
import buttonGroup from "../styles/button-group.module.css"

const ButtonGroup = ({buttonData, renderButtonFunc, stateChangedFunc}) => {
    const [state, setState] = useState(0);

    function handleClick(id){
        stateChangedFunc();
        setState(id);
    }

    const buttons = []
    for (const button of buttonData){
        buttons.push(renderButtonFunc(button, state, handleClick));
        // console.log("Button: " + button);
    }
    // console.log("Buttons generated are as follows: ");
    // console.log(buttons);

    return (
        <div className={buttonGroup.button_group_div}>
            {buttons}
        </div>
    );
}

export default ButtonGroup;

// Example usage, use I guess when state of buttons doesn't matter? Or something?
{/* <ButtonGroup 
    buttonData={[
        {text:"First Floor", stateID: 0},
        {text:"Second Floor", stateID: 1},
        {text:"Third Floor", stateID: 2},
    ]}
    renderButtonFunc={(buttonData, state, onClick) => 
        <Button 
        text = {buttonData.text}
        selected = {state === buttonData.stateID}
        stateID = {buttonData.stateID}
        onClick = {onClick}
        />
    }
    stateChangedFunc={() => {
        console.log("bEhleh")
    }}
/> */}