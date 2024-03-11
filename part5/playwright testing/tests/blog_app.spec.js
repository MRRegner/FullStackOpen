const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http:localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })

    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Jim Raynor',
        username: 'jim',
        password: 'raynor'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    // ...
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      
      await page.getByTestId('username').fill('mluukkai')
      await page.getByTestId('password').fill('salainen')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByTestId('username').fill('badUser')
      await page.getByTestId('password').fill('badPassword')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('Wrong user or password')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
    })
  
    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'new blog' }).click()
      await page.locator('#title-input').fill('new blog era')
      await page.locator('#author-input').fill('author')
      await page.locator('#url-input').fill('url')
      await page.locator('#likes-input').fill('22')

      await page.getByRole('button', { name: 'add' }).click()

      await expect(page.getByText('Added new blog era by author')).toBeVisible()
      await expect(page.getByText('new blog eraviewhideurllikes')).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {

      await createBlog(page, 'Note to be liked', '1', true)

      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'like' }).click()

      await expect(page.getByText('Updated Note to be liked by author')).toBeVisible()
      await expect(page.getByText('likes 2')).toBeVisible()
    })

    test('a blog can be deleted', async ({ page }) => {

      await createBlog(page, 'Note to be deleted', '1', true)
      await page.reload();

      await page.getByRole('button', { name: 'view' }).click()
      page.on('dialog', dialog => dialog.accept())
      await page.getByRole('button', { name: 'remove' }).click()
      

      await expect(page.getByText('Deleted Note to be deleted by author')).toBeVisible()

    })

    test('only the user who added the blog sees the blogs remove button', async ({ page }) => {

      await createBlog(page, 'A note by Matti Luukkainen', '1', true)

      await page.getByRole('button', { name: 'Logout' }).click()

      await loginWith(page, 'jim', 'raynor')
      await createBlog(page, 'A note by Jim Raynor', '1', true)
      await page.reload();
      
      const viewButtons = await page.getByRole('button', { name: 'view' }).all()
      
      await viewButtons[1].click()
      await viewButtons[0].click()
      await expect(page.getByTestId('A note by Matti Luukkainen')).toBeHidden()
      await expect(page.getByTestId('A note by Jim Raynor')).toBeVisible()
      
    })

    test('Blogs are arranged according to likes, most likes first', async ({ page }) => {

      await createBlog(page, 'A blog with 1 like', '1', true)
      await createBlog(page, 'A blog with 2 likes', '2', true)
      await createBlog(page, 'A blog with 3 likes', '3', true)
      await createBlog(page, 'A blog with 4 likes', '4', true)

      const blogs = await page.getByTestId('title').all()

      console.log('hola')
      console.log(await blogs[0].innerText())
      expect(await blogs[0].innerText()).toBe('A blog with 4 likes')
      
    })

  })


})