import * as React from 'react'
import { Link, NavLink as RouterNavLink, useLocation } from 'react-router-dom'
import { ChevronDownIcon, MenuIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { MAIN_NAV, SERVICES } from '@/lib/site'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { PixelLogo } from '@/components/pixel/pixel-logo'
import { ThemeToggle } from '@/components/theme-toggle'

function Navbar() {
  const [scrolled, setScrolled] = React.useState(false)
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const location = useLocation()

  // Solidify the bar once the hero starts scrolling under it.
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile drawer whenever the route changes.
  React.useEffect(() => setMobileOpen(false), [location.pathname])

  const servicesActive = location.pathname.startsWith('/servicios')

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full transition-all duration-300',
        scrolled
          ? 'border-b border-border bg-background/85 backdrop-blur-lg'
          : 'border-b border-transparent bg-transparent'
      )}
    >
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 sm:px-6"
        aria-label="Navegación principal"
      >
        <Link
          to="/"
          className="rounded-md focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
          aria-label="Nubitlan — Inicio"
        >
          <PixelLogo size={30} />
        </Link>

        {/* Desktop navigation */}
        <div className="ml-auto hidden items-center gap-1 lg:flex">
          <NavItem to="/">Inicio</NavItem>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={cn(
                  'group inline-flex h-9 items-center gap-1 rounded-lg px-3 text-sm font-medium transition-colors',
                  'hover:bg-accent hover:text-accent-foreground',
                  'focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none',
                  'data-[state=open]:bg-accent',
                  servicesActive && 'text-primary'
                )}
              >
                Servicios
                <ChevronDownIcon className="size-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-80">
              {SERVICES.map((service) => (
                <DropdownMenuItem key={service.to} asChild>
                  <Link to={service.to} className="flex-col items-start gap-0.5">
                    <span className="font-medium">{service.label}</span>
                    <span className="text-muted-foreground text-xs">
                      {service.description}
                    </span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <NavItem to="/herramientas">Herramientas</NavItem>
          <NavItem to="/blog">Blog</NavItem>
          <NavItem to="/quienes-somos">Quiénes Somos</NavItem>
          <NavItem to="/caso-de-estudio">Caso de Estudio</NavItem>

          <ThemeToggle className="ml-1" />

          <Button asChild variant="pixel" size="sm" className="ml-2">
            <Link to="/#lista-de-espera">Lista de espera</Link>
          </Button>
        </div>

        {/* Mobile navigation */}
        <div className="ml-auto flex items-center gap-1 lg:hidden">
          <ThemeToggle />
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Abrir menú">
                <MenuIcon className="size-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[86vw] sm:w-80">
              <SheetHeader>
                <SheetTitle className="flex items-center">
                  <PixelLogo size={26} />
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col overflow-y-auto px-3 pb-8">
                {MAIN_NAV.map((item) => (
                  <SheetClose asChild key={item.to}>
                    <RouterNavLink
                      to={item.to}
                      end={item.to === '/'}
                      className={({ isActive }) =>
                        cn(
                          'rounded-lg px-3 py-3 text-base font-medium transition-colors hover:bg-accent',
                          isActive && 'text-primary'
                        )
                      }
                    >
                      {item.label}
                    </RouterNavLink>
                  </SheetClose>
                ))}

                <p className="eyebrow text-muted-foreground mt-5 px-3 pb-1">
                  Servicios
                </p>
                {SERVICES.map((service) => (
                  <SheetClose asChild key={service.to}>
                    <RouterNavLink
                      to={service.to}
                      className={({ isActive }) =>
                        cn(
                          'rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-accent',
                          isActive ? 'text-primary' : 'text-muted-foreground'
                        )
                      }
                    >
                      {service.label}
                    </RouterNavLink>
                  </SheetClose>
                ))}

                <SheetClose asChild>
                  <Button asChild variant="pixel" className="mt-6 mx-3">
                    <Link to="/#lista-de-espera">Únete a la lista</Link>
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}

function NavItem({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <RouterNavLink
      to={to}
      end={to === '/'}
      className={({ isActive }) =>
        cn(
          'inline-flex h-9 items-center rounded-lg px-3 text-sm font-medium transition-colors',
          'hover:bg-accent hover:text-accent-foreground',
          'focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none',
          isActive && 'text-primary'
        )
      }
    >
      {children}
    </RouterNavLink>
  )
}

export default Navbar
