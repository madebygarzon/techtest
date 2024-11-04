import * as React from "react";
import { Tabs, TabsList, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import HeaderSideBar from "@/components/sidebar/header";
import FooterSideBar from "@/components/sidebar/footer";
import ItemsSideBar from "@/components/sidebar/items";
import IncomesExpenses from "@/components/incoexpen";
import Users from "@/components/user";
import Reports from "@/components/reports";
import MenuItems from "@/components/home/menuitems";
const SideBar = () => {
  return (
    <Tabs defaultValue="home" className=" w-full h-screen flex">
      <TabsList className="w-[270px]  flex-col items-start h-full bg-primary  ">
        <HeaderSideBar />
          <ItemsSideBar />
        <FooterSideBar />
      </TabsList>
      <div className="flex-grow">
      <TabsContent value="home" className=" h-full">
          <Card className="bg-secondary border-none h-full">
            <CardContent className="h-full">
              <MenuItems />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="incomesexpenses" className="h-full">
          <Card className="bg-secondary border-none h-full">
            <CardContent className="p-6">
              <IncomesExpenses />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="users" className="h-full">
          <Card className="bg-secondary border-none h-full">
            <CardContent className="p-6">
              <Users />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports" className="h-full">
          <Card className="bg-secondary border-none h-full">
            <CardContent className="p-6">
              <Reports />
            </CardContent>
          </Card>
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default SideBar;
