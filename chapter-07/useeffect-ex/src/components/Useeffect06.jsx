import React, {useEffect, useState} from "react";

const useAnyKeyToRender = () => {
  const [, forceRender] = useState();

  useEffect(()=>{
    window.addEventListener("keydown", forceRender);
    return () => window.removeEventListener("keydown", forceRender);
  }, []);

}

export default function Useeffect06() {
  useAnyKeyToRender();

  useEffect(() => {
    console.log("fresh render");
  });
  return <h1>Open the Console</h1>
}