import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { describe } from 'vitest'

describe('<Blog />', ()=>{

    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'some guy',
        url: 'url.com',
        likes: '10',
        id: '123',
        user:{
          name:'charles'
        }  
      }

      const user = {
          name:'charles'
      }
    
      const { container } = render(<Blog blog={blog} user={user}/>)
      
    test('renders blog tittle but does not render details by default', () => {

        const div = container.querySelector('#blogDetails')
        const element = screen.getByText('Component testing is done with react-testing-library')

        expect(element).toBeDefined()
        expect(div).toHaveStyle('display: none')
      })

      test('renders details when view button is clicked', async() => {
        render(<Blog blog={blog} user={user}/>)

        const userTest = userEvent.setup()
        const viewButton = screen.getByText('view')

        await userTest.click(viewButton)

        const url = screen.getByText(
          'url.com', { exact: false }
        )
        const likes = screen.getByText(
          '10', { exact: false }
        )

        expect(url).toBeDefined()
        expect(likes).toBeDefined()      
      })

      test('if like button is clicked twice, the event handler is called twice', async() => {
        const mockHandler = vi.fn()

        render(<Blog blog={blog} user={user} updateBlog={mockHandler}/>)

        const userTest = userEvent.setup()
        const viewButton = screen.getByText('view')

        await userTest.click(viewButton)

        const likeButton = screen.getByText('like')

        await userTest.click(likeButton)
        await userTest.click(likeButton)
        
        expect(mockHandler.mock.calls).toHaveLength(2)    
      })

})