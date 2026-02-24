import GridItem from "@/components/grid-item";

declare global {
  var authPassed: boolean | undefined;
}

globalThis.authPassed = false;

async function checkAuth(auth: string){
  if (!auth){
    // open modal to authenticate
    console.log("no auth")
    return false
  }

  return await fetch(`http://tully.sh/api/check?key=${auth}`).then((res) => {

    if (res.ok){
      return true
    }
    // open modal to authenticate
    return false
    
  })
}



export default async function Scripts() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const scripts = await fetch("https://r2.tully.sh/scripts/scripts.json").then(res => res.json() as any).then((json) => {return json})

  const clicked = async (c: string) => {
    "use server";

    const cookies = Object.fromEntries(
      c.split("; ").map(c => c.split("="))
    );  
    const auth = cookies['auth']
    
    return (await checkAuth(auth)) ? "1" : "0"
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
