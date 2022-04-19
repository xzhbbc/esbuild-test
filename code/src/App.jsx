import React, { Suspense } from 'react'
import Test from './components/Test.jsx'
import './index.scss'

const Check = React.lazy(() => import('./components/Check.jsx'))

const App = () => {
  return (
    <div className="app">
      <Suspense fallback={null}>
        <Check />
      </Suspense>
      <Test />
      测试一下
    </div>
  )
}

export default App