import { Flex, Card, Button, Input } from 'antd'
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
      <div className="pb-5 px-100">
        <Search
          size="large"
          placeholder="Search"
          onChange={handleChange}
          value={query}
          onSearch={filterEvents}
          onPressEnter={filterEvents}
        />
      </div>

      <Flex wrap gap={32} justify="center">
        {currentEvents.map(event => {
          const currentTab = getCurrentTab(event.title)

          return (
            <Card
              key={event.id}
              className="w-100"
              title={event.title}
              extra={<Button type="primary">Get QR</Button>}
              tabList={tabList}
              activeTabKey={activeTabKey[event.title]}
              onTabChange={tabKey => onTabChange(tabKey, event.title)}
            >
              {currentTab === 'short' ? event.shortDescription : event.fullDescription}
            </Card>
          )
        })}
      </Flex>
    </>
  )
}

export default Events
