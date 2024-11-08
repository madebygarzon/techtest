import * as React from "react";
import { Tabs, TabsList, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import HeaderSideBar from "@/components/mainsection/header";
import FooterSideBar from "@/components/mainsection/footer";
import ItemsSideBar from "@/components/mainsection/items";
import IncomesExpenses from "@/components/incoexpen";
import Users from "@/components/user";
import Reports from "@/components/reports";
import MenuItems from "@/components/home/menuitems";
const MainSection = () => {
  return (
    <Tabs defaultValue="home" className="w-full h-screen max-h-screen flex overflow-y-auto">
      <TabsList className="w-[270px] top-0 left-0 flex-col items-start max-h-screen bg-primary overflow-y-auto">
        <HeaderSideBar />
        <ItemsSideBar />
        <FooterSideBar />
      </TabsList>
      <div className="flex-grow max-h-screen overflow-y-auto">
        <TabsContent value="home" className="h-full max-h-screen overflow-y-auto">
          <Card className="bg-secondary border-none h-full max-h-screen">
            <CardContent className="h-full max-h-screen">
              <MenuItems />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="incomesexpenses" className="h-full max-h-screen overflow-y-auto">
          <Card className="bg-secondary border-none h-full max-h-screen">
            <CardContent className="p-6">
              <IncomesExpenses />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="users" className="h-full max-h-screen overflow-y-auto">
          <Card className="bg-secondary border-none h-full max-h-screen">
            <CardContent className="p-6">
              <Users />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports" className="h-full max-h-screen overflow-y-auto">
          <Card className="bg-secondary border-none h-full max-h-screen">
            <CardContent className="p-6">
              <Reports />
            </CardContent>
          </Card>
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default MainSection;

