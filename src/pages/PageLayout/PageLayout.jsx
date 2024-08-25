import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import { NotificationMsg } from '../../components/NotificationMsg'

const { Header, Content, Footer } = Layout

export const PageLayout = () => {
  return (
    <Layout style={{ minHeight: '1000vh' }}>
      <NotificationMsg />
      <Header />
      <Content style={{ overflow: 'initial' }}>
        <Outlet />
      </Content>
      <Footer>Ant Design ©{new Date().getFullYear()} Created by Ant UED</Footer>
    </Layout>
  )
}
