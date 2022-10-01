import React from 'react'

export interface CharacterType {
  name: string
  image: string
  species: string
  status: string
}

const Character = ({ name, image, species, status }: CharacterType) => {
  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg bg-neutral-900 p-2">
      <img
        className="w-full rounded border-2 border-neutral-600"
        src={image}
        alt="Sunset in the mountains"
      />
      <div className="py-2 flex flex-col">
        <span className="font-bold text-xl">{name}</span>
        <span className="text-md">
          {species} | {status}
        </span>
      </div>
    </div>
  )
}

export default Character
