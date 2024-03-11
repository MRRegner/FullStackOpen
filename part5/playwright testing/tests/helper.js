const loginWith = async (page, username, password)  => {
    await page.getByTestId('username').fill(username)
    await page.getByTestId('password').fill(password)
    await page.getByRole('button', { name: 'login' }).click()
  }

const createBlog = async (page, title, likes) => {
    await page.getByRole('button', { name: 'new blog' }).click()
    await page.locator('#title-input').fill(title)
    await page.locator('#author-input').fill('author')
    await page.locator('#url-input').fill('url')
    await page.locator('#likes-input').fill(likes)

    await page.getByRole('button', { name: 'add' }).click()
}
export { loginWith, createBlog }