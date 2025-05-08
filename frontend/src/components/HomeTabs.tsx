import { useState } from "react";

type Tab = "for-you" | "following";
const HomeTabs = () => {
  const [activeTab, setActiveTab] = useState<Tab>("for-you");

  return (
    <div className="w-full border-b border-gray-200">
      <div className="flex">
        <button
          onClick={() => setActiveTab("for-you")}
          className={`flex-1 py-4 text-center font-medium relative ${
            activeTab === "for-you" ? "" : "text-gray-500 hover:bg-gray-100"
          }`}
        >
          For you
          {activeTab === "for-you" && (
            <div className="absolute bottom-0 left-0 right-0 mx-auto w-14 h-1 bg-blue-500 rounded-full"></div>
          )}
        </button>
        <button
          onClick={() => setActiveTab("following")}
          className={`flex-1 py-4 text-center font-medium relative ${
            activeTab === "following" ? "" : "text-gray-500 hover:bg-gray-100"
          }`}
        >
          Following
          {activeTab === "following" && (
            <div className="absolute bottom-0 left-0 right-0 mx-auto w-14 h-1 bg-blue-500 rounded-full"></div>
          )}
        </button>
      </div>
    </div>
  );
};

export default HomeTabs;
