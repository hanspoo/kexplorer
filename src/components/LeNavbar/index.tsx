import NextLink from 'next/link'
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Image
} from '@chakra-ui/react'
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon
} from '@chakra-ui/icons'

const azulActicare = '#2e6dfa'
type Props = {
  title: string
  navItems: Array<NavItem>
  selected?: string
}
export default function WithSubnavigation({
  title = 'Falta el título',
  navItems = [],
  selected
}: Props) {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Box>
      <Flex
        bg={useColorModeValue(azulActicare, 'white')}
        color={useColorModeValue('white', '#2e6dfa')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex
          flex={{ base: 1 }}
          justify={{ base: 'center', md: 'start' }}
          align={{ base: 'center', md: 'center' }}
        >
          <Image
            src="/logo.png"
            alt={title}
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily={'heading'}
            color={useColorModeValue('white', 'gray.800')}
            role="heading"
            aria-level={1}
          />

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav navItems={navItems} selected={selected} />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}
        >
          <Button
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bg={'blue.400'}
            _hover={{
              bg: 'blue.300'
            }}
          >
            Login
          </Button>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav navItems={navItems} mainToggle={onToggle} />
      </Collapse>
    </Box>
  )
}

const DesktopNav = ({
  navItems,
  selected
}: {
  navItems: Array<NavItem>
  selected?: string
}) => {
  const linkColor = useColorModeValue('gray.100', 'gray.600')
  const selectedColor = useColorModeValue('white', 'orange')
  const selectedBgColor = useColorModeValue('blue.600', 'blue')
  const linkHoverColor = useColorModeValue('orange', 'white')
  const popoverContentBgColor = useColorModeValue('white', 'gray.800')

  return (
    <Stack direction={'row'} spacing={4}>
      {navItems.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Text
                p={2}
                fontSize={'sm'}
                fontWeight={500}
                color={selected === navItem.label ? selectedColor : linkColor}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor
                }}
              >
                <NextLink href={navItem.href ?? '#'}>{navItem.label}</NextLink>
              </Text>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={popoverContentBgColor}
                p={4}
                rounded={'xl'}
                minW={'sm'}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  )
}

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Link
      href={href}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: useColorModeValue('blue.50', 'gray.900') }}
    >
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text
            transition={'all .3s ease'}
            _groupHover={{ color: 'blue.400' }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={'sm'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}
        >
          <Icon color={'blue.400'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  )
}

const MobileNav = ({
  navItems,
  mainToggle
}: {
  navItems: Array<NavItem>
  mainToggle: () => void
}) => {
  return (
    <Stack
      bg={useColorModeValue(azulActicare, 'gray.800')}
      p={4}
      display={{ md: 'none' }}
    >
      {navItems.map((navItem) => (
        <MobileNavItem
          key={navItem.label}
          {...navItem}
          mainToggle={mainToggle}
        />
      ))}
    </Stack>
  )
}

const MobileNavItem = ({
  label,
  children,
  href,
  mainToggle
}: NavItem & { mainToggle: () => void }) => {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none'
        }}
      >
        <Text
          onClick={mainToggle}
          fontSize="sm"
          color={useColorModeValue('white', azulActicare)}
        >
          <NextLink href={href || '#'}>{label}</NextLink>
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}
        >
          {children &&
            children.map((child) => (
              <Text key={child.label} py={2}>
                <NextLink href={child.href || '#'}>{child.label}</NextLink>
              </Text>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  )
}

export interface NavItem {
  label: string
  subLabel?: string
  children?: Array<NavItem>
  href?: string
}
