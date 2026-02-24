'use client';

import GridItem from "@/components/grid-item";
import { useState } from "react";

function checkAuth(auth: string, setAuthPassed: React.Dispatch<React.SetStateAction<boolean>>){
  if (!auth){
    // open modal to authenticate
    setAuthPassed(false)
    console.log("no auth")
    return
  }

  fetch(`/api/check?key=${auth}`).then((res) => {

    if (res.ok){
      setAuthPassed(true)
    } else {
      // open modal to authenticate
      setAuthPassed(false)
    }
  })
}



export default function Scripts() {

  const [scripts, setScripts] = useState({
    "chromebooks": {
      title: "",
      description: "",
      id: "",
      url: "",
      date: 0
    },
    "wayground": {
      title: "",
      description: "",
      id: "",
      url: "",
      date: 0
    },
    "edpuzzle": {
      title: "",
      description: "",
      id: "",
      url: "",
      date: 0
    },
    "blooket": {
      title: "",
      description: "",
      id: "",
      url: "",
      date: 0
    },
    "gimkit": {
      title: "",
      description: "",
      id: "",
      url: "",
      date: 0
    }
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fetch("https://r2.tully.sh/scripts/scripts.json").then(res => res.json() as any).then((json) => {return json}).then(json => setScripts(json));

  const [authPassed, setAuthPassed] = useState(false)
  
  setTimeout(
    () => {
      if (authPassed){
        return
      }

      console.log("checking auth")
      const cookies = Object.fromEntries(
        document.cookie.split("; ").map(c => c.split("="))
      );
      const auth = cookies['auth']

      checkAuth(auth, setAuthPassed)
    },
    1000
  )


  return (
    <div
      className="flex flex-col h-100vh w-100vh items-center pt-[10vh] gap-8"
    >
      <h1 className="text-5xl italic font-light">tully.sh/scripts</h1>

      <div className="w-[70vw] h-[70vh] grid grid-cols-3">
        {
          Object.keys(scripts).map((key) => {
            return (
              <GridItem key={key} {...scripts[key]} enabled={authPassed}/>
            )
          })
        }

      </div>
    </div>
  );
}
