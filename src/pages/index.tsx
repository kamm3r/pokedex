import Image from 'next/future/image';
import Link from 'next/link';
import { Suspense } from 'react';
import Layout from '../components/layout';
import { trpc } from '../utils/trpc';

export default function Home() {
  const { data, status } = trpc.poke.allPokemon.useQuery();

  // console.log('pokemon data', data);

  return (
    <Layout title='Pokedex'>
      <Suspense fallback={null}>
        <ul className='grid grid-cols-2 md:grid-cols-3 gap-2'>
          {status === 'loading' && '(loading)'}
          {data?.map((pokeman, i) => (
            <li key={i}>
              <Link href={`/pokemon/${i + 1}`}>
                <a className='border p-4  capitalize flex flex-col-reverse md:flex-row justify-between items-center text-lg rounded-md border-slate-100 dark:border-slate-700 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-gray-200'>
                  <p>
                    <span className='mr-2 font-bold'>{i + 1}.</span>
                    {pokeman.name}
                  </p>
                  <Image
                    className='w-20 h-20 mr-3'
                    src={pokeman.image}
                    alt={pokeman.name}
                    width={80}
                    height={80}
                    priority
                  />
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </Suspense>
    </Layout>
  );
}

// export const getStaticProps: GetStaticProps = async () => {
//   const pokeApi = new PokemonClient();
//   const allPokemon = await pokeApi.listPokemons(0, 151);

//   const pokemon = allPokemon.results.map((p, index) => {
//     const paddedId = ('00' + (index + 1)).slice(-3);
//     const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;
//     return {
//       ...p,
//       image,
//     };
//   });
//   return {
//     props: { pokemon },
//   };
// };
