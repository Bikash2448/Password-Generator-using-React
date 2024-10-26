import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [length, setlength] = useState(8)
  const [number, setnumber]= useState(false)
  const [char, setchar] = useState(false)
  const [password, setpassword] = useState("")

  const PasswordGenerator= useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(number) str+="0123456789"
    if(char) str += "!@#$%^&*=+_-~`"

    for(let i =1;i<=length;i++){
      let character = Math.floor(Math.random()* str.length+1)
      pass+=str.charAt(character)
      setpassword(pass)
    }
  },[length,number,char,setpassword])

  const PasswordRef = useRef(null)

  const CopyPassword = useCallback(()=>{
    PasswordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    PasswordGenerator()
  },[length,number,char,PasswordGenerator])
  

  return (
    <>
       <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8  bg-gray-300  '>
        <h1 className='text-center font-bold text-blue-700'>Password Generator</h1>
        <div className='flex justify-center gap-2'>
          <input
            type='text'
            value={password}
            placeholder='password'
            className='outline-none w-full py-1 px-3 my-4 rounded-md'
            readOnly
            ref={PasswordRef}
          />
          <button onClick={CopyPassword} className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-1 my-4 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2 py-4 font-medium text-gray-800 justify-around'>
          <div className='flex items-center gap-x-1'>
            <input
              type='range'
              min={4}
              max={80}
              value={length}
              className='cursor-pointer'
              onChange={(e)=>{setlength(e.target.value)}}
              
            />
            <label> Length :{length}</label>
          </div>
          <div>
            <input
              type='checkbox'
              defaultChecked={number}
              id='numberinput'
              onChange={()=>{
                setnumber((prev)=>!prev)
              }}
            />
            <label> Add Number</label>
          </div>
          <div>
            <input
              type='checkbox'
              defaultChecked={char}
              id='charinput'
              onChange={()=>{
                setchar((prev)=>!prev)
              }}
            />
            <label>  Add Char</label>
          </div>
        </div>
       </div>
    </>
  )
}

export default App
