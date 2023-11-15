import { Img, Layout, Line, Node, Txt, View2D } from "@motion-canvas/2d";
import {
  all,
  chain,
  Direction,
  PossibleVector2,
  slideTransition,
  ThreadGenerator,
  waitFor,
  waitUntil,
} from "@motion-canvas/core";
import { fadeIn, Icon, IconData, makeBaseScene2D } from "video-common";

import Logo from "../imgs/logo-720px.png";
import DenoLogo from "../imgs/Deno.svg";

export default makeBaseScene2D(
  null,
  function* (view) {
    const newElementText = new Txt({
      fontFamily: "Manjer",
      x: 720,
      y: -230,
      fill: "#FFF",
      fontSize: 58,
    });
    view.add(newElementText);

    const denskyLogo = new Img({
      src: Logo,
      width: 220,
      zIndex: 1,
    });

    // SCENE START
    yield* slideTransition(Direction.Bottom, 0.5);
    yield* waitFor(0.2);

    // What is Densky?
    yield* fadeIn(denskyLogo, 0.5, view);

    // SHOW SERVER
    yield* waitUntil("Server");
    const denoServer = makeNode({
      icon: DenoServer(),
      text: "Server",
      position: [0, -350],
      lineAnchor: [0, -250],
    });
    yield* denoServer[0](view, newElementText);

    // SHOW ORM
    yield* waitUntil("Database");
    const databaseORM = makeNode({
      icon: DatabaseORM(),
      text: "Database ORM",
      position: [-250, 350],
      lineAnchor: [-200, 300],
    });
    yield* databaseORM[0](view, newElementText);

    const icons = [
      [IconData.CloudPercent, "Balancer"],
      [IconData.CloudUpload, "Uploader"],
      [IconData.CloudConfig, "Configurator"],
      [IconData.Cloud, "Custom"],
      [IconData.CloudLock, "Auth"],
      [IconData.CloudSearch, "Searcher"],
      [IconData.CloudAlert, "Notifier"],
    ];
    const iconAngle = (Math.PI / 1.2) / 4;
    const iconAngleClose = (Math.PI / 1.7) / 3;
    const hideIcons: ThreadGenerator[] = [];
    for (const [index, [iconData, text]] of icons.entries()) {
      const n = new Icon(iconData, {
        x: 720,
        fontSize: 156,
      });

      const angleRate = index >= 4 ? iconAngleClose : iconAngle;
      const angle = index < 4
        ? angleRate * (index - 1)
        : angleRate * (index + 0.5);

      const x = Math.cos(angle);
      const y = Math.sin(angle);

      view.add(n);

      const a = makeNode({
        icon: n,
        text,
        position: [x * 300, y * 300],
        lineAnchor: [x * 250, y * 250],
        delay: 0.3,
      });

      yield* a[0](view, newElementText);
      hideIcons.push(a[1]());
    }

    yield* waitUntil("Expand");

    denskyLogo.zIndex(2);
    yield* all(
      denskyLogo.width(770, 1),
      denoServer[1](),
      databaseORM[1](),
      ...hideIcons,
    );
  },
);

interface NodeInfo {
  icon: Node;
  text: string;
  position: PossibleVector2;
  lineAnchor: PossibleVector2;
  delay?: number;
}

function makeNode(
  { icon, text, position, lineAnchor, delay = 0.5 }: NodeInfo,
): [(view: View2D, textNode: Txt) => ThreadGenerator, () => ThreadGenerator] {
  const line = new Line({
    points: [{ x: 0, y: 0 }, lineAnchor],
    lineWidth: 6,
    stroke: "#FFF",
    end: 0,
  });
  return [(view: View2D, textNode: Txt) => {
    view.add(line);
    return chain(
      all(
        fadeIn(icon, delay, view),
        textNode.text(text, delay),
      ),
      waitFor(delay),
      all(
        icon.position(position, delay),
        textNode.text("", 0.5),
        line.end(1, delay),
      ),
    );
  }, () => {
    return all(
      line.opacity(0, 0.7),
      icon.opacity(0, 0.7),
    );
  }];
}

function DatabaseORM() {
  const base = (fontSize: number, rotation: number, fill: string) => ({
    rotation,
    fontSize,
    fill,
    zIndex: 1,
    shadowBlur: 10,
  });
  const serverIcon = new Icon(IconData.DB, base(258, 0, "#FFF"));

  const mongoDB = new Icon(IconData.MongoDB, {
    ...base(100, 45, "#0F0"),
    y: -75,
    x: -50,
  });

  const sqliteDB = new Icon(IconData.SqliteDB, {
    ...base(75, 45, "#FB0"),
    y: 25,
  });

  const postgresDB = new Icon(IconData.PostgresDB, {
    ...base(75, -45, "#0FF"),
    y: 100,
    x: 50,
  });

  return new Layout({
    x: 720,
    zIndex: 1,
    children: [serverIcon, mongoDB, sqliteDB, postgresDB],
  });
}

function DenoServer() {
  const serverIcon = new Icon(IconData.Server, {
    fontSize: 258,
    zIndex: 1,
  });

  const denoLogo = new Img({
    src: DenoLogo,
    width: 108,
    zIndex: 1,
    shadowBlur: 10,
    shadowColor: "#FFF",
  });

  return <Layout x={720} zIndex={1}>{serverIcon}{denoLogo}</Layout>;
}
