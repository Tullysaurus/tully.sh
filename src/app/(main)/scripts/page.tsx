'use client';

import GridItem from "@/components/grid-item";
declare global {
  var authPassed: boolean | undefined;
}


async function checkAuth(auth: string){
  console.log("checking auth: " + auth);

  if (!auth){
    // open modal to authenticate
    console.log("no auth")
    return false
  }

  return await fetch(`http://localhost:3000/api/check?key=${auth}`).then((res) => {

    if (res.ok){
      console.log("auth passed")
      return true
    }
    console.log("auth failed")
    // open modal to authenticate
    return false
    
  })
}



export default async function Scripts() {
  var authenticated = true;

  const scripts = await fetch("https://r2.tully.sh/scripts/scripts.json")
      .then(res => res.json())
      
      
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  const clicked =  () => {
    if (authenticated) {
      return new Promise((res, rej) => {
        res("1")
      })
    }

    const cookies = Object.fromEntries(
      document.cookie.split("; ").map(c => c.split("="))
    );  

    const authRes = checkAuth(cookies['auth']).then((res) => {
      authenticated = res
      return res
    })

    return authRes

    return 
  }


  return (
    <div
      className="flex flex-col h-100vh w-100vh items-center pt-[10vh] gap-8"
    >
      <h1 className="text-5xl italic font-light">tully.sh/scripts</h1>

      <div className="w-[70vw] h-[70vh] grid grid-cols-3">
        {
          Object.keys(scripts).map((key) => {
            return (
              <GridItem key={key} {...scripts[key]} onclick={clicked}/>
            )
          })
        }

      </div>
    </div>
  );
}
