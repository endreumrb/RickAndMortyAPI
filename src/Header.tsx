import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { BsSearch } from 'react-icons/bs'

interface CharProps {
  name: string
}

const Header: React.FC = () => {
  const [allCharacters, setAllCharacters] = useState<CharProps[]>([])

  useEffect(() => {
    axios
      .get(`https://rickandmortyapi.com/api/character`)
      .then(function (response) {
        const endpoints = []

        for (let i = 1; i <= response.data.info.pages; i++) {
          endpoints.push(`https://rickandmortyapi.com/api/character?page=${i}`)
        }

        axios
          .all(endpoints.map((endpoint) => axios.get(endpoint)))
          .then((res) => {
            const totalChar: CharProps[] = []

            res.forEach((result) => {
              const personList = result.data.results

              for (let i = 0; i < personList.length; i++) {
                totalChar.push(result.data.results[i].name)
              }
            })

            setAllCharacters(totalChar)
          })
      })
      .catch(function (error) {
        console.error(error)
      })
  }, [])

  return (
    <header className="w-full h-12 bg-neutral-900 flex justify-center">
      <div className="container flex items-center justify-between">
        <div>Logo</div>
        <div className="bg-neutral-800 flex items-center px-2 gap-2 rounded w-1/5 focus-within:outline focus-within:outline-2 focus-within:outline-neutral-600">
          <BsSearch className="" />
          <input
            className="bg-transparent py-1 w-full focus:shadow-none"
            type="text"
            placeholder="Pesquisar..."
            onChange={(e) => console.log(e.target.value)}
          />
        </div>
      </div>
    </header>
  )
}

export default Header
