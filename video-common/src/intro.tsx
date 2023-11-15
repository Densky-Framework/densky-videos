import { Img, Txt } from "@motion-canvas/2d";
import {
  all,
  chain,
  delay,
  Direction,
  easeInOutExpo,
  easeInSine,
  easeOutSine,
  run,
  SmoothSpring,
  useDuration,
  waitUntil,
} from "@motion-canvas/core";

import { popSpringIn, slideIn } from "./effects";
import { makeBaseScene2D } from "./utils";

export function makeIntro(title: string, logo: string) {
  return makeBaseScene2D(null, function* (view) {
    const titleNode = (
      <Txt
        text={title}
        y={350}
        fontSize={74}
        fill="#FFF"
        fontFamily="Manjer"
      />
    );

    const denskyLogo = new Img({
      src: logo,
      width: 320,
      zIndex: 1,
    });
    const denskyTitle = new Txt({
      text: "Densky",
      fontSize: 82,
      fill: "#FFF",
      fontFamily: "Manjer",
    });
    const denskyFramework = new Txt({
      fontSize: 82,
      children: "Framework",
      fill: "#FFF",
      fontFamily: "Manjer",
      x: 550,
    });

    yield* all(
      popSpringIn(denskyLogo, [denskyLogo.width], SmoothSpring, view),
      delay(
        useDuration("densky"),
        all(
          run(
            function* () {
              view.add(denskyTitle);
            },
          ),
          denskyLogo.x(-170, 0.5),
          denskyTitle.x(170, 0.5),
        ),
      ),
    );

    yield* chain(
      slideIn(
        view,
        denskyFramework,
        Direction.Right,
        .5,
        easeInSine,
      ),
      all(
        denskyLogo.x(-220, 0.5, easeOutSine),
        denskyTitle.x(100, 0.5, easeOutSine),
        denskyFramework.x(500, .5, easeOutSine),
      ),
    );

    view.add(
      titleNode,
    );
    yield* slideIn(
      view,
      titleNode,
      Direction.Bottom,
      useDuration("title"),
      easeInOutExpo,
    );

    yield* waitUntil("end");
  });
}
