import Navbar from "@/components/Navbar";
import { getCurrentUser } from "@/libs/session";

export default async function Home() {
  const user = await getCurrentUser();

  return (
    <div className="px-5 max-w-[1280px] mx-auto">
      <Navbar />
    </div>
  );
}
