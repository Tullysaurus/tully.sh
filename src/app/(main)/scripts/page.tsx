import GridItem from "@/components/grid-item";

export default function Scripts() {
  const scripts = {
    "blooket": {
      "title": "Blooket Cheats",
      "description": "A collection of cheats for blooket.com",
      "id": "blooket",
      "onclick": (id: string) => {
        window.open("https://coding4hours.github.io/Blooket-Cheats/", "_blank");
      },
      "preview": (<p>Preview</p>),
      "date": new Date().getUTCDate()
    }
  }
  return (
    <div
      className="flex flex-col h-100vh w-100vh items-center pt-[10vh] gap-8"
    >
      <h1 className="text-5xl italic font-light">tully.sh/scripts</h1>

      <div className="w-[70vw] h-[70vh] grid grid-flow-col grid-rows-2 grid-cols-3">
        <GridItem {...scripts["blooket"]}/>
        <GridItem {...scripts["blooket"]}/>
        <GridItem {...scripts["blooket"]}/>
        <GridItem {...scripts["blooket"]}/>
        <GridItem {...scripts["blooket"]}/>
        <GridItem {...scripts["blooket"]}/>
      </div>
    </div>
  );
}
