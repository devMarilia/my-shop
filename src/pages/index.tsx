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

interface HomeProps {
  products : {
    id: string,
    name: string,
    imageUrl: string,
    price : number
  }[]
}

export default function Home({products}: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48
    }
  })
  return ( 
  <HomeContainer ref={sliderRef} className="keen-slider">
 
    {products.map(product => {
      return (
        <Product key={product.id} className="keen-slider__slide">
        <Image src={shirt1} alt="shirt01" width={520} height={480}/>
  
        <footer>
          <strong>{product.name}</strong>
          <span>R$ {product.price}</span>
        </footer>
      </Product>
      )
    })}
  
  </HomeContainer>
)}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })
  console.log(response.data)


  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount / 100
    }
  })

  return {
    props:{
      products
    }
  }

}
