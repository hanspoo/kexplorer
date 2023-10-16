import LeNavbar, { NavItem } from 'components/LeNavbar'
import { useRouter } from 'next/router'

const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Lista',
    href: '/'
  },
  {
    label: 'Mapa',
    href: '/mapa'
  }
]

export default function NavbarReact() {
  const router = useRouter()
  const selected = router
    ? router.route.endsWith('mapa')
      ? 'Mapa'
      : 'Lista'
    : 'Lista'
  return <LeNavbar navItems={NAV_ITEMS} title="Acticare" selected={selected} />
}
