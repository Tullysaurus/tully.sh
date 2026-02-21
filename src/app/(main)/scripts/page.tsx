'use client';

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
      "preview": (<img
    src="https://r2.tully.sh/scripts/preview/blooket.png"
    alt="preview"
    className="w-full h-full object-cover"
  />),
      "date": Date.now()
    },
    "edpuzzle": {
      "title": "Edpuzzle Cheats",
      "description": "A cheat client for edpuzzle",
      "id": "edpuzzle",
      "onclick": (id: string) => {
        window.open("https://github.com/ading2210/edpuzzle-answers/", "_blank");
      },
      "preview": (<img
    src="https://r2.tully.sh/scripts/preview/edpuzzle.png"
    alt="preview"
    className="w-full h-full object-cover"
  />),
      "date": Date.now()
    },
    "wayground": {
      "title": "Wayground Cheats",
      "description": "A cheat client for wayground",
      "id": "wayground",
      "onclick": (id: string) => {
        window.open("https://github.com/Tullysaurus/Ultimate-Gemini-Helper", "_blank");
      },
      "preview": (<img
    src="https://r2.tully.sh/scripts/preview/wayground.png"
    alt="preview"
    className="w-full h-full object-cover"
  />),
      "date": Date.now()
    },
    "gimkit": {
      "title": "Gimkit Cheats",
      "description": "A cheat gui for gimkit",
      "id": "gimkit",
      "onclick": (id: string) => {
        window.open("https://gim.villainsrule.xyz/join", "_blank");
      },
      "preview": (<img
    src="https://r2.tully.sh/scripts/preview/gimkit.png"
    alt="preview"
    className="w-full h-full object-cover"
  />),
      "date": Date.now()
    },
    "chromebooks": {
      "title": "Chromebook exploits",
      "description": "A discord with resources for exploiting/unenrolling for chromebooks",
      "id": "chromebooks",
      "onclick": (id: string) => {
        window.open("https://discord.gg/crosbreaker-1375357349425971231", "_blank");
      },
      "preview": (
        <img 
          src="https://r2.tully.sh/scripts/preview/chromebooks.png"
          alt="preview"
          className="w-full h-full object-cover"
        />)

    } 
  }
  return (
    <div
      className="flex flex-col h-100vh w-100vh items-center pt-[10vh] gap-8"
    >
      <h1 className="text-5xl italic font-light">tully.sh/scripts</h1>

      <div className="w-[70vw] h-[70vh] grid grid-cols-3">
        <GridItem {...scripts["chromebooks"]}/>
        <GridItem {...scripts["wayground"]}/>
        <GridItem {...scripts["edpuzzle"]}/>
        <GridItem {...scripts["blooket"]}/>
        <GridItem {...scripts["gimkit"]}/>
      </div>
    </div>
  );
}
