import { BackButton } from "@/components/auth/back-button";
import { AuthHeader } from "@/components/auth/auth-header/auth-header";


export default function PinPage(){

return (
<>
<BackButton />

<AuthHeader
title="Create your PIN"
description="Create a secure PIN for quick and easy access to your AWÍN account."
/>

</>
);

}