import Image from "next/image"
import { useKeenSlider } from "keen-slider/react"
import 'keen-slider/keen-slider.min.css'
import { HomeContainer, Product } from "../styles/pages/home"

import shirt1 from '../../public/assets/shirt/shirt1.png'
import shirt2 from '../../public/assets/shirt/shirt2.png'
import shirt3 from '../../public/assets/shirt/shirt3.png'
import shirt4 from '../../public/assets/shirt/shirt4.png'
import { stripe } from "../lib/stripe"
import { GetServerSideProps } from "next"


export default function Home(props) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48
    }
  })
  return ( 
  <HomeContainer ref={sliderRef} className="keen-slider">
    <pre>{JSON.stringify(props.list)}</pre>
    <Product className="keen-slider__slide">
      <Image src={shirt1} alt="shirt01" width={520} height={480}/>

      <footer>
        <strong>Camiseta X</strong>
        <span>R$ 79,90</span>
      </footer>
    </Product>

    <Product className="keen-slider__slide">
      <Image src={shirt2} alt="shirt01" width={520} height={480}/>

      <footer>
        <strong>Camiseta X</strong>
        <span>R$ 79,90</span>
      </footer>
    </Product>

    <Product className="keen-slider__slide">
      <Image src={shirt3} alt="shirt01" width={520} height={480}/>

      <footer>
        <strong>Camiseta X</strong>
        <span>R$ 79,90</span>
      </footer>
    </Product>
    <Product className="keen-slider__slide">
      <Image src={shirt4} alt="shirt01" width={520} height={480}/>

      <footer>
        <strong>Camiseta X</strong>
        <span>R$ 79,90</span>
      </footer>
    </Product>
  </HomeContainer>
)}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await stripe.products.list()
  console.log(response.data)

  return {
    props:{
      list: [1,2,3]
    }
  }

}
