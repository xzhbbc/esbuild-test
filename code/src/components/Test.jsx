import React, {useEffect} from 'react'
import './index.scss'

const Test = () => {
  
  useEffect(() => {
    console.log('text组件刷新')
  }, [])

  return (
    <div className='test'>
      测试组件
    </div>
  )
}

export default React.memo(Test)