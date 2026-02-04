import { Card, CardBody, Avatar, Button } from "@heroui/react";

const mockSuggestions = [
    { id: 1, name: "Sara", username: "@sara", avatar: "https://i.pinimg.com/736x/6e/6a/04/6e6a04d989b1876b19cc2a9d8ee2cf8a.jpg" },
    { id: 2, name: "Omar", username: "@omar", avatar: "https://i.pinimg.com/1200x/4c/5a/a1/4c5aa13fffd0ba6aba290e45a3364eaf.jpg" },
    { id: 3, name: "Lina", username: "@lina", avatar: "https://i.pinimg.com/736x/76/e0/2d/76e02db344e7493375107dd87ed0a4ad.jpg" },
];

export default function UserRightSidebar() {
    return (
    <>
        <div className="hidden lg:block top-24 max-w-58.75 ml-auto">
            <Card shadow="sm">
                <CardBody className="gap-4">
                    <h3 className="font-semibold text-base">Suggested for you</h3>
                    {mockSuggestions.map((user) => (
                        <div key={user.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Avatar size="sm" src={user.avatar} />
                                <div className="text-sm">
                                    <p className="font-medium leading-none">{user.name}</p>
                                    <p className="text-xs text-default-500">{user.username}</p>
                                </div>
                            </div>
                            <Button size="sm" variant="flat" color="primary">
                                Follow
                            </Button>
                        </div>
                    ))}
                </CardBody>
            </Card>
        </div>
    </>
    );
}
