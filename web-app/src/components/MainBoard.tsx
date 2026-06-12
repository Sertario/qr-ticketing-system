import React, { useState } from 'react'
import { Layout, Menu } from 'antd'
import Events from './Events'

const { Header, Content, Footer } = Layout

const items = [
  {
    key: 0,
    label: 'Actual events',
  },
  {
    key: 1,
    label: 'Previous events',
  },
]

const MainBoard: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('0')

  return (
    <Layout className="min-h-screen">
      <Header className="flex justify-center bg-[#001529]" style={{ padding: 0 }}>
        <div className="w-full max-w-[1400px] flex items-center px-5 md:px-10">
          <div className="rounded-sm w-30 h-10 bg-white mr-10 shrink-0" />
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[selectedTab]}
            defaultSelectedKeys={['0']}
            onSelect={({ key }) => setSelectedTab(key)}
            items={items}
            style={{ flex: 1, minWidth: 0 }}
          />
        </div>
      </Header>

      <Content className="p-5 md:p-10 max-w-[1400px] mx-auto w-full">
        <Events filterType={selectedTab === '0' ? 'actual' : 'previous'} />
      </Content>
      <Footer className="text-center border-t-2">
        <strong>QR-Ticketing system 2026</strong>
      </Footer>
    </Layout>
  )
}

export default MainBoard
