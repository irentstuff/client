/* -------------------------------------------------------------------------- */
/*                                   Imports                                  */
/* -------------------------------------------------------------------------- */
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
/* --------------------------------- amplify -------------------------------- */
import { signOut } from 'aws-amplify/auth'
/* ---------------------------------- antd ---------------------------------- */
import { HomeOutlined, MailOutlined, LogoutOutlined, LoginOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { Layout, Menu, Row, Col, Typography } from 'antd'
import { updateSuccess, updateCurrentUser } from '../../redux/reducer'

const { Header } = Layout
const { Title } = Typography

/* -------------------------------------------------------------------------- */
/*                                   HEADER                                   */
/* -------------------------------------------------------------------------- */
export const CustomHeader = () => {
  const dispatch = useDispatch()
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

  const openMenuItem = async (e) => {
    if (e.key != 'Logout') {
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
        <Col span={15} style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Menu onClick={(e) => openMenuItem(e)} theme='dark' mode='horizontal' items={items} selectedKeys={openMenu} />
        </Col>
        <Col
          onClick={(e) => openHomePage(e)}
          span={2}
          offset={1}
          style={{ color: 'white', opacity: '0.65', display: 'flex', justifyContent: 'flex-start' }}
        >
          {currentUser?.userDetails?.username ? currentUser?.userDetails?.username : 'guest'}
        </Col>
      </Row>
    </Header>
  )
}
