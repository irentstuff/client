/* -------------------------------------------------------------------------- */
/*                                   Imports                                  */
/* -------------------------------------------------------------------------- */
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
/* --------------------------------- amplify -------------------------------- */
import { signOut } from 'aws-amplify/auth'
/* ---------------------------------- antd ---------------------------------- */
import {
  HomeOutlined,
  MailOutlined,
  LogoutOutlined,
  LoginOutlined,
  PlusCircleOutlined,
  MenuOutlined,
  DollarOutlined
} from '@ant-design/icons'
import { Layout, Menu, Row, Col, Drawer, Button } from 'antd'
import { updateCurrentUser } from '../../redux/reducer'

const { Header } = Layout

/* -------------------------------------------------------------------------- */
/*                                   HEADER                                   */
/* -------------------------------------------------------------------------- */
export const CustomHeader = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const currentUser = useSelector((state) => state.iRentStuff.currentUser)
  const [openMenu, setOpenMenu] = useState('')
  const [showMenuButton, setShowMenuButton] = useState(false)
  const [drawerVisible, setDrawerVisible] = useState(false)

  const items = [
    {
      label: 'Offers Made',
      key: 'OffersMade',
      icon: <DollarOutlined />,
      style: { display: currentUser.authenticated ? 'inline-block' : 'none' }
    },
    {
      label: 'Offers Received',
      key: 'OffersReceived',
      icon: <DollarOutlined />,
      style: { display: currentUser.authenticated ? 'inline-block' : 'none' }
    },
    {
      label: 'My Items',
      key: 'MyItems',
      icon: <HomeOutlined />,
      style: { display: currentUser.authenticated ? 'inline-block' : 'none' }
    },
    {
      label: 'Add New Item',
      key: 'AddItem',
      icon: <PlusCircleOutlined />,
      style: { display: currentUser.authenticated ? 'inline-block' : 'none' }
    },

    {
      label: 'Message',
      key: 'Message',
      icon: <MailOutlined />,
      style: { display: currentUser.authenticated ? 'inline-block' : 'none' }
    },
    {
      label: `Logout for ${currentUser?.userDetails?.username}`,
      key: 'Logout',
      icon: <LogoutOutlined />,
      style: { display: currentUser.authenticated ? 'inline-block' : 'none' }
    },
    {
      label: 'Login',
      key: 'Login',
      icon: <LoginOutlined />,
      style: { display: currentUser.authenticated ? 'none' : 'inline-block' }
    }
  ]

  // Show the drawer
  const showDrawer = () => {
    setDrawerVisible(true)
  }

  // Close the drawer
  const closeDrawer = () => {
    setDrawerVisible(false)
  }
  const openHomePage = () => {
    window.location.assign('/')
    // navigate('/')
    setOpenMenu('')
  }

  const openMenuItem = async (e) => {
    if (e.key !== 'Logout') {
      navigate(`${e.key}`)
      setOpenMenu(e.key)
    } else {
      await signOut()
      dispatch(
        updateCurrentUser({
          data: { authenticated: false, userDetails: {} }
        })
      )
      navigate('/')
    }
  }

  useEffect(() => {
    if (window.innerWidth < 1200) {
      setShowMenuButton(true)
    } else {
      setShowMenuButton(false)
    }

    const handleResize = () => {
      if (window.innerWidth < 1200) {
        setShowMenuButton(true)
      } else {
        setShowMenuButton(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <Header>
      <Row justify='space-between' wrap={false}>
        <Col
          onClick={(e) => openHomePage(e)}
          xs={22}
          xl={6}
          style={{ color: 'white', opacity: '0.65', display: 'flex', justifyContent: 'flex-start' }}
        >
          iRentStuff
        </Col>
        {showMenuButton ? (
          <Col span={2} style={{ textAlign: 'right' }}>
            <Button
              icon={<MenuOutlined style={{ fontSize: '20px', color: 'white' }} />}
              onClick={showDrawer}
              style={{ border: 'none', background: 'transparent' }}
            />
          </Col>
        ) : (
          <>
            <Col span={15} style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Menu breakpoint='xs' onClick={(e) => openMenuItem(e)} theme='dark' mode='horizontal' items={items} selectedKeys={openMenu} />
            </Col>
            <Col
              onClick={(e) => openHomePage(e)}
              offset={1}
              style={{ color: 'white', opacity: '0.65', display: 'flex', justifyContent: 'flex-start' }}
            >
              {currentUser?.userDetails?.username ? currentUser?.userDetails?.username : 'guest'}
            </Col>
          </>
        )}
      </Row>

      <Drawer title='Menu' placement='right' theme='dark' onClose={closeDrawer} open={drawerVisible}>
        <Menu
          mode='vertical'
          items={items}
          onClick={(e) => {
            openMenuItem(e)
            closeDrawer()
          }}
          selectedKeys={openMenu}
        />
      </Drawer>
    </Header>
  )
}
