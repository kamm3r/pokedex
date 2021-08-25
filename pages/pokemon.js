import React from 'react';
import Layout from '../components/layout';
import Link from 'next/Link';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';

export default function pokemon({ pokeman }) {
  return (
    <Layout title={pokeman.name}>
      <section className='flex justify-around items-center'>
        <MdKeyboardArrowLeft className='text-8xl' />
        <div className='border p-4 border-gray my-2 flex flex-col text-lg bg-gray-200 rounded-md w-full'>
          <h1 className='text-4xl mb-2 text-center capitalize'>
            {pokeman.name}
          </h1>
          <img className='mx-auto' src={pokeman.image} alt={pokeman.name} />
          <p>
            <span className='font-bold mr-2'>Weight: </span>
            {pokeman.weight} kg
          </p>
          <p>
            <span className='font-bold mr-2'>Height: </span>
            {pokeman.height} m
          </p>
          <div className='flex'>
            <div className='flex-col mr-10'>
              <h2 className='text-2xl mt-6 mb-2'>Types: </h2>
              {pokeman.types.map((type, index) => (
                <p key={index}>{type.type.name}</p>
              ))}
            </div>
            <div className='flex-col'>
              <h2 className='text-2xl mt-6 mb-2'>Abilities: </h2>
              {pokeman.abilities.map((ability, index) => (
                <p key={index}>{ability.ability.name}</p>
              ))}
            </div>
          </div>
          <p className='mt-10 text-center'>
            <Link href='/'>
              <a className='text-2xl underline'>Home</a>
            </Link>
          </p>
        </div>
        <MdKeyboardArrowRight className='text-8xl' />
      </section>
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  const id = query.id;
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokeman = await res.json();
    const paddedId = ('00' + id).slice(-3);
    pokeman.image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;
    return {
      props: { pokeman },
    };
  } catch (err) {
    console.error(err);
  }
}
