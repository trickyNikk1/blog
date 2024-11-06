import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import { PersistGate } from 'redux-persist/integration/react'

import store, { persistor } from '@store/index'
import './index.scss'
import { App } from '@components/app'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff',
          colorError: ' #F5222D',
          borderRadius: 4,
          borderRadiusSM: 2,
          paddingXS: 2,
          marginLG: 5,
          controlHeight: 40,
        },
      }}
    >
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <App />
          </Router>
        </PersistGate>
      </Provider>
    </ConfigProvider>
  </React.StrictMode>
)
