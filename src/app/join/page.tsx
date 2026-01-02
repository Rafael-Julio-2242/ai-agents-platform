"use client";

import ReturnButton from "@/components/platform/return-button";
import LoginCreateUserComponent from "./login-create-user-component/";

export default function JoinPage() {
  return (
    <>
      <ReturnButton className="absolute top-16 left-16 hover:cursor-pointer" /> 
      <div className="w-full text-xl justify-center items-center flex flex-col h-screen gap-6">
       <LoginCreateUserComponent />
      </div>
    </>
  );
}
