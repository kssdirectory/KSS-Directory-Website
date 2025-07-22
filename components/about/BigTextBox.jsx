import main from '@/styles/about-page/main.module.css';

function bigTextBox(props) {

    var inputText = props.inputText;
    var text = [];
    var inputText = [["MEET", "#072136"], ["THE", "#072136"], ["TEAM", "#072136"]]


    for (const inText of inputText) {
    text.push(
        <h2 style = {{color: inText[1]}}>{inText[0]}</h2>
    )
    };

    return (
        <div className = {main.headerContainer} style = {{backgroundColor: "#D9D9D9"}}>
            <div className = {main.headerTextDiv}>
                {text}
            </div>
        </div>
    )
};

export default bigTextBox