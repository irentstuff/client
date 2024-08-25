import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { defaultTest } from '../redux/reducer'

function HomePage() {
  const test = useSelector((state) => state.iRentStuff.value)
  const dispatch = useDispatch()

  console.log(test)

  useEffect(() => {
    dispatch(defaultTest())
  }, [])

  return <div>WELCOME TO IRENTSTUFF</div>
}
export default HomePage
