'use client';

import GridItem from "@/components/grid-item";

export default function Projects() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-8 px-4 pb-10 pt-10 lg:pt-16">
      <h1 className="text-center text-4xl italic font-light sm:text-5xl">tully.sh/<span className="text-[#FFC17B]">projects</span></h1>
      <p className="max-w-xl text-center text-base font-semibold sm:text-lg">
        Nothing to see here...
      </p>
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1,2,3,4,5,6,7,8,9,10,11,12].map((i)=>(
          <GridItem key={i} id={i.toString()} title={i.toString()} description={i.toString()} url={i.toString()} date={Date.now()} onclick={(c)=>{
            return new Promise((res) => {res(true)})
          }}/>
        ))}
      </div>
    </div>
  );
}
