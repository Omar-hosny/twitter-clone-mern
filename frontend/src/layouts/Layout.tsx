import React from "react";
import Sidebar from "@/components/shared/Sidebar";
import SuggesstionUsers from "@/components/shared/SuggesstionUsers";
import SearchUsers from "@/components/home/SearchUsers";

const Layout = ({ children }: { children: React.ReactElement }) => {
  return (
    <div
      className="container grid grid-cols-1 
    md:grid-cols-7 lg:grid-cols-9 xl:grid-cols-12
     max-w-7xl mx-auto min-h-screen"
    >
      <div className="hidden md:block md:col-span-2 lg:col-span-3 xl:col-span-3 ">
        <Sidebar />
      </div>
      <main
        className="border-x border-1 min-h-full col-span-full 
        md:col-span-5 xl:col-span-6 lg:col-span-6 
      "
      >
        {children}
      </main>
      <div className="p-4 hidden xl:col-span-3 xl:block  ">
        <SearchUsers />
        <SuggesstionUsers />
      </div>
    </div>
  );
};

export default Layout;
