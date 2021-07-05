import { useState } from "react";
import {useHistory} from 'react-router-dom';

const Feedback = () => {

const [name,setName] = useState('');
const [body,setBody] = useState('');
// const [author, setAuthor]= useState('');
const[isPending, setIsPending] =useState(false);
const history = useHistory();

const handleSubmit = (e) =>{
    e.preventDefault();
    const feedback = {name, body};
    
    setIsPending(true);
    // fetch('http://localhost:5000/blogs/', {
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedback)
        
    })
    .then((data)=>{
        console.log(data)
        setIsPending(false);
        // history.go(-1);
        history.push('/');
    });
}

    return (    <div className="container-fluid">
        <div className="feedback  ">
            <h2>Give us your feedback</h2>

            <form onSubmit={handleSubmit} className="mb-4">
               <div>
                <label className="name form-label " htmlFor="name">Subject: </label>
                <input 
                type="text"
                className=" form-control"
                required
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}/>
                </div>
                <div>
                <label className="Feedback form-label " htmlFor="feedback" >Feedback: </label>
               <textarea value={body} onChange={(e) => setBody(e.target.value)}  name="feedback" required className=" form-control"></textarea>  
                </div> 
            <div className="d-grid gap-2">
            {!isPending && <button className="btn my-2 btn-primary ">Send</button>}
            {isPending && <button disabled  className="btn btn-primary" >Sending... </button>}

            </div>
           
            </form>
        </div>
        </div>
      );
}
 
export default Feedback;