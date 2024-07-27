import React from "react";
import Link from "next/link";
import { Menu, Package2 } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { navItems } from "./sidebar";

const SheetItems = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <nav className="grid gap-2 text-lg font-medium">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <Package2 className="h-6 w-6" />
            <span className="sr-only">Quick Delivery</span>
          </Link>
          {navItems.map((item) => {
            return (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default SheetItems;
