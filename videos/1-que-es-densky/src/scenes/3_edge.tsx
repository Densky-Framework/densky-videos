import { Circle, Img, Line, Txt } from "@motion-canvas/2d";
import { all, Direction, waitFor } from "@motion-canvas/core";
import { fadeIn, Icon, IconData, makeBaseScene2D, slideIn } from "video-common";

import Logo from "../imgs/logo-720px.png";
import DenoLogo from "../imgs/Deno.svg";

export default makeBaseScene2D(null, function* (view) {
  const denskyLogo = new Img({ src: Logo, width: 220, x: 350, y: -110 });
  const serverIcon = new Icon(IconData.Server, {
    fontSize: 172,
    x: 80,
    y: -90,
    rotation: -15,
  });
  const edgeLine = new Line({
    stroke: "#FFF",
    lineWidth: 6,
    points: [
      [view.width() / 2, 0],
      [100, 0],
      [110, 20],
      [130, 50],
      [180, 80],
      [200, 120],
      [240, 270],
      [300, 270],
      [290, 320],
      [340, view.height() / 2],
    ],
    end: 0,
  });

  const denskyHand = new Txt({
    text: "✋",
    fontSize: 72,
    x: 220,
    y: -100,
    rotation: -90,
  });
  const serverHand = new Txt({
    text: "🤚",
    fontSize: 72,
    x: 170,
    y: -100,
    rotation: 90,
  });

  view.add(edgeLine);

  yield* all(
    edgeLine.end(1, 0.5),
    slideIn(view, serverIcon, Direction.Right, 1),
    slideIn(view, denskyLogo, Direction.Right, 1.5),
  );

  view.add(denskyHand);
  yield* all(
    slideIn(view, denskyHand, Direction.Right, 1),
    slideIn(view, serverHand, Direction.Top, 1),
  );

  yield* all(
    denskyLogo.rotation(15, 4),
    denskyLogo.x(370, 4),
    denskyHand.x(240, 4),
    serverHand.x(190, 4),
    serverIcon.rotation(-5, 4),
    serverIcon.x(100, 4),
  );

  const denoLogoBack = new Circle({
    width: 108,
    height: 108,
    shadowBlur: 10,
    shadowColor: "#FFF",
    x: 100,
    y: -90,
    fill: "#FFF",
  });
  const denoLogo = new Img({
    src: DenoLogo,
    width: 108,
    zIndex: 1,
    shadowBlur: 10,
    shadowColor: "#FFF",
    x: 100,
    y: -90,
  });

  yield* all(fadeIn(denoLogo, 0.5, view), fadeIn(denoLogoBack, 0.5, view));

  yield* waitFor(1);
});
