import { Layout, Line, Node, Rect, Txt } from "@motion-canvas/2d";
import {
  all,
  Direction,
  range,
  slideTransition,
  waitFor,
} from "@motion-canvas/core";
import { Colors, Icon, IconData, makeBaseScene2D } from "video-common";
import {
  CodeBlock,
  insert,
  lines,
} from "@motion-canvas/2d/lib/components/CodeBlock";

function createScreen(title: string) {
  const screenBack = new Rect({
    width: 1080,
    height: 720,
    fill: "#2e2e44",
    radius: 20,
    shadowColor: "#000",
    shadowBlur: 10,
    shadowOffsetY: 1,
  });

  const screenTop = new Rect({
    width: 1080,
    height: 100,
    fill: "#4a4a5b",
    radius: [20, 20, 0, 0],
    y: -310,
  });

  const screenTitle = new Txt({
    text: title,
    fontSize: 55,
    fontFamily: "monospace",
    fill: "#FFF",
    x: -250,
    y: -300,
  });

  const screenCode = new CodeBlock({
    language: "typescript",
    fontSize: 37,
    fontFamily: "Monocraft Nerd Font",
  });

  const screen = new Layout({
    children: [screenBack, screenTop, screenTitle, screenCode],
  });

  return { screen, screenTop, screenBack, screenCode, screenTitle };
}

export default makeBaseScene2D(null, function* (view) {
  yield* slideTransition(Direction.Left, 0.5);

  const { screen, screenCode, screenTop } = createScreen("densky/$id.tsx");
  screen.zIndex(10);
  view.add(screen);

  yield* editMainCode(screenCode);

  const screenBottom = new Icon(IconData.Ferris, {
    fill: Colors.Rust,
    x: -420,
    y: 280,
    fontSize: 156,
  });
  screen.add(screenBottom);

  const screenBottomLine = new Line({
    fill: Colors.Rust,
    y: 280,
    points: [[-460, 0], [460, 0]],
    stroke: Colors.Rust,
    lineWidth: 6,
    end: 0,
  });
  screen.add(screenBottomLine);

  yield* all(
    screen.x(-470, 1),
    screen.y(-200, 1),
    screen.scale(0.8, 1),
  );
  yield* all(
    screenBottom.x(420, 0.2),
    screenBottomLine.end(1, 0.2),
  );
  yield* screenTop.fill("#1aed5d", 0.2);

const screens: Node[] = [];
  for (const i of range(3)) {
    const { screen, screenTop } = createScreen(i.toString());
    const a = 0.7 - 0.1 * i;
    screen.scale([a, a]);
    screen.zIndex(9 - i);
    screen.x(-470);
    screen.y(-200);

    const screenBottom = new Icon(IconData.Ferris, {
      fill: Colors.Rust,
      x: -420,
      y: 280,
      fontSize: 156,
    });
    screen.add(screenBottom);

    const screenBottomLine = new Line({
      fill: Colors.Rust,
      y: 280,
      points: [[-460, 0], [460, 0]],
      stroke: Colors.Rust,
      lineWidth: 6,
      end: 0,
    });
    screen.add(screenBottomLine);

    view.add(screen);

    yield* all(
      screen.x(200 * i - 250, 0.4),
      screen.y(150 * i - 50, 0.4),
    );
    yield* all(
      screenBottom.x(420, 0.2),
      screenBottomLine.end(1, 0.2),
    );
    yield* screenTop.fill("#1aed5d", 0.2);

    screens.push(screen);
  }

  yield* all(
    screen.scale(1.2, 1),
    screen.x(0, 1),
    screen.y(0, 1),
  );

  screens.forEach(s => s.remove());

  yield* screen.opacity(0, 2)
});

function* editMainCode(codeBlock: CodeBlock) {
  const nl = (count: number) => new Array(count).fill("\n").join("");

  yield* codeBlock.edit(0.5, false)`${
    insert(`import { type HTTPRequest } from "densky"; `)
  }
${nl(8)}`;

  yield* codeBlock.edit(
    0.5,
    lines(2, 4),
  )`import { type HTTPRequest } from "densky"; 

${insert("export function GET(req: HTTPRequest) {")}

${insert("}")}
${nl(4)}`;

  yield* codeBlock.edit(0.5, false)`import { type HTTPRequest } from "densky"; 

export function GET(req: HTTPRequest) {
  ${insert(`return new Response(req.params.get("id"))`)}
}
${nl(4)}`;
}
