"use client";

import styles from "./pin-input.module.css";

type Props = {
  value: string;
  onChange: (value:string)=>void;
};

export function PinInput({
  value,
  onChange,
}:Props){

return(

<div className={styles.wrapper}>

{Array.from({length:4}).map((_,index)=>(

<input
key={index}
type="password"
maxLength={1}
value={value[index] ?? ""}
onChange={(e)=>{

const newValue =
value.substring(0,index)
+
e.target.value
+
value.substring(index+1);

onChange(newValue);

}}
className={styles.input}
/>

))}

</div>

);

}