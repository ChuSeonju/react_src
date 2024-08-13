import React, { useEffect, useMemo, useState } from "react";

const useAnyKeyToRender = () => {
  const [, forceRender] = useState();

  useEffect(() => {
    window.addEventListener("keydown", forceRender);
    return () => window.removeEventListener("keydown", forceRender);
  }, []);
};

function WordCount({ children = "" }) {
  useAnyKeyToRender();

  //  참조함수 주소 : 렌더링 될 때마다 새로운 함수가 생성되면서 주소가 할당
  const fn = () => {
    console.log("hello");
    console.log("world");
  };

  useEffect(() => {
    console.log("fresh render");
    fn();
  }, [fn]);

  return (
    <>
      <p>{children}</p>
    </>
  );
}

export default function Useeffect10() {
  return <WordCount>You are not going to believe this but...</WordCount>;
}
