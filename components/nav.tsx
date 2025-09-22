"use client"

import Link from "next/link"
import { useState } from "react"
import { Search, Menu } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useAuth } from "@/components/auth-provider"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils";
// import { ThemeSwitcher } from "@/components/theme-switcher"
import ThemeModeButton from "@/components/theme-mode-button"


export function Nav() {
  const { user, signOut } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  const activePath = usePathname()
  console.log(activePath, 'activePath==')

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          博客系统
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <Link href="/" className={cn(" hover:text-foreground hover:text-sky-500", activePath === '/' ? 'text-sky-500' : 'text-muted-foreground')}>
            首页
          </Link>
          <Link href="/categories" className={cn(" hover:text-foreground hover:text-sky-500", activePath === '/categories' ? 'text-sky-500' : 'text-muted-foreground')}>
            分类
          </Link>
          <Link href="/about" className={cn(" hover:text-foreground hover:text-sky-500", activePath === '/about' ? 'text-sky-500' : 'text-muted-foreground')}>
            关于
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="搜索文章..." className="w-[200px] pl-8" />
          </div>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={user.user_metadata?.avatar_url || "/placeholder.svg?height=32&width=32"}
                      alt={user.email || ""}
                    />
                    <AvatarFallback>{user.email ? user.email.charAt(0).toUpperCase() : "U"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{user.email || "用户"}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">控制面板</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/blog/create">创建文章</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile">个人资料</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>退出登录</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button variant="default">登录</Button>
            </Link>
          )}
          {/* <ThemeSwitcher /> */}
          <ThemeModeButton />

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">打开菜单</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col space-y-4 mt-8">
                <Link href="/" onClick={() => setIsOpen(false)} className="text-lg">
                  首页
                </Link>
                <Link href="/categories" onClick={() => setIsOpen(false)} className="text-lg">
                  分类
                </Link>
                <Link href="/about" onClick={() => setIsOpen(false)} className="text-lg">
                  关于
                </Link>
                {user ? (
                  <>
                    <Link href="/dashboard" onClick={() => setIsOpen(false)} className="text-lg">
                      控制面板
                    </Link>
                    <Link href="/blog/create" onClick={() => setIsOpen(false)} className="text-lg">
                      创建文章
                    </Link>
                    <Link href="/profile" onClick={() => setIsOpen(false)} className="text-lg">
                      个人资料
                    </Link>
                    <Button
                      variant="outline"
                      onClick={() => {
                        signOut()
                        setIsOpen(false)
                      }}
                    >
                      退出登录
                    </Button>
                  </>
                ) : (
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    <Button className="w-full">登录</Button>
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}