import React, { Component } from 'react'
// ref: https://stackoverflow.com/a/34475071

const initialValue = {}

const DimensionsContext = React.createContext(initialValue)

export class DimensionsProvider extends Component {

  state = { dimensions: initialValue }
  updateDimensions = () => {

      const w = window
      const d = document
      const documentElement = d.documentElement
      const body = d.getElementsByTagName('body')[0]
      const width = w.innerWidth || documentElement.clientWidth || body.clientWidth
      const height = w.innerHeight || documentElement.clientHeight || body.clientHeight
      const dimensions = { width, height }
      this.setState({ dimensions })

  };
  componentWillMount () {

      this.updateDimensions()

  };
  componentDidMount () {

      window.addEventListener('resize', this.updateDimensions)

  };
  componentWillUnmount () {

      window.removeEventListener('resize', this.updateDimensions)

  };
  render () {

      return (
          <DimensionsContext.Provider value={this.state.dimensions}>
              {this.props.children}
          </DimensionsContext.Provider>
      )

  }

}

export const withDimensions = AComponent =>
    class extends React.Component {

  render = () => {

      return (
          <DimensionsContext.Consumer>
              { dimensions => <AComponent {...this.props} dimensions={dimensions} /> }
          </DimensionsContext.Consumer>
      )

  }

    }
