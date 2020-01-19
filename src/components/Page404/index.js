import React from 'react'
import { useLocation } from "react-router-dom"
import { Header, Icon, Segment } from 'semantic-ui-react'

const Page404 = () => {
  let location = useLocation()
  return (
    <div className="page404">
     <Segment placeholder>
      <Header icon>
        <Icon name='exclamation' color="red" />
        <Header as='h1'>404 Page not find!</Header> No content for {location.pathname}
      </Header>
    </Segment>
    </div>
  )
}

export default Page404
