"use client";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ModeToggle } from "../theme-toggle";
export const Navbar = () => {
  const router = useRouter();
  return (
    <div className="w-full flex bg-black  shadow-lg justify-between">
      <div className=" h-full w-[16rem]  gap-4 justify-center items-center flex">
        <Image src={"/logo.png"} width={60}  height={30} alt="logo" />
        <h1 className="font-medium text-lg text-white">LegitID</h1>
      </div>

      <div className="px-4 flex flex-row gap-4 items-center">
        <ConnectWallet
          theme={"dark"}
          btnTitle="Connecter le portefeuille"
          onConnect={() => {
            console.log("wallet connected");
            router.push("/dashboard");
          }}
        />
        {/* <ModeToggle/> */}
      </div>
    </div>
  );
};
