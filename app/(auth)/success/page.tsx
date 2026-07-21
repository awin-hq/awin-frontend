"use client";


import {useRouter}
from "next/navigation";


import {PrimaryButton}
from "@/components/buttons/primary-button";


export default function SuccessPage(){


const router=useRouter();


return(

<div>


<h1>
Account created successfully 🎉
</h1>


<p>
Welcome to AWÍN.
</p>



<PrimaryButton

onClick={()=>router.push("/dashboard")}

>

Go to Dashboard

</PrimaryButton>


</div>

)

}