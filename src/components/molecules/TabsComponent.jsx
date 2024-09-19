import React from "react";
import * as Tabs from "@radix-ui/react-tabs";

const TabsComponent = ({ tabs, currentTab, setCurrentTab }) => {
  return (
    <Tabs.Root value={currentTab} onValueChange={setCurrentTab}>
      <Tabs.List className="flex space-x-2 bg-gray-100 p-2 rounded-md w-min">
        {tabs.map((tab) => (
          <Tabs.Trigger
            key={tab.value}
            value={tab.value}
            className={`py-2 px-4 cursor-pointer rounded-md text-sm font-medium
              ${
                currentTab === tab.value
                  ? "bg-white text-black shadow-sm"
                  : "text-gray-500 hover:bg-white hover:text-black"
              }`}
          >
            {tab.label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {tabs.map((tab) => (
        <Tabs.Content key={tab.value} value={tab.value} className="mt-4">
          {tab.content}
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
};

export default TabsComponent;
