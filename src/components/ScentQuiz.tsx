"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";
import {
  doorChoices,
  quizScenes,
  scentResults,
  type QuizChoice,
  type ScentResultId,
} from "@/data/quiz";

type QuizPhase = "opening" | "doors" | "scene" | "result";

function emitQuizEvent(name: string, detail: Record<string, string> = {}) {
  window.dispatchEvent(new CustomEvent(name, { detail }));
}

export default function ScentQuiz({ onExit }: { onExit: () => void }) {
  const [phase, setPhase] = useState<QuizPhase>("opening");
  const [sceneId, setSceneId] = useState<string | null>(null);
  const [resultId, setResultId] = useState<ScentResultId | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  const scene = sceneId ? quizScenes[sceneId] : null;
  const result = resultId ? scentResults[resultId] : null;

  useEffect(() => {
    const nextSceneIds = phase === "doors"
      ? doorChoices.map((door) => door.next)
      : scene?.choices.flatMap((choice) => choice.next ? [choice.next] : []) ?? [];

    nextSceneIds.forEach((nextSceneId) => {
      const image = new window.Image();
      image.src = `/images/quiz/scenes/${nextSceneId}.webp`;
    });
  }, [phase, scene]);

  const enterDream = () => {
    emitQuizEvent("quiz_started");
    setPhase("doors");
  };

  const chooseDoor = (next: string, world: string, label: string) => {
    emitQuizEvent("quiz_choice_selected", { question: "door", world, choice: label });
    setSceneId(next);
    setHistory([]);
    setPhase("scene");
  };

  const chooseAnswer = (choice: QuizChoice) => {
    if (!scene) return;
    emitQuizEvent("quiz_choice_selected", {
      question: scene.id,
      world: scene.world,
      choice: choice.label,
    });

    if (choice.result) {
      const completed = scentResults[choice.result];
      emitQuizEvent("quiz_completed", {
        personality: completed.personality,
        product: completed.productName,
      });
      setResultId(choice.result);
      setPhase("result");
      return;
    }

    if (choice.next) {
      setHistory((current) => [...current, scene.id]);
      setSceneId(choice.next);
    }
  };

  const goBack = () => {
    if (phase === "doors") {
      setPhase("opening");
      return;
    }
    if (phase === "scene") {
      const previous = history.at(-1);
      if (previous) {
        setSceneId(previous);
        setHistory((current) => current.slice(0, -1));
      } else {
        setSceneId(null);
        setPhase("doors");
      }
    }
  };

  const dreamAgain = () => {
    setSceneId(null);
    setResultId(null);
    setHistory([]);
    setPhase("doors");
  };

  if (phase === "opening") {
    return (
      <main className="dream-stage dream-opening">
        <button className="back-link" onClick={onExit}>Back to SoraKsa</button>
        <div className="dream-copy opening-copy">
          <p className="eyebrow">THE AFTERNOON DAYDREAM</p>
          <h1>The day is finally over.</h1>
          <p>
            You sink into an old yellow sofa as afternoon light passes through the sheer
            curtains. Your eyes close. At first, there is only warmth.
          </p>
          <button className="ink-button" onClick={enterDream}>Close your eyes <span aria-hidden="true">→</span></button>
          <p className="dream-duration">4 choices · about 2 minutes · 1 scent personality</p>
        </div>
        <span className="forest-credit">Redwood photograph by James Sestric · Unsplash</span>
      </main>
    );
  }

  if (phase === "doors") {
    return (
      <main className="dream-stage dream-doors">
        <div className="quiz-topline">
          <button className="back-link" onClick={goBack}>Back</button>
          <button className="quiz-exit" onClick={onExit}>Exit the daydream</button>
        </div>
        <p className="progress">01 / 04</p>
        <div className="door-copy">
          <p>The curtains dissolve into mist. When your feet touch the ground, three doors are waiting beneath a sky full of stars.</p>
          <h1>Which one do you open?</h1>
        </div>
        <div className="doors-art">
          <Image
            src="/images/quiz/scenes/doors.webp"
            alt="Three mysterious doors beneath a star-filled sky: weathered blue, dark carved wood, and white"
            fill
            sizes="(max-width: 700px) 150vw, 92vw"
            priority
          />
          <span className="door-focus door-focus-1" aria-hidden="true" />
          <span className="door-focus door-focus-2" aria-hidden="true" />
          <span className="door-focus door-focus-3" aria-hidden="true" />
          <div className="door-row" aria-label="Choose a dream door">
            {doorChoices.map((door, index) => (
              <button
                key={door.tone}
                className="dream-door"
                onClick={() => chooseDoor(door.next, door.tone, door.label)}
                aria-label={`${door.label}. ${door.description}`}
              >
                <span className="door-number">0{index + 1}</span>
                <span className="door-label">{door.label}</span>
              </button>
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (phase === "scene" && scene) {
    return (
      <main
        className={`dream-stage quiz-scene world-${scene.world}`}
        key={scene.id}
        style={{ "--scene-image": `url(/images/quiz/scenes/${scene.id}.webp)` } as CSSProperties}
      >
        <div className="quiz-topline">
          <button className="back-link" onClick={goBack}>Back</button>
          <button className="quiz-exit" onClick={onExit}>Exit the daydream</button>
        </div>
        <p className="progress">0{scene.step} / 04</p>
        <section className="scene-composition" aria-live="polite">
          <div className="scene-world-mark" aria-hidden="true">
            <span>{scene.world === "water" ? "THE SHALLOWS" : scene.world === "forest" ? "THE NIGHT RAINFOREST" : "THE SUNSET GRASSLAND"}</span>
          </div>
          <div className="scene-narrative">
            <p>{scene.copy}</p>
            <h1>{scene.question}</h1>
            <div className="scene-choices">
              {scene.choices.map((choice, index) => (
                <button key={choice.label} onClick={() => chooseAnswer(choice)}>
                  <span>0{index + 1}</span>
                  <strong>{choice.label}</strong>
                  <i aria-hidden="true">→</i>
                </button>
              ))}
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (phase === "result" && result) {
    return (
      <main className={`quiz-result result-${result.id}`}>
        <nav className="result-nav">
          <button onClick={onExit}>SoraKsa</button>
          <span>Your daydream, revealed</span>
        </nav>
        <section className="result-reveal" aria-live="polite">
          <div className="result-personality">
            <p className="result-eyebrow">YOUR SCENT PERSONALITY</p>
            <h1>{result.personality}</h1>
            <strong>{result.supportingLine}</strong>
            <p>{result.personalityCopy}</p>
          </div>
          <div className="result-product-image">
            <span>YOUR MATCH</span>
            <Image src={result.image} alt={`${result.productName} SoraKsa coin incense`} fill sizes="(max-width: 760px) 92vw, 48vw" priority />
          </div>
        </section>
        <section className="result-match">
          <div className="result-match-title">
            <p>YOUR MATCH</p>
            <h2>{result.productName}</h2>
          </div>
          <div className="result-scent-copy">
            <p>{result.scentDescription}</p>
            <div>
              <span>SCENT NOTES</span>
              <strong>{result.notes}</strong>
            </div>
            <div>
              <span>YOUR RITUAL</span>
              <strong>{result.mood}</strong>
            </div>
            <Link
              href={`/products/${result.id}`}
              onClick={() => emitQuizEvent("quiz_product_clicked", { product: result.productName })}
            >
              Meet {result.productName} <span aria-hidden="true">→</span>
            </Link>
            <button className="dream-again" onClick={dreamAgain}>Dream again</button>
            <p className="secondary-match">You may also like <strong>{result.secondary}</strong>.</p>
          </div>
        </section>
        <div className="result-forest" role="img" aria-label="Sunlight passing through a redwood forest">
          <span>Pause. Breathe. Feel.</span>
        </div>
      </main>
    );
  }

  return null;
}
