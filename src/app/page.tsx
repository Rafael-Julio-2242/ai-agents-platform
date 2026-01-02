import Link from "next/link";


export default function LandingPage() {

 return (
  <>
   <div className='w-full text-xl justify-center items-center flex flex-col h-screen'>
    Agent Creator Platform Landing Page!
    <Link href='/join' className='text-blue-500 hover:underline'>Join!</Link>
   </div>
  </>
 )

}
