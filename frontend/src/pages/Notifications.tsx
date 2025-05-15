import NotificationItem from "@/components/NotificationItem";
import BasicLoading from "@/components/shared/BasicLoading";
import { Button } from "@/components/ui/button";
import useGetNotifications from "@/hooks/notifications/useGetNotifications";
import { MoveLeft } from "lucide-react";
import { Link } from "react-router";

const Notifications = () => {
  const { data: notifications, isLoading, error } = useGetNotifications();
  if (isLoading) {
    return (
      <div className="w-full flex h-full items-center justify-center">
        <BasicLoading />
      </div>
    );
  }
  if (error) {
    return (
      <div className="w-full flex h-full items-center justify-center">
        <p className="text-red-500">Error: something went wrong..</p>
      </div>
    );
  }
  if (!notifications || notifications.length === 0) {
    return (
      <div className="w-full flex h-full items-center justify-center">
        <p className="text-gray-500 p-2 text-2xl">No notifications yet.</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center h-screen overflow-y-auto scrollbar-hide pb-96">
      <div
        className="flex w-full items-center gap-2 
        sticky top-0 z-10  backdrop-blur-3xl
      border-b border-gray-200 p-1.5"
      >
        <Button asChild size="icon" variant="ghost" className="rounded-full">
          <Link to="/">
            <MoveLeft />
          </Link>
        </Button>
        <span className="text-xl font-semibold">Notifications</span>
      </div>
      {notifications.map((notification) => (
        <NotificationItem key={notification._id} notification={notification} />
      ))}
    </div>
  );
};

export default Notifications;
