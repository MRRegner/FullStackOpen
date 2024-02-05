const dummy = (blogs) => {
  return 1
}

const totalLikes = (list) => {
  //likes = list[0].likes
  const totalLikes = list.reduce((accum, currentVal) => accum + currentVal.likes, 0)
  return totalLikes
}

const favoriteBlog = (list) => {
  const mostLikedBlog = list.reduce((accum, currentVal) => accum.likes > currentVal.likes ? accum : currentVal)

  return mostLikedBlog

}

const mostBlogs = (list) => {

  const reducedList = []
  const counts = []
  list.forEach(function (a) {
    if (!counts[a.author]) {
      counts[a.author] = {
        author: a.author,
        blogs: 0
      }
      reducedList.push(counts[a.author])
    }
    counts[a.author].blogs += 1
  })

  const authorWithMoreBlogs = reducedList.reduce((accum, currentVal) => accum.blogs > currentVal.blogs ? accum : currentVal)

  return authorWithMoreBlogs

}

const mostLikes = (list) => {
  const reducedList = []
  const counts = []
  list.forEach(function (a) {
    if (!counts[a.author]) {
      counts[a.author] = {
        author: a.author,
        likes: 0
      }
      reducedList.push(counts[a.author])
    }
    counts[a.author].likes += a.likes
  })

  const authorWithMoreLikes = reducedList.reduce((accum, currentVal) => accum.likes > currentVal.likes ? accum : currentVal)

  return authorWithMoreLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}