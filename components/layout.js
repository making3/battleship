import Head from 'next/head';

export default (props) => (
  <div>
    <Head>
      <meta name="vi  ewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <title>Battleship</title>
    </Head>
    {props.children}
  </div>
);
