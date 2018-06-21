/**
 * Email validator based on 'http://emailregex.com/'. Additional restrictions
 * (implemented by additional tests):
 * @param  {String} email - email to test
 * @return {Boolean}      - terue if email is valide, false - in another case.
 * @examples
 *
 *   VALID EMAILS
 *   index.js?6d2b:30 test@test.com - valid
 *   index.js?6d2b:30 tes.t@test.cc - valid
 *   index.js?6d2b:30 dimaA@test.cc - valid * [x] upper case is allowed
 *   index.js?6d2b:30 a12@test.cc - valid * [x] numbers before @ are allowed
 *   index.js?6d2b:42
 *
 *   INVALID EMAILS
 *   index.js?6d2b:30 test - invalid
 *   index.js?6d2b:30 test@test - invalid
 *   index.js?6d2b:30 test@test.c - invalid
 *   index.js?6d2b:30 test@test.co.m - invalid * [x] the only dot  is allowed in domain part (after `@`)
 *   index.js?6d2b:30 test@test.c1 - invalid * [x] only letterst in root domain part are allowed
 *   index.js?6d2b:30 mailto:test@mailinator.com - invalid * [x] semicolumns are prohebited
 */
const isValidEmail = (value) => { // v20180524

  // eslint-disable-next-line
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(value)

}

const testEmail = (email, comment) => {

    console.log(
        email,
        isValidEmail(email) ? '- valid' : '- invalid',
        comment ? `* ${comment}` : ''
    )

}

// ------------------------------------------------ //

console.log('\nVALID EMAILS')
testEmail('test@test.com')
testEmail('tes.t@test.cc')
testEmail('dimaA@test.cc', '[x] upper case is allowed')
testEmail('a12@test.cc', '[x] numbers before @ are allowed')

console.log('\nINVALID EMAILS')
testEmail('test')
testEmail('test@test')
testEmail('test@test.c')
testEmail('test@test.co.m', '[x] the only dot  is allowed in domain part (after `@`)')
testEmail('test@test.c1', '[x] only letterst in root domain part are allowed')
testEmail('mailto:test@mailinator.com', '[x] semicolumns are prohebited')
