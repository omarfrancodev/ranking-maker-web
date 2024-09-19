import React from "react";
import TabsComponent from "../molecules/TabsComponent";

const PageTemplate = ({ tabs, currentTab, setCurrentTab, children }) => {
  return (
    <div>
      <TabsComponent
        tabs={tabs}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />
      <div className="mt-6">{children}</div>
    </div>
  );
};

export default PageTemplate;
