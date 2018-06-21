import React from 'react'
import { DimensionsProvider, withDimensions } from './DimensionsProvider'

const MyComponent_ = (props) => <div>{JSON.stringify(props.dimensions)}</div>
const MyComponent = withDimensions(MyComponent_)

export default () => (<DimensionsProvider><MyComponent /></DimensionsProvider>)
