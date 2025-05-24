"use client"
import { useApiQuery } from "@/src/hooks/useApiQuery";
import Home from "@/src/screens/Home/Home";
import Image from "next/image";

export default function Page() {
  const {data}=useApiQuery<any>({
    key: [],
    url: "https://jsonplaceholder.typicode.com/posts",
  })
  console.log({
    data
  })
  return (
    <div className=" min-h-screen  ">
      <Home/>
    </div>
  );
}
