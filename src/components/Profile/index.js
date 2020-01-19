import React, { Component } from 'react'
import { Card, Image, Button} from 'semantic-ui-react'

class CardExampleCard extends Component {

  state = {
    avatarIndex: 0
  }

  toggleAvatar = () => this.setState(prev => ({avatarIndex: prev.avatarIndex + 1}))

  render() {
    return (
      <div className="Profile">
        <Card>
          <Image src={`https://api.adorable.io/avatars/${this.state.avatarIndex}`} wrapped ui={false} />
          <Card.Content>
            <Card.Header>Ima Prezime</Card.Header>
            <Card.Description>
              ime_prezime@mail.com
            </Card.Description>
            <Card.Description>
              ime_prezime.website.com
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Button primary onClick={this.toggleAvatar}>Toggle Avatar</Button>
          </Card.Content>
        </Card>
      </div>
    )
  }

}

export default CardExampleCard
