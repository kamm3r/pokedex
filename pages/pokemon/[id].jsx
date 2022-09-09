import React from 'react';
import Layout from '../../components/layout';
import Link from 'next/link';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';

export default function pokemon({ pokeman }) {
  console.log('pokemon', pokeman);
  return (
    <Layout title={pokeman.name}>
      <p className='mt-10'>
        <Link href='/'>
          <a className='text-2xl underline'>Home</a>
        </Link>
      </p>
      <section className='flex justify-around items-center'>
        {pokeman.id === 1 ? (
          ''
        ) : (
          <a href={pokeman.id - 1}>
            <MdKeyboardArrowLeft className='text-8xl' />
          </a>
        )}
        <div className='border p-4 border-gray my-2 flex flex-col text-lg bg-gray-200 rounded-md w-full'>
          <h1 className='text-4xl mb-2 text-center capitalize'>
            {pokeman.name}
          </h1>
          <img className='mx-auto' src={pokeman.image} alt={pokeman.name} />
          <section className='flex justify-between'>
            <div className='flex-col flex-1'>
              <p>
                <span className='font-bold mr-2'>Weight: </span>
                {pokeman.weight} kg
              </p>
              <p>
                <span className='font-bold mr-2'>Height: </span>
                {pokeman.height} m
              </p>
            </div>
            <div className='flex-col flex-1'>
              <div className='flex flex-row flex-1'>
                <span className='font-bold mr-2'>Types</span>
                {pokeman.types.map((type, i) => (
                  <p key={i} className='mr-1'>
                    {type.type.name.replace(/^\w/, (c) => c.toUpperCase())}
                  </p>
                ))}
              </div>
              <p>
                <span className='font-bold mr-2'>Species</span>
                Seed Pokemon
              </p>
            </div>
          </section>
          <div className='flex space-x-5'>
            <div className='flex-col flex-1'>
              <h2 className='text-2xl mt-6 mb-2'>Base stats</h2>
              {pokeman.stats.map((stat, i) => (
                <div key={i} className='flex justify-between text-base'>
                  <p>{stat.stat.name.replace(/^\w/, (c) => c.toUpperCase())}</p>
                  <p>{stat.base_stat}</p>
                </div>
              ))}
            </div>
            <div className='flex-col flex-1'>
              <h2 className='text-2xl mt-6 mb-2'>Abilities</h2>
              {pokeman.abilities.map((ability, i) => (
                <p key={i} className=' text-base'>
                  {ability.ability.name.replace(/^\w/, (c) => c.toUpperCase())}
                </p>
              ))}
            </div>
          </div>
        </div>
        {pokeman.id < 151 ? (
          <a href={pokeman.id + 1}>
            <MdKeyboardArrowRight className='text-8xl' />
          </a>
        ) : (
          ''
        )}
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
