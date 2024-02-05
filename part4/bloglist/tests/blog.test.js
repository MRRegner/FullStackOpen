const listHelper = require('../utils/list_helper')
const dummyBlogs = require ('../assets/dummyblogs')

describe('total likes', () => {

   
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(dummyBlogs.listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list has several blogs, equals the sum of all their likes', () => {
    const result = listHelper.totalLikes(dummyBlogs.listWithSeveralBlogs)
    expect(result).toBe(36)
  })
    
})

describe('Most liked blog', () =>  {

  test('returns the most liked blog', () => {
    const result = listHelper.favoriteBlog(dummyBlogs.listWithSeveralBlogs)
        
    expect(result).toEqual(
      {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        __v: 0
      })
  })
})

describe('author with more blogs', () => {

  test('returns the author with more blogs', () => {
    const result =listHelper.mostBlogs(dummyBlogs.listWithSeveralBlogs)
    expect(result).toEqual(
      {
        author: 'Robert C. Martin',
        blogs: 3
      })
  })
})

describe('author whose blogs have more likes', () => {

  test('returns whose blogs have more likes', () => {
    const result =listHelper.mostLikes(dummyBlogs.listWithSeveralBlogs)
    expect(result).toEqual(
      {
        author: 'Edsger W. Dijkstra',
        likes: 17
      })
  })
})