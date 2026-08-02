"use client";


import {useState}
from "react";

import {useRouter}
from "next/navigation";


import {PinInput}
from "@/components/forms/pin-input";


import {PrimaryButton}
from "@/components/buttons/primary-button";


import styles from "./pin-form.module.css";



export function PinForm(){

const router=useRouter();

const [pin,setPin]=useState("");



function submit(){

if(pin.length===4){

router.push("/pin-loading");

}

}


return(

<div className={styles.form}>


<PinInput

value={pin}

onChange={setPin}

/>


<PrimaryButton

onClick={submit}

>

Continue

</PrimaryButton>


</div>

)

}