import React from "react";
import { CircleUser, LogOut, Menu, Package2, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useLocation } from "react-router-dom";
export default function Header() {
  const location = useLocation();
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <a
          href="#"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Package2 className="h-6 w-6" />
          <span>UUDelivery</span>
        </a>
        <Link
          to="/"
          className={
            location.pathname == "/"
              ? "hover:text-muted-foreground text-foreground transition-colors "
              : "text-muted-foreground hover:text-foreground transition-colors "
          }
        >
          Trackers
        </Link>
        <Link
          to="/orders"
          className={
            location.pathname.includes("/orders")
              ? "hover:text-muted-foreground text-foreground transition-colors "
              : "text-muted-foreground hover:text-foreground transition-colors "
          }
        >
          Orders
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <a
              href="/"
              className="flex items-center gap-2 text-lg font-semibold md:text-base"
            >
              <Package2 className="h-6 w-6" />
              <span>UUDelivery</span>
            </a>
            <Link
              to="/"
              className={
                location.pathname == "/"
                  ? "hover:text-muted-foreground text-foreground transition-colors "
                  : "text-muted-foreground hover:text-foreground transition-colors "
              }
            >
              Trackers
            </Link>
            <Link
              to="/orders"
              className={
                location.pathname.includes("/orders")
                  ? "hover:text-muted-foreground text-foreground transition-colors "
                  : "text-muted-foreground hover:text-foreground transition-colors "
              }
            >
              Orders
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className="ml-auto flex-1 sm:flex-initial"></div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="ml-2">Manager Name</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Manager Info</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="h-4 w-4 mr-2" /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
