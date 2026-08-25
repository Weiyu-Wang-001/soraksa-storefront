"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ScentQuiz from "@/components/ScentQuiz";
import { products } from "@/data/products";

const campaignSlides = [
  {
    image: "/images/campaign/anniversary-still-life.png",
    alt: "SoraKsa anniversary gift set with coin incense, folding fan, and ritual papers on a terracotta backdrop",
    position: "campaign-copy-left",
  },
  {
    image: "/images/campaign/anniversary-gift-set.png",
    alt: "An open SoraKsa gift box filled with Fairy Tale coin incense on a terracotta backdrop",
    position: "campaign-copy-right",
  },
];

export default function Home() {
  const [view, setView] = useState<"home" | "quiz">("home");
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setTimeout(
      () => setActiveSlide((current) => (current + 1) % campaignSlides.length),
      3500,
    );
    return () => window.clearTimeout(timer);
  }, [activeSlide]);

  if (view === "quiz") return <ScentQuiz onExit={() => setView("home")} />;

  const goToSlide = (index: number) => setActiveSlide((index + campaignSlides.length) % campaignSlides.length);

  return (
    <main className="anniversary-home">
      <div className="announcement-bar">
        <p>THE SORAKSA FAIRYTALE SERIES IS NOW LIVE</p>
        <a href="#collection">DISCOVER THE COLLECTION <span aria-hidden="true">→</span></a>
      </div>

      <nav className="campaign-nav" aria-label="Main navigation">
        <div className="campaign-nav-group campaign-nav-primary">
          <a href="#collection">Shop</a>
          <button onClick={() => setView("quiz")}>Scent Quiz</button>
          <a href="#story">Our Story</a>
        </div>
        <button className="campaign-wordmark" onClick={() => setView("home")} aria-label="SoraKsa home">SoraKsa</button>
        <div className="campaign-nav-group campaign-nav-utility">
          <button aria-label="Search">Search</button>
          <button aria-label="Shopping bag">Bag <span>0</span></button>
        </div>
      </nav>

      <section
        className="campaign-hero"
        aria-roledescription="carousel"
        aria-label="SoraKsa seventh anniversary campaign"
      >
        <div
          className="campaign-track"
          style={{ transform: `translate3d(-${activeSlide * 100}%, 0, 0)` }}
        >
          {campaignSlides.map((slide, index) => (
            <div
              className={`campaign-slide ${index === activeSlide ? "is-active" : ""}`}
              aria-hidden={index !== activeSlide}
              key={slide.image}
            >
              <div className="campaign-media">
                <Image src={slide.image} alt={slide.alt} fill sizes="100vw" priority className="campaign-image" />
              </div>
              <div className={`campaign-copy ${slide.position}`}>
                <p>7TH ANNIVERSARY</p>
                <h1>Seven Years<br />of SoraKsa</h1>
                <strong>UP TO 50% OFF</strong>
                <a href="#collection">Shop the anniversary <span aria-hidden="true">→</span></a>
              </div>
            </div>
          ))}
        </div>

        <div className="carousel-controls">
          <button onClick={() => goToSlide(activeSlide - 1)} aria-label="Previous campaign image">←</button>
          <div className="carousel-dots" role="group" aria-label="Choose campaign image">
            {campaignSlides.map((_, index) => (
              <button
                key={index}
                className={index === activeSlide ? "is-active" : ""}
                onClick={() => goToSlide(index)}
                aria-label={`Show campaign image ${index + 1}`}
                aria-current={index === activeSlide ? "true" : undefined}
              />
            ))}
          </div>
          <button onClick={() => goToSlide(activeSlide + 1)} aria-label="Next campaign image">→</button>
        </div>
      </section>

      <section id="story" className="anniversary-story anniversary-story-bridge">
        <div className="anniversary-story-copy">
          <p className="campaign-kicker">FIND YOUR SCENT</p>
          <h2>A fragrance written<br />by your imagination.</h2>
          <p>Step into a redwood daydream. Four intuitive choices reveal the SoraKsa character—and natural atmosphere—that speaks to you.</p>
          <button onClick={() => setView("quiz")}>Take the scent personality quiz <span aria-hidden="true">→</span></button>
          <small>ABOUT 2 MINUTES · ONE PERSONAL RESULT</small>
        </div>
        <div className="anniversary-story-caption">
          <p>“The forest remembers every story we tell beneath its branches.”</p>
          <span>THE SORAKSA RITUAL</span>
        </div>
        <span className="forest-credit">Redwood photograph by James Sestric · Unsplash</span>
      </section>

      <section className="service-strip" aria-label="Shopping benefits">
        <p><span>01</span> Natural-origin fragrance</p>
        <p><span>02</span> Portable coin incense</p>
        <p><span>03</span> Complimentary shipping over $75</p>
      </section>

      <section id="collection" className="anniversary-collection">
        <div className="anniversary-section-heading">
          <div>
            <p className="campaign-kicker">THE FAIRY TALE SERIES</p>
            <h2>Six scents.<br /><em>Six little worlds.</em></h2>
          </div>
          <p>Small-batch coin incense created for wherever the story finds you. Discover the character whose atmosphere feels most like home.</p>
        </div>
        <div className="anniversary-product-grid">
          {products.map((product) => (
            <Link className="anniversary-product-card" href={`/products/${product.slug}`} key={product.slug}>
              <div className="anniversary-product-image">
                <Image src={product.image} alt={`SoraKsa ${product.title} coin incense`} fill sizes="(max-width: 700px) 88vw, 30vw" />
                <span>Explore scent</span>
              </div>
              <div className="anniversary-product-info">
                <p>0{product.order} · COIN INCENSE</p>
                <h3>{product.title}</h3>
                <span>{product.companion}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </main>
  );
}
