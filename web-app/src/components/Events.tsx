import { Card, Button, Input, Row, Col } from 'antd'
import React, { type ChangeEvent } from 'react'
import { events } from '../data/events'

const { Search } = Input

const tabList = [
  {
    key: 'short',
    tab: 'short',
  },
  {
    key: 'full',
    tab: 'full',
  },
]

const Events: React.FC = () => {
  const [activeTabKey, setActiveTabKey] = React.useState<{ [key: string]: string }>({})
  const [query, setQuery] = React.useState('')
  const [currentEvents, setCurrentEvents] = React.useState(events)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const onTabChange = (tabKey: string, eventKey: string) => {
    setActiveTabKey(prev => ({ ...prev, [eventKey]: tabKey }))
  }

  const getCurrentTab = (title: string) => {
    return activeTabKey[title] || 'short'
  }

  const filterEvents = () => {
    const filtered = events.filter(event =>
      event.title
        .split(' ')
        .some(word => word.toLowerCase().startsWith(query.toLowerCase())),
    )
    setCurrentEvents(filtered)
  }

  return (
    <>
      <div className="pb-5 md:pb-10 px-10 md:px-15 lg:px-45">
        <Search
          size="large"
          placeholder="Search"
          onChange={handleChange}
          value={query}
          onSearch={filterEvents}
          onPressEnter={filterEvents}
        />
      </div>

      <Row gutter={[32, 32]}>
        {currentEvents.map(event => {
          const currentTab = getCurrentTab(event.title)

          return (
            <Col key={event.id} xs={24} md={12} lg={8}>
              <Card
                className="h-full"
                title={event.title}
                extra={<Button type="primary">Get QR</Button>}
                tabList={tabList}
                activeTabKey={activeTabKey[event.title]}
                onTabChange={tabKey => onTabChange(tabKey, event.title)}
              >
                {currentTab === 'short' ? event.shortDescription : event.fullDescription}
              </Card>
            </Col>
          )
        })}
      </Row>
    </>
  )
}

export default Events
