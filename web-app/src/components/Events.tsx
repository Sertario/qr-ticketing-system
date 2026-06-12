import {
  Card,
  Button,
  Input,
  Row,
  Col,
  message,
  Spin,
  Space,
  Typography,
  Form,
  Modal,
} from 'antd'
import { EnvironmentOutlined, CalendarOutlined } from '@ant-design/icons'
import React, { useEffect, useMemo, useState, type ChangeEvent } from 'react'
import type { Event } from '../types/types'
import axios from 'axios'

const { Search } = Input
const { Text } = Typography

const tabList = [
  {
    key: 'short',
    tab: 'Overview',
  },
  {
    key: 'full',
    tab: 'Details',
  },
]

interface EventsProps {
  filterType: 'actual' | 'previous'
}

const Events: React.FC<EventsProps> = ({ filterType }) => {
  const [activeTabKey, setActiveTabKey] = useState<{ [key: string]: string }>({})
  const [query, setQuery] = useState('')
  const [allEvents, setAllEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [purchaseLoading, setPurchaseLoading] = useState(false)
  const [form] = Form.useForm()

  const handleGetQR = (event: Event) => {
    setSelectedEvent(event)
    setIsModalVisible(true)
  }

  const handlePurchase = async (values: { email: string }) => {
    if (!selectedEvent) return

    setPurchaseLoading(true)
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/tickets/purchase`,
        {
          eventId: selectedEvent.id,
          email: values.email,
        },
      )

      const base64Data = response.data
      downloadQRCode(base64Data, `ticket-${selectedEvent.title}.png`)
      message.success('Ticket purchased successfully! Your QR code is downloading.')

      setIsModalVisible(false)
      form.resetFields()
    } catch {
      message.error('Purchase failed. Please try again.')
    } finally {
      setPurchaseLoading(false)
    }
  }

  const downloadQRCode = (base64String: string, fileName: string) => {
    const link = document.createElement('a')
    link.href = `data:image/png;base64,${base64String}`
    link.download = fileName

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get<Event[]>(
          `${import.meta.env.VITE_API_BASE_URL}/events`,
        )

        setAllEvents(response.data)
      } catch {
        message.error('Failed to load events from server')
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  const displayedEvents = useMemo(() => {
    const now = new Date()

    return allEvents
      .filter(event => {
        if (!event.date) return true
        const eventDate = new Date(event.date)

        return filterType === 'actual' ? eventDate >= now : eventDate < now
      })
      .filter(event => event.title.toLowerCase().includes(query.toLowerCase()))
  }, [allEvents, filterType, query])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const onTabChange = (tabKey: string, eventId: string) => {
    setActiveTabKey(prev => ({ ...prev, [eventId]: tabKey }))
  }

  const getCurrentTab = (eventId: string) => {
    return activeTabKey[eventId] || 'short'
  }

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" tip="Loading events..." />
      </div>
    )
  }

  return (
    <>
      <div className="pb-5 md:pb-10 px-10 md:px-15 lg:px-45">
        <Search
          size="large"
          placeholder={`Search ${filterType} events...`}
          onChange={handleChange}
          value={query}
        />
      </div>

      <Row gutter={[32, 32]}>
        {displayedEvents.map(event => {
          const currentTab = getCurrentTab(event.id)

          return (
            <Col key={event.id} xs={24} md={12} lg={8}>
              <Card
                className="h-full"
                title={event.title}
                extra={
                  filterType === 'actual' ? (
                    <Button type="primary" onClick={() => handleGetQR(event)}>
                      Purchase ticket
                    </Button>
                  ) : null
                }
                tabList={tabList}
                activeTabKey={currentTab}
                onTabChange={tabKey => onTabChange(tabKey, event.id)}
                styles={{ body: { flex: 1, display: 'flex', flexDirection: 'column' } }}
              >
                <div className="flex-1 mb-6 leading-relaxed" style={{ fontSize: '16px' }}>
                  {currentTab === 'short'
                    ? event.shortDescription
                    : event.fullDescription}
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <Space orientation="vertical" size={2} className="w-full">
                    <Text
                      type="secondary"
                      style={{ fontSize: '14px', display: 'flex', alignItems: 'center' }}
                    >
                      <EnvironmentOutlined
                        style={{ marginRight: '8px', color: '#1677ff' }}
                      />
                      {event.location || 'Location TBA'}
                    </Text>

                    <Text
                      type="secondary"
                      style={{ fontSize: '14px', display: 'flex', alignItems: 'center' }}
                    >
                      <CalendarOutlined
                        style={{ marginRight: '8px', color: '#1677ff' }}
                      />
                      {event.date
                        ? new Date(event.date)
                            .toLocaleString('en-GB', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: false,
                            })
                            .replace(',', '')
                        : 'Date TBD'}
                    </Text>
                  </Space>
                </div>
              </Card>
            </Col>
          )
        })}
      </Row>

      <Modal
        title="Get Your Ticket"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        destroyOnHidden
      >
        <Form form={form} layout="vertical" onFinish={handlePurchase} className="mt-4">
          <Form.Item label="Event">
            <Input value={selectedEvent?.title} disabled style={{ color: 'black' }} />
          </Form.Item>

          <Form.Item
            name="email"
            label="Your Email Address"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <Input placeholder="example@mail.com" />
          </Form.Item>

          <Typography.Paragraph type="secondary" className="text-xs">
            The QR code will be generated and downloaded automatically after confirmation.
          </Typography.Paragraph>

          <Form.Item className="mb-0 text-right">
            <Space>
              <Button onClick={() => setIsModalVisible(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit" loading={purchaseLoading}>
                Confirm & Download QR
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default Events
