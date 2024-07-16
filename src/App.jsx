import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useEffect,useState } from 'react';
import { Spin } from 'antd';

function App() {

  const [files,setFiles] = useState([])
  const [matricule,setMatricule] = useState("")

  const fetchFiles = (variable)=>{
     axios.get(`https://profilacademiqueess.onrender.com/api/v1/files/${variable}/get`)
    .then(function(response){
      console.log('matricule is: ' +variable);
      console.log(response.data);
      setFiles(response.data);
    })
    .catch(function(error){
      console.info(error)
    })
  }

  
  return (
    <div className="App">
      <div className="title">
        <h1>Mon Profil Academique</h1>
      </div>
      <div className="searchbar">
        <input className='search' type="search" name="" id="" placeholder='matricule' onChange={(e) => setMatricule(e.target.value)}/>
        <a href='#' className="btnGo"  onClick={()=>fetchFiles(matricule)}>Go</a>
      </div>

      <div>
        {
        fetchFiles?
        files.map((item,index)=>{
          return(
            <div className="files" key={index}>
              <h1>{item.name}</h1> <a  href="#" onClick={()=>{

const base64String = item.data; // Assuming this is a base64-encoded string
const byteCharacters = atob(base64String);
const byteNumbers = new Array(byteCharacters.length);
for (let i = 0; i < byteCharacters.length; i++) {
  byteNumbers[i] = byteCharacters.charCodeAt(i);
}
const byteArray = new Uint8Array(byteNumbers);
const blob = new Blob([byteArray], { type: 'application/octet-stream' });
const url = window.URL.createObjectURL(blob);

const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', item.name); // Set the desired filename here
  document.body.appendChild(link);
  link.click();
          
              }} className='btnGo'>Download</a>
            </div>
          )
        })
        :   <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' ,width: '50vw'}}>
        <Spin size="large" />
      </div>
      }
      </div>
      
  
    </div>
  );
}

export default App;
