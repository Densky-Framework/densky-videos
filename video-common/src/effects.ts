import { Node, View2D } from "@motion-canvas/2d";
import {
  Direction,
  InterpolationFunction,
  PossibleVector2,
  Signal,
  Spring,
  spring,
  TimingFunction,
  waitFor,
} from "@motion-canvas/core";

export function* fadeIn(node: Node, time: number, view?: View2D) {
  if (view && !view.children().includes(node)) {
    yield view.add(node);
  }
  node.opacity(0);
  yield* node.opacity(1, time);
}

export function* popSpringIn(
  node: Node,
  signals: Signal<any, number, any>[],
  springFunction: Spring,
  view?: View2D,
) {
  if (view && !view.children().includes(node)) {
    yield view.add(node);
  }

  const before: number[] = [];

  for (const [i, signal] of signals.entries()) {
    const initial = signal();
    before[i] = initial;
    signal(0);
  }

  yield* spring(
    springFunction,
    0,
    1 << 10,
    1,
    (value) => {
      signals.map((c, i) => c(value * before[i] >> 10));
    },
  );
}

export function* tp(
  node: Node,
  position: PossibleVector2,
  time: number,
  view?: View2D,
) {
  if (view && !view.children().includes(node)) {
    yield view.add(node);
  }

  const orgScale = node.scale();

  yield* node.scale([0, 0], time / 3);
  node.position(position);
  yield* waitFor(time / 3);
  yield* node.scale(orgScale, time / 3);
}

export function* slideIn(
  view: View2D,
  node: Node,
  direction: Direction,
  time: number,
  timingFunction?: TimingFunction,
  interpolationFunction?: InterpolationFunction<number, any[]>,
) {
  if (!node.parent()) {
    yield view.add(node);
  }

  if (direction === Direction.Top || direction === Direction.Bottom) {
    const iy = node.y();
    const y = view.height() / 2 + node.cacheBBox().height / 2 + 200;
    const dir = direction === Direction.Top ? -1 : 1;

    node.y(y * dir);
    yield* node.y(iy, time, timingFunction, interpolationFunction);
  } else if (direction === Direction.Left || direction === Direction.Right) {
    const ix = node.x();
    const x = view.width() / 2 + node.cacheBBox().width / 2 + 200;
    const dir = direction === Direction.Left ? -1 : 1;

    node.x(x * dir);
    yield* node.x(ix, time, timingFunction, interpolationFunction);
  }
}
