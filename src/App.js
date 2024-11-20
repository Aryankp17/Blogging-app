import { useState ,useRef ,useEffect ,useReducer} from "react";
import {db} from "./firebaseInit";
import { collection, addDoc,getDocs,onSnapshot,doc, deleteDoc } from "firebase/firestore"; 

 function blogReducer(state,action){
  switch (action.type) {
    // case "ADD":
    //   return [action.blog,...state];
    case "REMOVE":
      return action.delRef
    case "GET":
      return action.blogs
  
    default:
      return[];
  }

}

function App() {
  // const[topic,setTopic]=useState("")
  // const[text,setTextArea]=useState("")
  const[formdata,setFormData]=useState({topic:"",content:""})
  // const[blogs,setBlog]=useState([])
  const[blogs,dispatch]=useReducer(blogReducer,[])
  const titleRef =useRef(null)

  useEffect(()=>{
    document.title="Blogging";
    titleRef.current.focus()
  },[])
  useEffect(()=>{
      function getdata(){
    try{

      // const querySnapshot = await getDocs(collection(db, "Blogs"));
      const unsub = onSnapshot(collection(db,"Blogs"),(snapShot)=>{
        const blogs = snapShot.docs.map((doc) => {
          return{
            id:doc.id,
            ...doc.data(),
          }
          
        });
        console.log(blogs)
        dispatch({type:"GET",blogs})
      })
      
    }catch(err){
      console.error(err)
    }
      
    }
    getdata();

  },[dispatch])


  async function handlesubmit(e){
    e.preventDefault();
    // setBlog([{topic:formdata.topic,content:formdata.content},...blogs]);
    // dispatch({type:"ADD",blog:{topic:formdata.topic,content:formdata.content}})
    await addDoc(collection(db, "Blogs"), {
      topic:formdata.topic,
      content:formdata.content,
      createdOn: new Date(),
    });

    setFormData({topic:"",content:""})
    titleRef.current.focus();

  }
  async function removebtn(id){
    // setBlog(blogs.filter((blog,index)=>i!==index))
    const delRef = await deleteDoc(doc(db, "Blogs",id));

    dispatch({type:"REMOVE",delRef})

  }
  
  return (
    <>
    <div className='container'>
      <div className="title"><h1 id="title-name">Blogging</h1></div>
      <form onSubmit={handlesubmit} className="box">
        <input  className='topic' type="text" required placeholder="Your Topic"value={formdata.topic} ref={titleRef} onChange={(e)=>setFormData({topic:e.target.value,content:formdata.content})}/><br />
        <textarea className='textarea'value={formdata.content} required onChange={(e)=>setFormData({topic:formdata.topic,content:e.target.value})} placeholder="Start Writing..."></textarea><br />
        <button className='btn'>ADD</button>
      </form>
    </div><br/>
    <hr/>
    <h1 className="heading">Blogs</h1>
    {blogs.map((blog,i)=>(
      <div className="output-box" key={i}>
        <div className="topic-name">{blog.topic}
        </div>
        <div className="text-area">
          {blog.content}
          <button className="delete-btn" onClick={()=>removebtn(blog.id)}>Delete</button>
        </div>
      </div>

    ))}
    
    </>
  );
}

export default App;
