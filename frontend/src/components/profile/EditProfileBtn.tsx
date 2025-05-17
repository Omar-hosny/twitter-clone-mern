import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import EditProfileForm from "./EditProfileForm";

const EditProfileBtn = () => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Edit Profile</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Update your profile information.
            </DialogDescription>
          </DialogHeader>
          <>
            <EditProfileForm />
          </>
          <DialogFooter className="mt-2 w-full"></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditProfileBtn;
