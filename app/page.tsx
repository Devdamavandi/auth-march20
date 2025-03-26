import { Button } from "@/components/ui/button";
import Footer from "@/components/ui/footer";
import Navbar from "@/components/ui/navbar";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center">
      <Navbar />
      <div className="flex items-center justify-center h-[80vh]">
        <Link href='/auth/login'>
          <Button variant='outline' className="w-[150px] h-[50px] cursor-pointer text-md">
            Sign in
          </Button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}
