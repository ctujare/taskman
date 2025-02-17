import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Card from './components/Card/Card';

function App() {
  const [posts, setPosts] = useState([])
  const [form, setForm] = useState({'email': "", 'phone': ""});

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(json => setPosts(json))
  }, [posts]);

  const inputTextHandler = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
    console.log(form);
  }

  return (
    <>
      <Navbar />
      <div className='flex flex-row flex-wrap justify-center gap-3 bg-gray-400 py-2'>
        {posts.map((post) => (
          <Card key={post.id} post={post} />
        ))}
      </div>
      <div className='flex flex-col justify-center items-center gap-3 bg-purple-100 h-screen'>
        <input type="text" name='email' value={form.email} placeholder='Email' className='bg-white px-3 py-2 border border-purple-500 rounded' onChange={inputTextHandler} />
        <input type="text" name='phone' value={form.phone} placeholder='Phone' className='bg-white px-3 py-2 border border-purple-500 rounded' onChange={inputTextHandler} />
      </div>
    </>
  )
}

export default App
