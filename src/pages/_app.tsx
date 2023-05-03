import type { AppProps } from 'next/app'
import Image from 'next/image';
import logoImage from '../../public/assets/logo.svg'
import { globalStyles } from '../styles/global';
import { Contatiner, Header } from '../styles/pages/app';

globalStyles();
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Contatiner>
      <Header>
        <Image src={logoImage} alt="logo"/>
      </Header>
      <Component {...pageProps} />
    </Contatiner>
  )
}
