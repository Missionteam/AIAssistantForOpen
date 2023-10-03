import NavItem from "./NavItem";
import styles from "./css/NavMenu.module.css";
import "./css/local.css";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import signIn from "features/signup/signIn";
import { useContext, useState } from "react";
import { AuthContext, UserContextType } from "@/lib/firebase-auth/AuthContext";
import Link from "next/link";
import { SelectedNavItemContext } from "./NavSelectProvider";

export default function NavMenu({
  onClickSetting,
  onClickLogout,
}: {
  onClickSetting?: () => void;
  onClickLogout?: () => void;
}) {
  const user = useContext<UserContextType>(AuthContext);
  const selectedItemContext = useContext(SelectedNavItemContext);
  const {selectedItemNumber, setSelectedItemNumber} = selectedItemContext? selectedItemContext: {selectedItemNumber: 0, setSelectedItemNumber: (number: number)=>{}};
  // const user =true;

  return (
    <>
      <div className={`${styles.navMenu} fixed left-0 top-0`}>
        <div
          className="flex w-full items-center"
          style={{ padding: " 16px 16px 16px 24px" }}
        >
          <div className="flex items-center justify-center">
            <img src="/logo.svg" className="w-8" />
          </div>
          <div className="ml-auto flex items-center">
            {user ? (
              <LogoutIcon color="primary" onClick={onClickLogout} />
            ) : (
              <LoginIcon color="primary" onClick={signIn} />
            )}
            <div className={`w-2`}></div>
            <SettingsIcon color="primary" onClick={onClickSetting} />
          </div>
        </div>
        <div className="ng-tns-c1434763513-1 flex w-full flex-col items-center p-4">
          <div className="relative h-24 w-24">
            {user ? (
              <img
                src={user.photoURL}
                alt=""
                className="ng-star-inserted h-full w-full rounded-full"
              />
            ) : (
              <img
                alt="User avatar"
                className="ng-star-inserted h-full w-full rounded-full"
                src="/nav-menu/brian-hughes.jpg"
              />
            )}
          </div>
          <div className="mt-6 flex w-full flex-col items-center justify-center">
            <div className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-center font-medium leading-normal text-white">
              {user ? user.name : "Brian Hughes"}
            </div>
            <div className="text-md text-secondary mt-0.5 w-full overflow-hidden text-ellipsis whitespace-nowrap text-center font-medium leading-normal">
              {user ? user.email : "hughes.brian@company.com"}
            </div>
          </div>
        </div>
        <div className={`${styles.navCategoryTitle}`}>
          <h6>DASHBOARDS</h6>
          {/* <p>Unique dashboard designs</p> */}
        </div>
        <Link href={"/pages/dashboard.html"}>
          <NavItem
            title="Mail"
            imgPath={"gmail.png"}
            selectedNumber={selectedItemNumber}
            myNumber={0}
            onClick={() => setSelectedItemNumber(0)}
          />
        </Link>
        <Link href={"/pages/tasks.html"}>
          <NavItem
            title="Tasks"
            imgPath={"notion.png"}
            selectedNumber={selectedItemNumber}
            myNumber={1}
            onClick={() => setSelectedItemNumber(1)}
          />
        </Link>
        <Link href={"/pages/schedule.html"}>
          <NavItem
            title="Schedule"
            imgPath={"googleCalendar.png"}
            selectedNumber={selectedItemNumber}
            myNumber={2}
            onClick={() => setSelectedItemNumber(2)}
          />
        </Link>
        {/* <NavItem title="Settings" onClick={onClickSetting} /> */}
        {/* <div className={`${styles.navCategoryTitle}`}>
          <h6>APPLICATIONS</h6>
          <p>Custom made application designs</p>
        </div>
        <NavItem title="Academy" />
        <NavItem title="Chat" />
        <NavItem title="Contacts" />
        <NavItem title="ECommerce" />
        <NavItem title="File Manager" />
        <NavItem title="Help Center" />
        <NavItem title="Mailbox" />
        <NavItem title="Notes" /> */}
      </div>
    </>
  );
}
