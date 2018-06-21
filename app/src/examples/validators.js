export const isEmailValid = (email) => {

    const result = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/g
        .test(email)
    return result

}
