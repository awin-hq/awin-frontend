"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

import styles from "./otp-back-button.module.css";


export function OtpBackButton(){

 const router = useRouter();


 return (
   <button
    className={styles.button}
    type="button"
    onClick={() => router.push("/phone")}
   >

    <ChevronLeft size={22}/>

   </button>
 );

}