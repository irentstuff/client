/* -------------------------------------------------------------------------- */
/*                                   Imports                                  */
/* -------------------------------------------------------------------------- */
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useState } from 'react'
/* ---------------------------------- antd ---------------------------------- */
import { HomeOutlined, MailOutlined, LogoutOutlined, LoginOutlined } from '@ant-design/icons'
import { Layout, Menu, Row, Col } from 'antd'

const { Header } = Layout

/* -------------------------------------------------------------------------- */
/*                                   HEADER                                   */
/* -------------------------------------------------------------------------- */
export const CustomHeader = () => {
  const navigate = useNavigate()
  const currentUser = useSelector((state) => state.iRentStuff.currentUser)
  const [openMenu, setOpenMenu] = useState('')

  const items = [
    {
      label: 'My Items',
      key: 'MyItems',
      icon: <HomeOutlined />,
      style: { display: currentUser.authenticated ? 'inline-block' : 'none' }
    },
    {
      label: 'Message',
      key: 'Message',
      icon: <MailOutlined />,
      style: { display: currentUser.authenticated ? 'inline-block' : 'none' }
    },
    {
      label: 'Logout',
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

  const openHomePage = () => {
    navigate('/')
    setOpenMenu('')
  }

  const openMenuItem = (e) => {
    navigate(`${e.key}`)
    setOpenMenu(e.key)
  }

  return (
    <Header>
      <Row>
        <Col
          onClick={(e) => openHomePage(e)}
          span={6}
          style={{ color: 'white', opacity: '0.65', display: 'flex', justifyContent: 'flex-start' }}
        >
          iRentStuff
        </Col>
        <Col span={18} style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Menu onClick={(e) => openMenuItem(e)} theme='dark' mode='horizontal' items={items} selectedKeys={openMenu} />
        </Col>
      </Row>
    </Header>
  )
}
