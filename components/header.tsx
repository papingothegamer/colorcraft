"use client"

import { Github, Share2, Palette, Menu, Layers, GalleryHorizontalEnd, Droplets } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./mode-toggle"
import Link from "next/link"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { usePathname } from "next/navigation"

export function Header() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="flex flex-col gap-4 mt-8">
                  <Link href="/" className="flex items-center">
                    <div className="mr-2 p-2 bg-primary rounded-lg text-primary-foreground">
                      <Palette className="h-5 w-5" />
                    </div>
                    <span className="font-bold text-xl">ColorCraft</span>
                  </Link>
                  <nav className="flex flex-col gap-2 mt-4">
                    <Link href="/">
                      <Button variant="ghost" className="w-full justify-start">
                        Home
                      </Button>
                    </Link>
                    <Link href="/templates">
                      <Button variant="ghost" className="w-full justify-start">
                        Templates
                      </Button>
                    </Link>
                    <Link href="/tools/palette">
                      <Button variant="ghost" className="w-full justify-start">
                        <Palette className="h-4 w-4 mr-2" />
                        Color Palette
                      </Button>
                    </Link>
                    <Link href="/tools/gradient">
                      <Button variant="ghost" className="w-full justify-start">
                        <GalleryHorizontalEnd className="h-4 w-4 mr-2" />
                        Gradients
                      </Button>
                    </Link>
                    <Link href="/tools/splatter">
                      <Button variant="ghost" className="w-full justify-start">
                        <Droplets className="h-4 w-4 mr-2" />
                        Splatters
                      </Button>
                    </Link>
                    <Link href="/tools/abstract">
                      <Button variant="ghost" className="w-full justify-start">
                        <Layers className="h-4 w-4 mr-2" />
                        Abstract
                      </Button>
                    </Link>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <Link href="/" className="flex items-center">
            <div className="mr-2 p-2 bg-primary rounded-lg text-primary-foreground">
              <Palette className="h-5 w-5" />
            </div>
            <div className="hidden md:block">
              <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mr-2">
                ColorCraft
              </span>
            </div>
          </Link>

          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Home</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/templates" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Templates</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Tools</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/20 to-primary/5 p-6 no-underline outline-none focus:shadow-md"
                          href="/tools"
                        >
                          <Palette className="h-6 w-6 mb-2" />
                          <div className="mb-2 mt-4 text-lg font-medium">Color Tools</div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Create beautiful color palettes, gradients, and patterns for your projects.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <Link href="/tools/palette" legacyBehavior passHref>
                        <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none flex items-center">
                            <Palette className="h-4 w-4 mr-2" />
                            Color Palette
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Generate harmonious color palettes
                          </p>
                        </NavigationMenuLink>
                      </Link>
                    </li>
                    <li>
                      <Link href="/tools/gradient" legacyBehavior passHref>
                        <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none flex items-center">
                            <GalleryHorizontalEnd className="h-4 w-4 mr-2" />
                            Gradients
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Create beautiful gradient backgrounds
                          </p>
                        </NavigationMenuLink>
                      </Link>
                    </li>
                    <li>
                      <Link href="/tools/splatter" legacyBehavior passHref>
                        <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none flex items-center">
                            <Droplets className="h-4 w-4 mr-2" />
                            Splatters
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Create vibrant splatter patterns
                          </p>
                        </NavigationMenuLink>
                      </Link>
                    </li>
                    <li>
                      <Link href="/tools/abstract" legacyBehavior passHref>
                        <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none flex items-center">
                            <Layers className="h-4 w-4 mr-2" />
                            Abstract
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Generate abstract patterns and designs
                          </p>
                        </NavigationMenuLink>
                      </Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              navigator
                .share?.({
                  title: "ColorCraft - Design Templates & Color Palette Generator",
                  url: window.location.href,
                })
                .catch(() => {
                  navigator.clipboard.writeText(window.location.href)
                })
            }}
            className="hidden sm:flex"
          >
            <Share2 className="h-4 w-4" />
            <span className="sr-only">Share</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => window.open("https://github.com/papingothegamer/colorcraft", "_blank")}
          >
            <Github className="h-4 w-4" />
            <span className="sr-only">GitHub</span>
          </Button>

          <ModeToggle />
        </div>
      </div>
    </header>
  )
}

