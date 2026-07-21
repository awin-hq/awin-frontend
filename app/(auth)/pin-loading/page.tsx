"use client";


import {useEffect}
from "react";

import {useRouter}
from "next/navigation";


export default function PinLoading(){

const router=useRouter();


useEffect(()=>{


const timer=setTimeout(()=>{

router.push("/success");


},2000);


return()=>clearTimeout(timer);


},[router]);



return(

<div>

<h2>
Creating your account...
</h2>

</div>

)

}