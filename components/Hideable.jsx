function Hideable({children, enabled = true}){
    return (
        <div className={enabled ? "" : "disabled"}>
            {children}
        </div>
    );
}

export default Hideable;