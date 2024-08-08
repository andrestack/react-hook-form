import Image from "next/image";
import dynamic from "next/dynamic";
import RetroGrid from "@/components/magicui/retro-grid";

const ReactForm = dynamic(() => import("@/components/ReactForm"), {
  ssr: false,
});

export default function Home() {
  return (
    <div>
      <h1 className="text-4xl font-bold flex justify-center my-20">
        Welcome to Retro Grid
      </h1>
      <RetroGrid />

      <ReactForm />
    </div>
  );
}
