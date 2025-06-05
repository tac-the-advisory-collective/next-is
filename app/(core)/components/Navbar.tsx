"use client";

// npms imports
import React from "react";
import { usePathname } from "next/navigation";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  Bars4Icon,
  ChartBarIcon,
  Bars2Icon,
  FolderIcon,
  UsersIcon,
  Square3Stack3DIcon,
} from "@heroicons/react/24/solid";
// import SigninButton from "@/app/components/SignInButton";
// import SigninButtonMobile from "@/app/components/SignInButtonMobile";
import { cn } from "@/lib/utils";
import Link from "next/link";
// import useUser from "@/lib/hooks/useUser";
// import LocaleSwitcher from "./LocaleSwitcher";
// import { useTranslations } from "next-intl";
// import LocaleSwitcherMobile from "./LocaleSwitcherMobile";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function NavBar() {
  const pathname = usePathname();

  const hiddenPaths = ["/api/auth/signin"];
  const user = {user: {email: "dd@l.com"}}
  if (hiddenPaths.some((path)=> pathname.startsWith(path))) {
    return null;
  }

  const navigation = [
    { icon: HomeIcon, name: "Home", href: "/", current: true, pathname: "home", secret: false },
    { icon: UsersIcon, name: "Company", href: "/company", current: true, pathname: "company", secret: true },
    { icon: UsersIcon, name: "CRM", href: "/crm", current: true, pathname: "crm", secret: true },
    // { icon: UsersIcon, name: "Users", href: "/users", current: false },
  ];
  
  return (
    <Disclosure
      as="header"
      // className="border-b border-gray-700 bg-navi  text-white "
      className="bg-gradient-to-br from-stone-800 via-stone-600 to-stone-400"
      // style={gradiant04}
    >
      {({ open }) => (
        <>
          <div className="mx-auto px-2 lg:divide-y lg:px-8 font-extrabold">
            <div className="relative flex h-16 justify-between">
              <div className="relative z-10 flex px-2 lg:px-0">
                <div className="flex flex-shrink-0 items-center">
                  <span className="text-xl  text-white">Aiibi</span>
                </div>
              </div>

              <div className="relative z-10 flex items-center lg:hidden">
                {/* Mobile menu button */}
                <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white ">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>
              <div className="hidden lg:relative lg:z-10 lg:ml-4 lg:flex lg:items-center">
                {/* Profile dropdown */}
                {/* <LocaleSwitcher /> */}
                {/* <SigninButton /> */}

              </div>
            </div>
            <nav
              className="hidden lg:flex lg:space-x-8 lg:py-2"
              aria-label="Global"
            >
              {navigation.map((item: any, index: any) => {
                if (item.secret == true 
                    && 
                    (
                      user?.user?.email == "test@localhost.com" 
                    )
                ) {
                  // if(user?.user?.email == "david.drapeau@gmail.com") {
                    return (<Link
                      key={index}
                      href={item.href}
                      className={classNames(
                        item.href == pathname
                          ? // item.current
                            "bg-gray-900 text-red-white "
                          : "text-white  hover:bg-gray-700 hover:text-white",
                        "inline-flex items-center rounded-md py-2 px-3 text-sm text-red"
                      )}
                      // style={item.href == pathname ? gradiant02 : {}}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item && item.icon && (
                        <item.icon className="h-5 w-5 text-red-600 mr-2" />
                      )}
                      {item.name}
                    </Link>);
    
                  // }

                }
                else if (item.name != "KPIs" && item.name != "Templates") {
                  return (
                    <Link
                    key={index}
                    href={item.href}
                    className={classNames(
                      item.href == pathname
                        ? // item.current
                          "bg-gray-900 text-white "
                        : "text-white  hover:bg-gray-700 hover:text-white",
                      "inline-flex items-center rounded-md py-2 px-3 text-sm "
                    )}
                    // style={item.href == pathname ? gradiant02 : {}}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item && item.icon && (
                      <item.icon className="h-5 w-5 text-blue-600 mr-2" />
                    )}
                    {item.name}
                  </Link>
  
                  )
                }
              })}
              
            </nav>
          </div>

          <DisclosurePanel as="nav" className="lg:hidden" aria-label="Global">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={cn(
                    item.href == pathname
                      ? "bg-gray-900 text-red-500 "
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md py-2 px-3 text-base"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item && item.icon && (
                    <item.icon className="h-5 w-5 text-white" />
                  )}
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
            <div className="  pb-3 pt-4">
              {/* border-t border-gray-700 */}
              <div className="flex items-center px-4"></div>
              <div className="mt-3 space-y-1 px-2">
                {/* {userNavigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                  >
                    {item.name}
                  </Disclosure.Button>
                ))} */}
                {/* <LocaleSwitcherMobile /> */}
                {/* <SigninButtonMobile /> */}
              </div>
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}
