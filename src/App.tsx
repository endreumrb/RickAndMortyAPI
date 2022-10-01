import axios from 'axios'
import { useEffect, useState } from 'react'
import Character, { CharacterType } from './Character'
import { IoArrowBackOutline, IoArrowForwardOutline } from 'react-icons/io5'
import Header from './Header'

interface CharacterTypeWithId extends CharacterType {
  id: number
}

function App() {
  const [characters, setCharacters] = useState<CharacterTypeWithId[]>([])
  const [page, setPage] = useState<number>(1)

  const handleChangePage = (anotherPage: number) => {
    if (anotherPage < 43 && anotherPage > 0) {
      setPage(anotherPage)
    }
  }

  useEffect(() => {
    axios
      .get(`https://rickandmortyapi.com/api/character/?page=${page}`)
      .then(function (response) {
        setCharacters(response.data.results)
      })
      .catch(function (error) {
        console.error(error)
      })
  }, [page])

  return (
    <>
      <Header />
      <main className="flex justify-center p-5">
        <div className="container flex items-center justify-center flex-col gap-5">
          <div className="flex items-center justify-center flex-col gap-5">
            <h1 className="text-xl bg-neutral-50 py-2 px-6 rounded-full text-neutral-800 font-medium">
              Lista de Personagens
            </h1>
            <div className="flex items-center float-left gap-3">
              <button
                className="disabled:opacity-40"
                onClick={() => {
                  handleChangePage(page - 1)
                }}
                disabled={page <= 1}
              >
                <IoArrowBackOutline size={24} />
              </button>
              {page > 1 && (
                <>
                  <span className="text-lg cursor-default">...</span>
                  <button
                    onClick={() => {
                      handleChangePage(page - 1)
                    }}
                  >
                    <span className="text-lg">{page - 1}</span>
                  </button>
                </>
              )}
              <span className="text-lg cursor-default bg-neutral-100 h-6 w-6 flex items-center justify-center rounded-sm text-neutral-800">
                {page}
              </span>
              {page < 42 && (
                <>
                  <button
                    onClick={() => {
                      handleChangePage(page + 1)
                    }}
                  >
                    <span className="text-lg">{page + 1}</span>
                  </button>
                  <span className="text-lg cursor-default">...</span>
                </>
              )}
              <button
                className="disabled:opacity-40"
                onClick={() => {
                  handleChangePage(page + 1)
                }}
                disabled={page >= 42}
              >
                <IoArrowForwardOutline size={24} />
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-5 justify-center">
            {characters.map((char) => {
              return (
                <Character
                  key={char.id}
                  name={char.name}
                  image={char.image}
                  species={char.species}
                  status={char.status}
                />
              )
            })}
          </div>
        </div>
      </main>
    </>
  )
}

export default App
