/* eslint-disable react/no-unescaped-entities */
import { Button } from "./button";
import { HomeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion"
import { Shield, Search, User2, ArrowRight, Bitcoin } from "lucide-react"
import Spline from "@splinetool/react-spline"

export const Banniere = () => {

  return (
    // <header className="min-h-screen w-full max-md:flex-col bg-black flex px-4  flex-row my-2 gap-4">
    //   <Image src={"/hero.png"} width={300} height={300} alt="hero" className="w-[50%] h-full object-cover rounded-xl"/>
    //   <motion.div 
    //       initial={{ opacity: 0, x: -20}}
    //       whileInView={{ opacity: 1, x: 0}}
    //       transition={{ delay: 0.5, duration: 0.7, ease: "easeInOut" }}
    //       className="items-center justify-center"
    //     >
    //       <div className="space-y-8">
    //         <h1 className="text-7xl text-white font-bold leading-tight tracking-tighter">
    //           AUTHENTIFICATION
    //           <br />
    //           DE PIECES
    //           <br />
    //           D&apos;IDENTITÉ
    //         </h1>
            
    //         <p className="text-gray-400 max-w-md">
    //           Protection des données et des menaces en temps réel sur le plus grand système de sécurité au monde            
    //         </p>

    //         <Button className="bg-purple-600 hover:bg-purple-700 gap-2">
    //           Voir plus
    //           <ArrowRight className="h-4 w-4" />
    //         </Button>

    //         <div className="pt-8 space-y-6">
    //           <div className="flex items-start gap-4">
    //             <Shield className="h-6 w-6 text-purple-500" />
    //             <div>
    //               <h3 className="font-semibold">Securité</h3>
    //               <p className="text-sm text-gray-400">
    //                 Conçu pour être le système de protection le plus rapide et contre les menaces
    //                 </p>
    //             </div>
    //           </div>

    //           <div className="flex items-center gap-4">
    //             <Bitcoin className="h-8 w-8 text-purple-500" />
    //             {/* <Tether className="h-8 w-8 text-purple-500" /> */}
    //             <div className="h-8 w-8 rounded-full bg-purple-500 flex items-center justify-center">
    //               <span className="text-sm font-bold">T</span>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </motion.div>
    // </header>

<main className="container mx-auto px-6 py-12 grid md:grid-cols-2 gap-12 items-center">
{/* Left Column - 3D Visualization */}
<div className="relative aspect-square max-md:hidden bg-white rounded-lg overflow-hidden">
  {/* <Image
    src="/placeholder.svg"
    alt="Blockchain Security Visualization"
    width={600}
    height={600}
    className="object-cover"
  /> */}
  <Spline
    scene="https://prod.spline.design/YQ4XBVCtOT2tZkOL/scene.splinecode" 
  />

  <div className="absolute bg-white px-16  bottom-5 right-5 flex items-center gap-4">
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-white" />
        <span className="text-sm text-white">85%</span>
      </div>
      <div className="text-xs text-white">
        Security Score
      </div>
    </div>
  </div>
</div>

{/* Right Column - Content */}
<motion.div 
  initial={{ opacity: 0, x: -20}}
  whileInView={{ opacity: 1, x: 0}}
  transition={{ delay: 0.5, duration: 0.7, ease: "easeInOut" }}
  className=""
>
  <div className="space-y-8 ">
    <h1 className="text-7xl font-bold leading-tight tracking-tighter max-md:text-4xl max-md:text-center">
      AUTHENTIFICATION
      <br />
      DE PIECES
      <br />
      D&apos;IDENTITÉ
    </h1>
    
    <p className="text-gray-400 max-w-md max-md:text-center">
      Protection des données et des menaces en temps réel sur le plus grand système de sécurité au monde            
    </p>

    <Button className="bg-purple-600 hover:bg-purple-700 gap-2 max-md:w-full max-md:justify-center">
      Voir plus
      <ArrowRight className="h-4 w-4" />
    </Button>

    <div className="pt-8 space-y-6">
      <div className="flex items-start gap-4">
        <Shield className="h-6 w-6 text-purple-500" />
        <div>
          <h3 className="font-semibold">Securité</h3>
          <p className="text-sm text-gray-400">
            Conçu pour être le système de protection le plus rapide et contre les menaces
            </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Bitcoin className="h-8 w-8 text-purple-500" />
        {/* <Tether className="h-8 w-8 text-purple-500" /> */}
        <div className="h-8 w-8 rounded-full bg-purple-500 flex items-center justify-center">
          <span className="text-sm font-bold">T</span>
        </div>
      </div>
    </div>
  </div>
</motion.div>
</main>
  );
};


