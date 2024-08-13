import React, { useState } from "react";

function Checkbox() {
  const [checked, setChecked] = useState(false);

  return (
    <>
      <input 
        type="checkbox" 
        value={checked}
        onChange={() => setChecked(checked => !checked)}
      />
      {checked ? "checked" : "not checked"}
    </>
  );

  alert(`checked: ${checked.toString()}`);  // 상위에서 렌더링은 되지만 alert는 도달 불가

}

export default function Useeffect02() {
  return <Checkbox />;
}