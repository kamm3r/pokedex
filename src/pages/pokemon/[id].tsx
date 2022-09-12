import { InferGetServerSidePropsType, InferGetStaticPropsType } from 'next';
import Image from 'next/future/image';
import Link from 'next/link';
import { EvolutionClient, PokemonClient } from 'pokenode-ts';
import { Suspense } from 'react';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';
import Layout from '../../components/layout';
import { trpc } from '../../utils/trpc';

const ImageItem = ({
  image,
  alt,
  text,
}: {
  image: number;
  alt: string;
  text: string;
}) => {
  return (
    <li className='flex flex-col justify-center items-center px-4 py-2 border border-slate-200 dark:border-slate-600 bg-slate-300 dark:bg-slate-700'>
      <Image
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${image}.png`}
        alt={alt}
        width={300}
        height={300}
        priority
      />
      <p className='capitalize'>{text}</p>
    </li>
  );
};

export default function Pokemon({ id }: { id: string }) {
  const evoId = '7';
  const { data, status } = trpc.poke.getPokemon.useQuery({ id, evoId });
  // console.log('pokemon', data);
  // console.log('pokemon evolution', data?.evolution);
  return (
    <Layout title={data?.name.replace(/^\w/, (c: any) => c.toUpperCase())}>
      <Suspense fallback={null}>
        {status === 'loading' && '(loading)'}
        <section className='flex justify-around items-center relative p-20 rounded-md border border-slate-100 dark:border-slate-700 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-gray-200'>
          {data?.id === 1 ? (
            ''
          ) : (
            <Link href={new Number(data?.id! - 1).toString()}>
              <a className='absolute left-2'>
                <MdKeyboardArrowLeft className='text-4xl' />
              </a>
            </Link>
          )}
          <div className='grid grid-cols-3 w-full'>
            <figure className='flex flex-col justify-center items-center col-span-1'>
              <h1 className='text-4xl mb-2 text-center capitalize'>
                {data?.name}
              </h1>
              <Image
                className=''
                src={data?.image!}
                alt='pokemon'
                width={300}
                height={300}
                priority
              />
            </figure>
            <div className='flex flex-wrap gap-5 col-span-2'>
              <ul className='flex flex-col flex-1'>
                <h2 className='text-2xl mb-2'>General</h2>
                <li className='flex justify-between'>
                  <span className='text-base mr-2'>Height: </span>
                  <p>{data?.height} ft</p>
                </li>
                <li className='flex justify-between'>
                  <span className='text-base mr-2'>Weight: </span>
                  <p>{data?.weight} lb</p>
                </li>
                <li className='flex flex-row justify-between'>
                  <span className='text-base mr-2'>Types</span>
                  {data?.types?.map((type: any, i: number) => (
                    <p key={i} className='mr-1 capitalize'>
                      {type.type.name}
                    </p>
                  ))}
                </li>
                <li className='flex flex-wrap justify-between'>
                  <span className='text-base mr-2'>Abilities</span>
                  {data?.abilities?.map((ability: any, i: number) => (
                    <p key={i} className='text-base capitalize'>
                      {ability.ability.name}
                    </p>
                  ))}
                </li>
              </ul>
              <ul className='flex flex-col flex-1'>
                <h2 className='text-2xl mb-2'>Base stats</h2>
                {data?.stats?.map((stat: any, i: number) => (
                  <li key={i} className='flex justify-between text-base'>
                    <p className='capitalize'>{stat.stat.name}</p>
                    <p>{stat.base_stat}</p>
                  </li>
                ))}
              </ul>
              {/* fix the evolution path */}
              {/* <ul className='flex gap-5 flex-[1_1_100%]'>
                {status === 'loading' && '(loading)'}
                {data?.evolution.chain.species.name ? (
                  <ImageItem
                    image={parseFloat(id)}
                    alt='pokemon'
                    text={data?.evolution.chain.species.name!}
                  />
                ) : (
                  ''
                )}
                {data?.evolution.chain.evolves_to[0]?.species.name ? (
                  <ImageItem
                    image={parseFloat(id) + 1}
                    alt='pokemon'
                    text={data?.evolution.chain.evolves_to[0]?.species.name!}
                  />
                ) : (
                  ''
                )}
                {data?.evolution.chain.evolves_to[0]?.evolves_to[0]?.species
                  .name ? (
                  <ImageItem
                    image={parseFloat(id) + 2}
                    alt='pokemon'
                    text={
                      data?.evolution.chain.evolves_to[0]?.evolves_to[0]
                        ?.species.name!
                    }
                  />
                ) : (
                  ''
                )}
              </ul> */}
            </div>
          </div>

          {data?.id === 151 ? (
            ''
          ) : (
            <Link href={new Number(data?.id! + 1).toString()}>
              <a className='absolute right-2'>
                <MdKeyboardArrowRight className='text-4xl' />
              </a>
            </Link>
          )}
        </section>
      </Suspense>
    </Layout>
  );
}

export async function getStaticPaths() {
  const pokeApi = new PokemonClient();
  const pokes = await pokeApi.listPokemons(0, 151);
  const paths = pokes.results;
  return {
    paths: paths.map((_, i) => ({ params: { id: i.toString() } })),
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }: { params: { id: number } }) {
  const id = params.id;

  return {
    props: { id },
  };
}
