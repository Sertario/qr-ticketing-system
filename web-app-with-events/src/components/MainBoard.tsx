import React from 'react'
import { Layout, Menu } from 'antd'
import Events from './Events'

const { Header, Content, Footer } = Layout

const items = [
  {
    key: 0,
    label: "Current events"
  },
  {
    key: 1,
    label: "Previous events"
  }
]

const MainBoard: React.FC = () => {
  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="rounded-sm w-30 h-10 bg-white mx-10" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['0']}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content className="my-5">
        <Events />
      </Content>
      <Footer>

      </Footer>
    </Layout>
  )
}

export default MainBoard
