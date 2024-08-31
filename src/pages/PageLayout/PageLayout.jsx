/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import { NotificationMsg } from '../../components/NotificationMsg'
import { CustomHeader } from './Header'

const { Content, Footer } = Layout

/* -------------------------------------------------------------------------- */
/*                                 PAGELAYOUT                                 */
/* -------------------------------------------------------------------------- */
export const PageLayout = () => {
  return (
    <Layout>
      <NotificationMsg />
      <CustomHeader />
      <Content style={{ overflow: 'initial', paddingLeft: '50px', paddingRight: '50px', minHeight: '100vh' }}>
        <Outlet />
      </Content>
      <Footer>Ant Design ©{new Date().getFullYear()} Created by Ant UED</Footer>
    </Layout>
  )
}
