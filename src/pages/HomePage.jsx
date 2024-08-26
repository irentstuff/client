/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
/* -------------------------------- COMPONENT ------------------------------- */
import { Row } from 'antd'
import { ItemDisplayCard } from '../components/ItemDisplayCard'

/* -------------------------------------------------------------------------- */
/*                                  HOMEPAGE                                  */
/* -------------------------------------------------------------------------- */
export const HomePage = () => {
  const allItems = useSelector((state) => state.iRentStuff.allItems)

  return (
    <>
      <Row gutter={[16, 24]}>{allItems.length > 0 && allItems.map((item) => ItemDisplayCard(item))}</Row>
    </>
  )
}
