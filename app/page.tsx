import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full text-center">
      <Link href='/auth/login'>
        <Button variant={'outline'}
          className="w-[150px] h-[50px] cursor-pointer text-md"
        >Sign in</Button>
      </Link>
    </div>
  );
}
