function HorizontalScrollElement({children}) {
    return (
        <div style={{overflow: "hidden"}}>
            {children}
        </div>
    )
}

export default HorizontalScrollElement;