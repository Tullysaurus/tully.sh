'use client';

import GridItem from "@/components/grid-item";


export default function Projects() {
  return (
    <div
      className="flex flex-col h-fit w-full items-center pt-[10vh] gap-8"
    >
      <h1 className="text-5xl italic font-light">tully.sh/<span className="text-[#FFC17B]">projects</span></h1>
      <p className="text-l text-center w-3/8 font-semibold">
        Nothing to see here...
      </p>
      <div className="w-[70vw] grid grid-cols-3 gap-4">
        {[1,2,3,4,5,6,7,8,9,10,11,12].map((i)=>(
          <GridItem key={i} id={i.toString()} title={i.toString()} description={i.toString()} url={i.toString()} date={Date.now()} onclick={(c)=>{
            return new Promise((res) => {res(true)})
          }}/>
        ))}

      </div>
    </div>
  );
}
