
"use client"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { useRouter } from "next/navigation"

export default function Page() {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <Input placeholder="Room ID" className="w-50px h-25px" />
        <Button size="lg" variant={"default"} onClick={()=>{
          router.push("/chat/[roomId]")
        }}>Join Room</Button>
      </div>
    </div>
  ) 
}
