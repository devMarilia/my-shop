import { ImageContainer, ProductContainer, ProductDetails } from '../../styles/pages/products';

import shirt01 from '../../../public/assets/shirt/shirt1.png'
import Image from 'next/image';
export default function Product() {

    return (
     <ProductContainer>
        <ImageContainer>
           <Image src={shirt01} alt="teste"/>
        </ImageContainer>

        <ProductDetails>
            <h1>Camiseta x</h1>
            <span>R$ 50,00</span>

            <button>
                Comprar agora
            </button>
        </ProductDetails>
     </ProductContainer>
    )
 }