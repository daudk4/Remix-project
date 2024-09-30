import {ViewPlugin} from '@remixproject/engine-web'
import * as packageJson from '../../../../../package.json'
import React from 'react' // eslint-disable-line
import {PluginViewWrapper} from '@remix-ui/helper'

const profile = {
  name: 'secondTab',
  displayName: 'Second Plugin',
  methods: [''],
  evennts: '',
  icon: 'assets/img/medal.png',
  description: 'Custom second component for research purpose',
  kind: '',
  location: 'mainPanel',
  documentation: '',
  version: packageJson.version,
  maintainedBy: 'Remix',
}

export class SecondTab extends ViewPlugin {
  messageToDisplay: number
  dispatch: React.Dispatch<any> = () => {}

  constructor() {
    super(profile)
  }

  renderComponent() {
    this.dispatch({
      messageToDisplay: this.messageToDisplay,
    })
  }

  onActivation(): void {
    this.on('myTab', 'buttonClicked', (data: number) => {
      this.messageToDisplay = data
      this.renderComponent()
    })
  }

  setDispatch(dispatch: React.Dispatch<any>) {
    this.dispatch = dispatch
  }

  render() {
    return (
      <div className="p-3">
        <h6>Listening for an event from my custom plugin.</h6>
        <PluginViewWrapper plugin={this} />
      </div>
    )
  }

  updateComponent(state: any) {
    return <h6>Random number: {state.messageToDisplay}</h6>
  }
}
