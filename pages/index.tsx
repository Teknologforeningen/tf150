import type { GetServerSideProps, NextPage } from 'next'

import TF150Logo from '../components/TF150LogoUtanText'
import TF150LogoText from '../components/TF150LogoBaraText'
import Timeline from '../components/eventline/Timeline'
import { Event as TimelineEvent } from '../types'
import Navbar from '../components/navbar/Navbar'
import Info from '../components/bottom/Info'
import Column from '../components/Column'
import useWindowSize from '../hooks/useWindowSize'
import { useState } from 'react'

interface Props {
  events: TimelineEvent[]
  isHomePage: boolean
}

const Home: NextPage<Props> = ({ events, isHomePage }) => {
  const { width, isMobile } = useWindowSize()
  const [horizontalPosition, setHorizontalPositition] = useState(0)

  return (
    <div style={{ display: 'flex' }}>
      <div className={'main-body'}>
        {isHomePage && <Navbar isMobile={isMobile} />}
        <Column>
          <div className={'logo'} style={{ position: 'relative' }}>
            <TF150Logo
              width={width}
              isMobile={isMobile}
              degrees={horizontalPosition / 10}
            />
            <TF150LogoText
              width={width}
              isMobile={isMobile}
              style={{ position: 'absolute', top: '39%', left: '24%' }}
            />
          </div>
          <Timeline
            events={events}
            setHorizontalPosition={setHorizontalPositition}
          />
          {isHomePage && <Info isMobile={isMobile} />}
        </Column>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  // Get posts from API
  const res = await fetch(`${process.env.BACKEND_URL}/events`)
  const events = await res.json()
  return {
    props: {
      events: events,
      isHomePage: process.env.ISHOMEPAGE === 'true',
    },
  }
}

export default Home
