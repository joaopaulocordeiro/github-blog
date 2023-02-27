import { SearchInputContainer } from './style'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const searchFormSchema = z.object({
  query: z.string(),
})

type SearchFormInput = z.infer<typeof searchFormSchema>

interface SearchInputsProps {
  postsLength: number
  getPosts: (query?: string) => Promise<void>
}

export function SearchInput({ getPosts, postsLength }: SearchInputsProps) {
  const { register, handleSubmit } = useForm<SearchFormInput>({
    resolver: zodResolver(searchFormSchema),
  })

  async function handleSearchPosts(data: SearchFormInput) {
    await getPosts(data.query)
  }

  return (
    <SearchInputContainer onSubmit={handleSubmit(handleSearchPosts)}>
      <header>
        <h3>Publicações</h3>

        <span>{postsLength} publicações</span>
      </header>

      <input type="text" placeholder="buscar conteúdo" {...register('query')} />
    </SearchInputContainer>
  )
}
