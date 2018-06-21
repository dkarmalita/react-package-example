const logStyle = 'background: #222; color: #bada55'

export function logger( ...params ){
  // eslint-disable-next-line
  console.log(`%c${this.constructor.name}`, logStyle, ...params)
}
