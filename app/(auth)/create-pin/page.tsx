import {BackButton}
from "@/components/auth/back-button";

import {AuthHeader}
from "@/components/auth/auth-header/auth-header";

import {PinForm}
from "@/features/auth/components/pin-form";


export default function CreatePinPage(){

return(

<>

<BackButton/>


<AuthHeader

title="Create your PIN"

description="Create a secure 4-digit PIN for quick access to AWÍN."

/>


<PinForm/>


</>

)

}