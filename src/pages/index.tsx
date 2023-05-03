import Image from "next/image"
import { useKeenSlider } from "keen-slider/react"
import 'keen-slider/keen-slider.min.css'
import { HomeContainer, Product } from "../styles/pages/home"

import shirt1 from '../../public/assets/shirt/shirt1.png'
import shirt2 from '../../public/assets/shirt/shirt2.png'
import shirt3 from '../../public/assets/shirt/shirt3.png'


export default function Home() {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
    }
  })
  return ( 
  <HomeContainer ref={sliderRef} className="keen-slider">
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
      <Image src={shirt3} alt="shirt01" width={520} height={480}/>

      <footer>
        <strong>Camiseta X</strong>
        <span>R$ 79,90</span>
      </footer>
    </Product>
  </HomeContainer>
)}
