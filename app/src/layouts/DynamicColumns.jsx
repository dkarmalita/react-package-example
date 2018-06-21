import React, { Component } from 'react'

// ref:
// * http://alistapart.com/article/holygrail
// * http://alistapart.com/d/holygrail/example_1.html

export class DynamicColumns extends Component {

  renderColumns = () => {

      const columns = []
      let columnIdx = 0
      for (let i = (this.props.columns || 2) - 1; i >= 0; i--) {

          const r = 100, g = 100, b = 100, a = 0.5
          columns.push(
              <div
                  style={{
                      display: 'inline-block',
                      width: '50%',
                      height: '100vh',
                      background: `rgba(${r},${g},${b},${a})`,
                  }}
                  key={`${columnIdx++}`
                  } />
          )

      }
      return columns

  }
  render () {

      return this.renderColumns()

  }

}
