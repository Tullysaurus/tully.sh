import GridItem from "@/components/grid-item";

export default async function Scripts() {
  const scripts : Record<string, any> = await fetch("https://r2.tully.sh/scripts/scripts.json").then(res => res.json() as Promise<Record<string, any>>).then((json) => {
    return json
  })



  return (
    <div
      className="flex flex-col h-100vh w-100vh items-center pt-[10vh] gap-8"
    >
      <h1 className="text-5xl italic font-light">tully.sh/scripts</h1>

      <div className="w-[70vw] h-[70vh] grid grid-cols-3">
        <GridItem {...scripts["chromebooks"]} useAuth={true}/>
        <GridItem {...scripts["wayground"]} useAuth={true}/>
        <GridItem {...scripts["edpuzzle"]} useAuth={true}/>
        <GridItem {...scripts["blooket"]} useAuth={true}/>
        <GridItem {...scripts["gimkit"]} useAuth={true}/>
      </div>
    </div>
  );
}
