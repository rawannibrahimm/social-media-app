import { Card, CardBody, Divider, Avatar } from "@heroui/react";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";

export default function UserLeftSidebar({ noOfPosts }) {
    const {userData} = useContext(UserContext)
    return (
        <>
        <div className="hidden lg:flex flex-col gap-4 top-24 max-w-58.75 ">
        {/* About Card */}
        <Card shadow="sm">
            <CardBody className="gap-3">
                <h3 className="font-semibold text-base">About</h3>
                <p className="text-sm text-default-600 leading-relaxed">
                    {"Front-End Developer."}
                </p>
                <Divider />
                <div className="text-xs text-default-500">
                    Joined {new Date(userData.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                })}
                </div>
            </CardBody>
        </Card>

        {/* Stats Card */}
        <Card shadow="sm">
            <CardBody className="flex flex-row justify-evenly text-center">
                <div>
                    <p className="font-semibold">{noOfPosts || "..."}</p>
                    <p className="text-xs text-default-500">Posts</p>
                </div>

                <div>
                    <p className="font-semibold">{20}</p>
                    <p className="text-xs text-default-500">Followers</p>
                </div>

                <div>
                    <p className="font-semibold">{20}</p>
                    <p className="text-xs text-default-500">Following</p>
                </div>
            </CardBody>
        </Card>
    </div>
    </>
    );
}
