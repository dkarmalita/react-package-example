/**
 * Add elements from newErrors to errorsBuffer. Each element is addad only if
 * is absent in the errorsBuffer.
 * @param  {Array} errorsBuffer - array of unique errors ids
 * @param  {Array} newErrors - array of unique errors ids to add to errorsBuffer
 * @return {Array]} - combined array of errors
 */
export const combineArrays = ( errorsBuffer, newErrors ) => {
  const nextErrors = [].concat( errorsBuffer )

  // Add only errors are not in the list yet
  newErrors.forEach( errId => {
    if( !~errorsBuffer.indexOf( errId )){
    // ref: https://www.joezimjs.com/javascript/great-mystery-of-the-tilde/
      nextErrors.push( errId )
    }
  })

  return nextErrors
}
