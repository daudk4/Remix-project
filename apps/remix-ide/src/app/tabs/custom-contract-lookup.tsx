import {ViewPlugin} from '@remixproject/engine-web'
import * as packageJson from '../../../../../package.json'
import React from 'react' // eslint-disable-line
import {CustomContractLookup} from '@remix-ui/custom-contract-lookup'
import {PluginViewWrapper} from '@remix-ui/helper'
const profile = {
  name: 'contract-lookup',
  displayName: 'Contract Lookup ',
  methods: [''],
  events: [''],
  icon: 'assets/img/contract.png',
  description: 'Custom plugin for contract lookup',
  kind: '',
  location: 'sidePanel',
  documentation: '',
  version: packageJson.version,
  maintainedBy: 'Daud',
}

export class ContractLookup extends ViewPlugin {
  data: any
  dispatch: React.Dispatch<any> = () => {}
  constructor() {
    super(profile)
    this.data = {}
  }

  setDispatch(dispatch) {
    this.dispatch = dispatch
    this.renderComponent()
  }

  renderComponent() {
    this.dispatch({
      plugin: this,
    })
  }

  render() {
    return (
      <div id="fileExplorerView">
        <PluginViewWrapper plugin={this} />
      </div>
    )
  }

  updateComponent(state:any) {
    return (
      <div className="p-3">
        <CustomContractLookup plugin={state.plugin}/>
      </div>
    )
  }
}
