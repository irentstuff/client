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
  const [current, setCurrent] = useState('')

  const items = [
    {
      label: 'My Items',
      key: 'myItems',
      icon: <HomeOutlined />,
      style: { display: currentUser.authenticated ? 'inline-block' : 'none' }
    },
    {
      label: 'Message',
      key: 'message',
      icon: <MailOutlined />,
      style: { display: currentUser.authenticated ? 'inline-block' : 'none' }
    },
    {
      label: 'Logout',
      key: 'logout',
      icon: <LogoutOutlined />,
      style: { display: currentUser.authenticated ? 'inline-block' : 'none' }
    },
    {
      label: 'Login',
      key: 'login',
      icon: <LoginOutlined />,
      style: { display: currentUser.authenticated ? 'none' : 'inline-block' }
    }
  ]

  const onClick = (e) => {
    console.log(e)
    navigate('/MyItems')
  }

  const onClickHome = () => {
    navigate('/')
  }

  return (
    <Header>
      <Row>
        <Col onClick={onClickHome} span={6} style={{ color: 'white', opacity: '0.65', display: 'flex', justifyContent: 'flex-start' }}>
          iRentStuff
        </Col>
        <Col span={18} style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Menu onClick={onClick} selectedKeys={[current]} theme='dark' mode='horizontal' items={items} />
        </Col>
      </Row>
    </Header>
  )
}
