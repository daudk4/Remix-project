import {ViewPlugin} from '@remixproject/engine-web'
import * as packageJson from '../../../../../package.json'
import React from 'react' // eslint-disable-line
const profile = {
  name: 'myTab',
  displayName: 'My Custom Tab',
  methods: ['clicked'],
  events: ['buttonClicked'],
  icon: 'assets/img/award.png',
  description: 'Custom component for research purpose',
  kind: '',
  location: 'sidePanel',
  documentation: '',
  version: packageJson.version,
  maintainedBy: 'Daud',
}

export class MyTab extends ViewPlugin {
  constructor() {
    super(profile)
  }

  clicked = () => {
    this.emit('buttonClicked', Math.floor(10 * Math.random() + 1))
  }

  render() {
    return (
      <div className="p-3">
        <h6>Custom plugin</h6>
        <div className="pt-2 flex">
          <p className="mb-1">Generate random number</p>
          <button className="p-1 bg-primary rounded-5" onClick={this.clicked}>
            <h1>Click</h1>
          </button>
        </div>
      </div>
    )
  }
}
