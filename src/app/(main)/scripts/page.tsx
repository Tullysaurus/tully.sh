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

  return await fetch(`https://api.tully.sh/check?key=${auth}`).then((res) => {

    if (res.ok){
      console.log("auth passed")
      return true
    }
    console.log("auth failed")
    return false
    
  })
}

interface Scripts {
  [key: string]: {
    title : string | null,
    description : string | null,
    id : string | null,
    url: string | null,
    date: number | null,
  }
}


export default async function Scripts() {
  const scripts : Scripts = await fetch("https://r2.tully.sh/scripts/scripts.json")
      .then(res => res.json())
      
      
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  const clicked = async (c: string) => {
    "use server";

    const cookies = Object.fromEntries(
      c.split("; ").map(c => c.split("="))
    );  

    return (await checkAuth(cookies['auth'])) ? "1" : "0"
  }


  return (
    <div
      className="flex flex-col h-100vh w-100vh items-center pt-[10vh] gap-8"
    >
      <h1 className="text-5xl italic font-light">tully.sh/scripts</h1>

      <div className="w-[70vw] h-[70vh] grid grid-cols-3">
        {
          Object.keys(scripts as object).map((key) => {
            return (
              <GridItem key={key} {...scripts[key]} onclick={clicked}/>
            )
          })
        }

      </div>
    </div>
  );
}
