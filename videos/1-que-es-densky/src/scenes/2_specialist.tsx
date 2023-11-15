import { Img, Txt } from "@motion-canvas/2d";
import {
  all,
  delay,
  Direction,
  easeInSine,
  SmoothSpring,
  useDuration,
  waitUntil,
} from "@motion-canvas/core";
import {
  Icon,
  IconData,
  makeBaseScene2D,
  popSpringIn,
  slideIn,
  tp,
} from "video-common";

import Logo from "../imgs/logo-720px.png";

export default makeBaseScene2D(null, function* (view) {
  const denskyLogo = new Img({
    src: Logo,
    width: 770,
  });
  view.add(denskyLogo);

  const star = new Icon(IconData.Star, {
    fontSize: 220,
    fill: "#f1de11",
    x: 250,
    y: -250,
    rotation: 15,
    shadowBlur: 10,
    zIndex: 1,
  });

  yield* waitUntil("Star");
  yield* popSpringIn(star, [star.fontSize], SmoothSpring, view);

  const router = new Icon(IconData.Router, {
    fontSize: 350,
    fill: "#ff6b03",
    shadowBlur: 10,
  });

  yield* waitUntil("Router");
  yield* all(
    slideIn(view, router, Direction.Right, 1),
    denskyLogo.width(420, 1),
    denskyLogo.x(-550, 1),
    tp(star, [200, -50], 1.2),
  );

  const arrowUpFlat = new Icon(IconData.ArrowFlat, {
    fontSize: 350,
    fill: "#5d5d5d",
    shadowBlur: 10,
    y: 350,
  });
  const arrowDownFlat = new Icon(IconData.ArrowFlat, {
    rotation: 180,
    fontSize: 350,
    fill: "#5d5d5d",
    shadowBlur: 10,
    y: -350,
  });

  yield* all(
    slideIn(view, arrowUpFlat, Direction.Bottom, 2),
    slideIn(view, arrowDownFlat, Direction.Top, 2),
  );

  yield* all(
    star.scale([0, 0], 1),
    arrowUpFlat.y(200, 2),
    arrowDownFlat.y(-150, 2),
    router.scale.y(0, 2),
    router.y(20, 2),
  );

  const routeTree = new Icon(IconData.FamilyTree, {
    fontSize: 350,
    fill: "#ff6b03",
    shadowBlur: 10,
  });

  yield* all(
    arrowUpFlat.y(1000, 0.5, easeInSine),
    arrowDownFlat.y(-1000, 0.5, easeInSine),
    popSpringIn(routeTree, [routeTree.fontSize], SmoothSpring, view),
  );

  const txt_thats = new Txt({
    text: "That's",
    fontSize: 200,
    fontFamily: "Manjer",
    fill: "#FFF",
    shadowColor: "#000",
    shadowBlur: 20,
    rotation: -15,
    x: -250,
  });

  const txt_all = new Txt({
    text: "all?",
    fontSize: 200,
    fontFamily: "Manjer",
    fill: "#FFF",
    shadowColor: "#000",
    shadowBlur: 20,
    rotation: -5,
    x: 250,
  });

  yield* waitUntil("That's");

  yield* all(
    popSpringIn(txt_thats, [txt_thats.fontSize], SmoothSpring, view),
    txt_thats.rotation(0, 1),
    delay(
      useDuration("all"),
      all(
        popSpringIn(txt_all, [txt_all.fontSize], SmoothSpring, view),
        txt_all.rotation(0, 1),
      ),
    ),
    delay(
      useDuration("erase"),
      all(
        txt_thats.position.x(-1500, 0.5),
        txt_all.position.x(-1200, 0.5),
        routeTree.position.x(-1250, 0.5),
        denskyLogo.position.x(-1800, 0.5),
      ),
    ),
  );
});
