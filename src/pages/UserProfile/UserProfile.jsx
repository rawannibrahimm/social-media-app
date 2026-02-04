import React, { useContext, useState, } from "react";
import UserProfileHeader from "../../components/UserProfileUI/UserProfileHeader";
import { UserContext } from "../../Context/UserContext";
import UserLeftSidebar from "../../components/UserProfileUI/UserLeftSidebar";
import UserRightSidebar from "../../components/UserProfileUI/UserRightSiderbar";

import UserProfilePosts from "../../components/UserProfileUI/UserProfilePosts";
import UserProfileSkeleton from "./UserProfileSkeleton";

export default function UserProfile() {
  const {userData, isLoading} = useContext(UserContext)
  const [noOfPosts, setNoOfPosts] = useState(0);  

  if (isLoading || !userData) {
    return (
        <UserProfileSkeleton/>
    );
  }

  return (
    
    <React.Fragment key={userData._id}>
      <UserProfileHeader />
      <main className=' min-h-screen'>
        <section className='max-w-7xl mx-auto  px-6 py-5'>
          <div className="grid grid-cols-4">
            <div className="col-span-1 lg:px-0">
              <UserLeftSidebar noOfPosts={noOfPosts}/>
            </div>
            <div className="col-span-4 lg:col-span-2 space-y-5">

              <UserProfilePosts userData={userData} setNoOfPosts={setNoOfPosts} />
            </div>
            <div className="col-span-1">
              <UserRightSidebar/>
            </div>
          </div>
        </section>
      </main>
    </React.Fragment>
  );
}
