

import Navbar from "@/shared/navbar";
import Footer from "@/shared/footer";

export default function GroupLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white">
      
      {/* <Navbar /> */}

     
      <main className="">
        {children}
      </main>

      {/* <Footer /> */}
    </div>
  );
}