import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'

export const UnauthorisedPage = () => {
  const navigate = useNavigate()

  return (
    <Result
      status='403'
      title='403'
      subTitle='Sorry, you are unauthorised to view this page.'
      extra={
        <Button type='primary' onClick={() => navigate('/Login')}>
          Login
        </Button>
      }
    />
  )
}
