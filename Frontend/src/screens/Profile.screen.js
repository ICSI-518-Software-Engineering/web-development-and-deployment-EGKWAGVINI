
import { useState, useEffect } from "react";



const ProfileScreen=()=>{

  const [userDetails,setUserDetails]=useState({name:"Wagvini EGK", biography:"I m Wagvini Elkuri Gantalavari Karanam. I am from India. I completed my bachelor's in computer science. I have 1.6 years of experience with tech mahindra. I am pursuing masters degree in computer Science from university at albany"});
  const [edit, setEdit]=useState(true);
  const [file, setFile]=useState();
  const [previewImage, setPreviewImage]=useState();
  useEffect(() => {
    if (!file) {
      return;
    }
  
    setPreviewImage(URL.createObjectURL(file));
  }, [file]);
    return(
        <div className="container">
            <div className="row">
            <div class="col-md-4 py-5">
                {previewImage && <img src={previewImage} className="w-100" alt="Preview" />}
                {!edit?<input type="file" onChange={(e) => setFile(e.target.files[0])} />:<></>}
              
            </div>
            <div className="col-md-6 py-5">
              {edit?(<div><span className="h1">{userDetails.name}</span></div>):(<span><input className="form-control w-90" type="text" value={userDetails.name}  onChange={(e)=>setUserDetails({...userDetails, name:e.target.value})} /> </span>)}
              <br/>
              <p>
                Biography
                <br/>
                {edit?userDetails.biography:(<textarea   className="form-control"  onChange={(e)=>setUserDetails({...userDetails, biography:e.target.value})} >{userDetails.biography}</textarea>)}
              </p>
              {edit?<span> <a class="nav-link" onClick={()=>setEdit(false)}> edit</a></span>:<a class="nav-link" onClick={()=>setEdit(true)}> update</a>}
            </div>
            </div>
        </div>
    )
}



export default ProfileScreen;