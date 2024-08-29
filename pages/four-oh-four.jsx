import Link from 'next/link'
 
function NotFound() {
  return (
    <>
      <title>404 - Page Not Found</title>
      <link rel="icon" sizes="76x76" href="../static/compassLogo.ico" />
      
      <div style={{marginLeft: 25 + 'px'}}>
        <div style={{flexDirection:"row", flexWrap:"nowrap", display:"inline-flex", alignItems:"center"}} class="flex-container">
          <div style={{background:"#efefef", borderRadius:"10px", marginTop:"15px", padding:"20px"}}>
            <h1>404 - Page Not Found</h1>
            <b style={{marginBottom: "30px", display:"inline-block"}}> 
                <Link style={{marginLeft: 8 + 'px'}} href="/"> Here's a link back to the directory</Link> 
            </b>
          </div>
          <div style ={{height: "200px", marginTop:"60px", opacity: "0%", animation: "0.5s cubic-bezier(0.02, 0.38, 0.22, 0.98) 0s 1 slideInTop, 0.5s cubic-bezier(0.02, 0.38, 0.22, 0.98) 0s 1 normal forwards fadeIn"}}> 
            <img src = "/svg_assets/Logo_plain.svg" style = {{width: "150px", marginLeft: "50px", display:"block"}}></img>
          </div>
        </div> 
      </div> 
    </> 
  )  
} 
  
export default NotFound;