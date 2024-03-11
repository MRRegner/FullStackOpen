import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'
import { describe } from 'vitest'

describe('<BlogForm />', () => {

    test('<BlogForm /> updates parent state and calls onSubmit with the right details', async () => {
        const createBlog = vi.fn()
        const userTest = userEvent.setup()

        const { container } = render(<BlogForm createBlog={createBlog} />)

        const titleInput = container.querySelector('#title-input')
        const authorInput = container.querySelector('#author-input')
        const urlInput = container.querySelector('#url-input')
        const likesInput = container.querySelector('#likes-input')
        const addButton = screen.getByText('add')

        await userTest.type(titleInput, 'A title...')
        await userTest.type(authorInput, 'An author...')
        await userTest.type(urlInput, 'An input...')
        await userTest.type(likesInput, '10')
        await userTest.click(addButton)

        expect(createBlog.mock.calls).toHaveLength(1)
        expect(createBlog.mock.calls[0][0].title).toBe('A title...')
        expect(createBlog.mock.calls[0][0].author).toBe('An author...')
        expect(createBlog.mock.calls[0][0].url).toBe('An input...')
        expect(createBlog.mock.calls[0][0].likes).toBe('10')
    })

})