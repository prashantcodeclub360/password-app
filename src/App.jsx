import { useCallback, useState, useEffect,useRef } from "react"

export default function App() {
  const [length , setLength] = useState(8)
  const [numberAllowwed,setNumberAllowed] = useState(false);
  const [charAllowwed,setcharAllowed] = useState(false);
  const [ pasword ,setPassword] = useState("")
  // useRef 
  const passwordRef = useRef(null)
// call back
  const passwordGenrator = useCallback(()=> 
  
  {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowwed) str += "0123456789"
    if (charAllowwed) str += "[]{}!@#$%^^&**(()?><"
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random()*str.length+1)
      pass +=str.charAt(char)
      
    }
    setPassword(pass)

  }, [length , numberAllowwed ,charAllowwed , setPassword])

  const copypasswordtoClipboard = useCallback(()=> {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(pasword)
  },
    [pasword]    )


  useEffect(()=> {passwordGenrator()}, [length,numberAllowwed,charAllowwed,passwordGenrator] )
  return (
    <>
    <main className="w-screen h-screen bg-gradient-to-r from-violet-500 to-fuchsia-500 flex justify-center items-center ">
    <div className="box w-screen max-w-md bg-gray-700 rounded-lg px-4 py-4  text-orange-500">
      <h1 className="text-white text-center">Password Generator </h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4 ">
        <input type="text" value={pasword} placeholder="Password"   
        readOnly className="outline-none w-full py-1 px-3" ref={passwordRef} />
        <button onClick={copypasswordtoClipboard} className=" hover:bg-red-400 outline-none bg-blue-800 text-white px-3 py-0.5 shrink-0" type="button">Copy</button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input 
          type="range" 
          min={6}
          max={100}
          value={length}
          className="cursor-pointer"
          onChange={(e) => {setLength(e.target.value)}}
          />
          <label>Input-Word : {length}</label>
        </div>
        <div className=" items-center gap-x-1">
          <input 
          type="checkbox" 
          defaultChecked={numberAllowwed}
          id="numberInput"
          onChange={() => {
            setNumberAllowed((prev) => !prev);
          }}
          />
          <label >Numbers</label>
        </div>
        <div className=" items-center gap-x-1">
          <input 
          type="checkbox" 
          defaultChecked={numberAllowwed}
          id="numberInput"
          onChange={() => {
            setcharAllowed((prev) => !prev);
          }}
          />
          <label >Characters</label>
        </div>
      </div>
    </div>
  
    </main>


    
    
    
    
    
    
    </>
  )
}