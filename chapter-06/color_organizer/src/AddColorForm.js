import React from "react";
import { useInput } from "./hooks";
import { useColors } from "./ColorProvider";
import { css } from "@emotion/css";

export default function AddColorForm() {
  const [titleProps, resetTitle] = useInput("");
  const [colorProps, resetColor] = useInput("#000000");
  const { addColor } = useColors();

  const submit = e => {
    e.preventDefault();
    addColor(titleProps.value, colorProps.value);
    resetTitle();
    resetColor();
  };

  return (
    <form form 
      className={css`
        dispaly: flex;
        justify-content: space-around;
        margin: 0.25em;
        button {
          margin: 0.25em;
        }
        input {
          margin: 0.25em;
          &:first-child {
            flex: 1;
          }
        }
      `}
      onSubmit={submit}
    >
      <input
        {...titleProps}
        type="text"
        placeholder="color title..."
        required 
      />
      <input 
        {...colorProps}
        type="color"
        required 
      />
      <button>Add</button>
    </form>
  );

}