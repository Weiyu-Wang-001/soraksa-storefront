import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductPurchase from "@/components/ProductPurchase";
import { getProduct, products } from "@/data/products";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  return product
    ? { title: `${product.title} | SoraKsa`, description: product.shortStory }
    : { title: "SoraKsa Incense" };
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) notFound();

  const productTheme = { "--product-accent": product.accent } as CSSProperties;
  const relatedProducts = products.filter((item) => item.slug !== product.slug).slice(0, 3);

  return (
    <main className="product-page" style={productTheme}>
      <nav className="product-nav" aria-label="Product navigation">
        <Link className="wordmark" href="/">soraksa</Link>
        <div>
          <Link href="/#collection">Shop all</Link>
          <Link href="/?quiz=start">Scent quiz</Link>
          <button className="bag">Bag <span>0</span></button>
        </div>
      </nav>

      <header className="product-title-banner">
        <p className="eyebrow">SORAKSA · 0{product.order} / 06</p>
        <h1>The Fairy Tale Series</h1>
        <p>{product.title}</p>
      </header>

      <section className="product-detail" aria-label={`${product.title} product details`}>
        <div className="product-gallery-frame">
          <div className="product-image-stage">
            <Image
              src={product.image}
              alt={`SoraKsa ${product.title} coin incense set, tin, incense piece, and metal holder`}
              fill
              sizes="(max-width: 850px) 92vw, 50vw"
              priority
            />
          </div>
          <p>Complete set · Product sheet</p>
        </div>

        <div className="product-summary">
          <p className="eyebrow">YOUR SMALL FOREST RITUAL</p>
          <h2>{product.title}</h2>
          <p className="product-companion">{product.companion}</p>
          <p className="product-atmosphere">{product.atmosphere}</p>
          <p className="product-story">{product.shortStory}</p>

          <dl className="product-facts">
            <div><dt>Format</dt><dd>Coin incense</dd></div>
            <div><dt>Inside</dt><dd>10 incense coins</dd></div>
            <div><dt>Burn time</dt><dd>20–30 min / piece</dd></div>
          </dl>

          <ProductPurchase />
        </div>
      </section>

      <section className="ritual-banner">
        <div>
          <p className="eyebrow">PAUSE · BREATHE · FEEL</p>
          <h2>A pocket-sized pause,<br />wherever you wander.</h2>
        </div>
        <p>Place one coin on a heat-safe surface, light it with care, and let the moment become your own.</p>
      </section>

      <section className="related-products">
        <div className="related-heading">
          <div><p className="eyebrow">CONTINUE THE TALE</p><h2>Related characters</h2></div>
          <Link className="text-link" href="/#collection">View all incense →</Link>
        </div>
        <div className="related-grid">
          {relatedProducts.map((related) => (
            <Link href={`/products/${related.slug}`} className="related-card" key={related.slug}>
              <div><Image src={related.image} alt={`SoraKsa ${related.title}`} fill sizes="(max-width: 700px) 88vw, 29vw" /></div>
              <span>0{related.order}</span>
              <h3>{related.title}</h3>
              <p>{related.companion}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
