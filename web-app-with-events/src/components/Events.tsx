import { Flex, Card } from "antd"
import React from "react"

const events = [
    {
        title: "Event 1",
        shortDescription: "short 1",
        fullDescription:
            `Lorem ipsum dolor sit amet,consectetur 
            adipiscing elit, sed do eiusmod tempor incididunt ut labore 
            et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
            exercitation ullamco laboris nisi ut aliquip ex ea commodo 
            consequat. Duis aute irure dolor in reprehenderit in voluptate 
            velit esse cillum dolore eu fugiat nulla pariatur. Excepteur 
            sint occaecat cupidatat non proident, sunt in culpa qui officia 
            deserunt mollit anim id est laborum.`
    },
    {
        title: "Event 2",
        shortDescription: "short 2",
        fullDescription:
            `Lorem ipsum dolor sit amet,consectetur 
            adipiscing elit, sed do eiusmod tempor incididunt ut labore 
            et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
            exercitation ullamco laboris nisi ut aliquip ex ea commodo 
            consequat. Duis aute irure dolor in reprehenderit in voluptate 
            velit esse cillum dolore eu fugiat nulla pariatur. Excepteur 
            sint occaecat cupidatat non proident, sunt in culpa qui officia 
            deserunt mollit anim id est laborum.`
    },
    {
        title: "Event 3",
        shortDescription: "short 3",
        fullDescription:
            `Lorem ipsum dolor sit amet,consectetur 
            adipiscing elit, sed do eiusmod tempor incididunt ut labore 
            et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
            exercitation ullamco laboris nisi ut aliquip ex ea commodo 
            consequat. Duis aute irure dolor in reprehenderit in voluptate 
            velit esse cillum dolore eu fugiat nulla pariatur. Excepteur 
            sint occaecat cupidatat non proident, sunt in culpa qui officia 
            deserunt mollit anim id est laborum.`
    },
    {
        title: "Event 4",
        shortDescription: "short 4",
        fullDescription:
            `Lorem ipsum dolor sit amet,consectetur 
            adipiscing elit, sed do eiusmod tempor incididunt ut labore 
            et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
            exercitation ullamco laboris nisi ut aliquip ex ea commodo 
            consequat. Duis aute irure dolor in reprehenderit in voluptate 
            velit esse cillum dolore eu fugiat nulla pariatur. Excepteur 
            sint occaecat cupidatat non proident, sunt in culpa qui officia 
            deserunt mollit anim id est laborum.`
    },
    {
        title: "Event 5",
        shortDescription: "short 5",
        fullDescription:
            `Lorem ipsum dolor sit amet,consectetur 
            adipiscing elit, sed do eiusmod tempor incididunt ut labore 
            et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
            exercitation ullamco laboris nisi ut aliquip ex ea commodo 
            consequat. Duis aute irure dolor in reprehenderit in voluptate 
            velit esse cillum dolore eu fugiat nulla pariatur. Excepteur 
            sint occaecat cupidatat non proident, sunt in culpa qui officia 
            deserunt mollit anim id est laborum.`
    },
    {
        title: "Event 6",
        shortDescription: "short 6",
        fullDescription:
            `Lorem ipsum dolor sit amet,consectetur 
            adipiscing elit, sed do eiusmod tempor incididunt ut labore 
            et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
            exercitation ullamco laboris nisi ut aliquip ex ea commodo 
            consequat. Duis aute irure dolor in reprehenderit in voluptate 
            velit esse cillum dolore eu fugiat nulla pariatur. Excepteur 
            sint occaecat cupidatat non proident, sunt in culpa qui officia 
            deserunt mollit anim id est laborum.`
    },
]



const tabList = [
    {
        key: 'short',
        tab: 'short',
    },
    {
        key: 'full',
        tab: 'full',
    },
]

const Events: React.FC = () => {
    const [activeTabKey, setActiveTabKey] = React.useState<{ [key: string]: string }>({});

    const onTabChange = (tabKey: string, eventKey: string) => {
        setActiveTabKey(prev => ({ ...prev, [eventKey]: tabKey }));
    }

    return (
        <Flex wrap gap="large" justify="center">
            {events.map((event) => {
                return (
                    <Card
                        className="w-100"
                        title={event.title}
                        tabList={tabList}
                        activeTabKey={activeTabKey[event.title]}
                        onTabChange={(tabKey) => onTabChange(tabKey, event.title)}
                    >
                        {activeTabKey[event.title] === 'short' ?
                            event.shortDescription : event.fullDescription}
                    </Card>
                )
            })}
        </Flex>
    )
}

export default Events