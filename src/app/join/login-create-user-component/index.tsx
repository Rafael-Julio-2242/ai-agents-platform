import {
  Tabs,
  TabsContent,
  TabsContents,
  TabsHighlight,
  TabsHighlightItem,
  TabsList,
  TabsTrigger,
} from "@/components/animate-ui/primitives/animate/tabs";
import { useState } from "react";
import LoginUserForm from "./login-user-form";
import CreateUserForm from "./create-user-form";

export default function LoginCreateUserComponent() {
  const [tabActive, setTabActive] = useState<string>("login");

  const switchTabActive = (tab: string) => {
    setTabActive(tab);
  };

  const applyActiveTabHoverStyle = (tab: string) => {
   if (tab !== tabActive) {
    return "hover:cursor-pointer"
   }
  }

  return (
    <Tabs className="w-[600px]" value={tabActive} onValueChange={switchTabActive}>
      <TabsHighlight className="bg-background absolute z-0 inset-0 rounded-xl">
        <TabsList className="h-10 inline-flex p-1 bg-accent w-full rounded-t-xl">
          <TabsHighlightItem value="login" className="flex-1">
            <TabsTrigger
              value="login"
              className={`h-full px-4 py-2 leading-0 w-full text-xl ${applyActiveTabHoverStyle('login')}`}
            >
              Login
            </TabsTrigger>
          </TabsHighlightItem>
          <TabsHighlightItem value="sign up" className="flex-1">
            <TabsTrigger
              value="sign up"
              className={`h-full px-4 py-2 leading-0 w-full text-xl ${applyActiveTabHoverStyle('sign up')}`}
            >
              Sign Up
            </TabsTrigger>
          </TabsHighlightItem>
        </TabsList>
      </TabsHighlight>
      <TabsContents className="bg-background p-3 border-4 border-accent border-t-0">
        <TabsContent value="login" className="space-y-4">
          <LoginUserForm />
        </TabsContent>
        <TabsContent value="sign up" className="space-y-4">
          <CreateUserForm />
        </TabsContent>
      </TabsContents>
    </Tabs>
  );
}
