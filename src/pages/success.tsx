import Link from "next/link";
import { ImageContainer, SuccessContainer } from "../styles/pages/success";
import { GetServerSideProps } from "next";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import Image from "next/image";

interface SuccessProps {
  customerName: string;
  product: {
    name: string;
    imageUrl: string;
  };
}

export default function Success({ customerName, product }: SuccessProps){
  return (
    <SuccessContainer>
      <h1>Compra efetuada com sucesso</h1>
      <ImageContainer>
        <Image src={product.imageUrl} alt={product.name} width={120} height={140}/>
      </ImageContainer>
      <p>
        Uhuu <strong>{customerName}</strong>, sua <strong>{product.name}</strong> já está no caminho de casa.
      </p>
      <Link href={"/"}>
        Voltar ao catalago
      </Link>
    </SuccessContainer>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const sessionId = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "line_items.data.price.product"],
  });
  console.log(session);
  const customerName = session.customer_details?.name;
  const product = session.line_items?.data[0].price?.product as Stripe.Product;
  console.log(customerName);
  console.log(product);
  return {
    props: {
      customerName,
      product: {
        name: product.name,
        imageUrl: product.images[0],
      },
    },
  };
};
