'use client';

import GridItem from "@/components/grid-item";
import { useQuery } from "@tanstack/react-query";

const defaultScripts = {
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
};

export default function Scripts() {

  const { data: scripts } = useQuery({
    queryKey: ["scripts"],
    queryFn: async () => {
      const res = await fetch("https://r2.tully.sh/scripts/scripts.json");
      return res.json();
    },
    initialData: defaultScripts,
  });

  const { data: authPassed } = useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      if (typeof document === 'undefined') return false;
      
      const cookies = Object.fromEntries(
        document.cookie.split("; ").map(c => c.split("="))
      );
      const auth = cookies['auth'];

      if (!auth) {
        console.log("no auth");
        return false;
      }

      const res = await fetch(`/api/check?key=${auth}`);
      return res.ok;
    },
    initialData: false,
    refetchInterval: (query) => (query.state.data ? false : 1000),
  });

  return (
    <div
      className="flex flex-col h-100vh w-100vh items-center pt-[10vh] gap-8"
    >
      <h1 className="text-5xl italic font-light">tully.sh/scripts</h1>

      <div className="w-[70vw] h-[70vh] grid grid-cols-3">
        <GridItem {...(scripts["chromebooks"] || defaultScripts["chromebooks"])} enabled={authPassed}/>
        <GridItem {...(scripts["wayground"] || defaultScripts["wayground"])} enabled={authPassed}/>
        <GridItem {...(scripts["edpuzzle"] || defaultScripts["edpuzzle"])} enabled={authPassed}/>
        <GridItem {...(scripts["blooket"] || defaultScripts["blooket"])} enabled={authPassed}/>
        <GridItem {...(scripts["gimkit"] || defaultScripts["gimkit"])} enabled={authPassed}/>
      </div>
    </div>
  );
}
