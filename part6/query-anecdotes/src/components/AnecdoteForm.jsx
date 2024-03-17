import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useNotificationDispatch } from '../NotificactionContext'

const AnecdoteForm = () => {

  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()
  const newAnecdoteMutation = useMutation({ mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate(
      { content, votes: 0 },
      {onError: () => {
        notificationDispatch({
          type: 'SET NOTIFICATION',
          data: `Your anecdote is too short , it's length must be 5 or more`
        })
      }
      }
      )
    
    notificationDispatch({
      type: 'SET NOTIFICATION',
      data: `You added: '${content}'`
    })
    setTimeout(() => {
      notificationDispatch({
        type: 'RESET NOTIFICATION'
      })
    }, 5000)

}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
