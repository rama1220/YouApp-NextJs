import Image from "next/image";
import Box from "./Component/Box";
import Main from "./Component/Main";
import Link from "next/link";
export default function Home() {
  return (
  <Main>
      <Box>
        <div className="flex flex-col justify-center items-center main-first">
          <Image src="/images/You.png" alt="Vercel Logo" width={200} height={200} className="mt-20 mr-11 ml-11" priority={true} />
          <h1 className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl m-10 text-white -mt-2">Welcome to YouApp</h1>
          <Link href="/login">
          <button className="bg-gradient-to-r from-teal-500 via-blue-500 to-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-outline">Login</button>
          </Link>
        </div>
      </Box>
    </Main>
  );
}
