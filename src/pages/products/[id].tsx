import { ImageContainer, ProductContainer, ProductDetails } from '../../styles/pages/products';
import { GetStaticPaths, GetStaticProps } from "next";
import Image from 'next/image';
import { Stripe } from 'stripe'
import { stripe } from '../../lib/stripe'
import { useRouter } from 'next/router';




interface ProductProps {
    product: {
      id: string;
      name: string;
      imageUrl: string;
      price: string;
      description: string;
    }
  }

export default function Product({ product } : ProductProps) {

    const { isFallback } = useRouter();

    if (isFallback) {
      return <p>Loading ...</p>
    }

    return (
     <ProductContainer>
        <ImageContainer>
           <Image src={product.imageUrl} width={520} height={480} alt=""/>
        </ImageContainer>

        <ProductDetails>
            <h1>{product.name}</h1>
            <span>{product.price}</span>
            <p>{product.description}</p>
            <button>
                Comprar agora
            </button>
        </ProductDetails>
     </ProductContainer>
    )
 }

 export const getStaticPaths: GetStaticPaths = async () => {
    return {
      paths: [{params: {id: 'prod_NpTqLOkYfkqW4P'}}],
      fallback: true
    }
  }

 export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
    const productId = params?.id;

  if (!productId) {
    return { notFound: true };
  }

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  });

    const price = product.default_price as Stripe.Price

    return {
        props : {
            product: {
                id: product.id,
                name: product.name,
                imageUrl: product.images[0],
                price: new Intl.NumberFormat("pt-Br", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(price.unit_amount) / 100),
                description: product.description
            }
        },
        revalidate: 60 * 60 * 1
    }
    
}