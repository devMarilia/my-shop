import Image from "next/image";
import Link from "next/link";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { HomeContainer, Product } from "../styles/pages/home";

import { stripe } from "../lib/stripe";
import { GetStaticProps } from "next";
import Stripe from "stripe";

// Images Banner
import image1 from "../../public/assets/imageBanner/image1.png";
import image2 from "../../public/assets/imageBanner/image2.png";

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
  }[];
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });

  const [testeRef] = useKeenSlider(
    {
      loop: true,
    },
    [
      (slider) => {
        let timeout;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 2000);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );
  return (
    <>
      <div ref={testeRef} className="keen-slider">
        <div className="keen-slider__slide ">
          <Image src={image1} alt="" />
        </div>
        <div className="keen-slider__slide number-slide2">
          <Image src={image2} alt="" />
        </div>
        <div className="keen-slider__slide ">
          <Image src={image1} alt=""/>
        </div>
      </div>
      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => {
          return (
            <Link
              href={`/products/${product.id}`}
              key={product.id}
              prefetch={false}
            >
              <Product className="keen-slider__slide">
                <Image src={product.imageUrl} alt="" width={520} height={480} />

                <footer>
                  <strong>{product.name}</strong>
                  <span>{product.price}</span>
                </footer>
              </Product>
            </Link>
          );
        })}
      </HomeContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;
    console.log(product, "OI");
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat("pt-Br", {
        style: "currency",
        currency: "BRL",
      }).format(Number(price.unit_amount) / 100),
    };
  });

  return {
    props: {
      products,
    },
    revalidate: (60 * 60) / 2,
  };
};
