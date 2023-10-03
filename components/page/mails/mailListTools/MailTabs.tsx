import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import InboxIcon from "@mui/icons-material/Inbox";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import { types } from "util";
import React from "react";

export default function MailTabs({value, handleChange, a11yProps, styles,tabs}: {value: number, handleChange: any, a11yProps: any, styles: any,tabs: MailTabsType[]}){
    return(
        <>
        <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            className={`${styles.tabs}`}
            sx={{ justifyContent: "start" }}
          >
            {tabs.map((tab, index) => (
              <Tab
                key={index}
                label={tab.title1}
                icon={tab.icon}
                {...a11yProps(index)}
                iconPosition="start"
                className={`${styles.tab}`}
              />
            ))}
          </Tabs>
        </>
    );
}

export type MailTabsType = {
    value: number,
    title1: string,
    icon: React.ReactNode,
}