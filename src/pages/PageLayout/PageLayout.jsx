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
      <Content style={{ overflow: 'initial', paddingLeft: '20px', paddingRight: '20px', minHeight: '100vh' }}>
        <Outlet />
      </Content>
      <Footer>©{new Date().getFullYear()} Copyright IRentStuff</Footer>
    </Layout>
  )
}
