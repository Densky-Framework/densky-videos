import { makeScene2D, Rect, View2D } from "@motion-canvas/2d";
import { ThreadGenerator, ThreadGeneratorFactory } from "@motion-canvas/core";

export const makeBaseScene2D = (
  transition: ThreadGenerator | null,
  run: ThreadGeneratorFactory<View2D>,
) =>
  makeScene2D(function* (view) {
    view.add(
      new Rect({ fill: "#1b1b1b", width: view.width(), height: view.height() }),
    );

    if (transition) yield* transition;

    yield* run(view);
  });
