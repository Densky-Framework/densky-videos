import { Layout, Rect, Txt } from "@motion-canvas/2d";
import {
  all,
  createRef,
  Direction,
  range,
  useRandom,
} from "@motion-canvas/core";
import { Colors, Icon, IconData, makeBaseScene2D, slideIn } from "video-common";

export default makeBaseScene2D(null, function* (view) {
  const random = useRandom();
  const background = new Rect({
    fill: "#0074f1",
    width: "100%",
    height: "100%",
  });
  const clouds = range(70).map((i) =>
    new Icon(i === 40 ? IconData.Ferris : IconData.Cloud, {
      x: random.nextInt(-920, 920),
      y: random.nextInt(-520, 520),
      fontSize: random.nextInt(52, 86),
      fill: i === 40 ? Colors.Rust : "#FFF",
    })
  );
  const layout = createRef<Layout>();
  view.add(
    <Layout
      ref={layout}
      gap={5000}
      layout
      minWidth="100%"
      height="100%"
      padding={50}
      zIndex={1}
    >
      <Rect
        padding={25}
        fill="#090909DD"
        width="50%"
        radius={15}
        layout
        direction="column"
      >
        <Layout layout direction="column" height="100%">
          <Txt fontSize={32} fill="#FFF" fontFamily="Manjer">
            See the description for details and useful links
          </Txt>
        </Layout>
        <Layout layout justifyContent="space-between">
          <Layout layout direction="column">
            <Txt fontSize={32} fill="#FFF" fontFamily="Manjer">
              Video made with ❤
            </Txt>
            <Txt fontSize={28} fill="#FFF" fontFamily="Manjer">
              and motion-canvas
            </Txt>
          </Layout>
          <Layout layout direction="column">
            <Txt fontSize={32} fill="#FFF" fontFamily="Manjer" textAlign="end">
              By
            </Txt>
            <Txt fontSize={28} fill="#FFF" fontFamily="Manjer" textAlign="end">
              Apika Luca
            </Txt>
          </Layout>
        </Layout>
      </Rect>

      <Layout
        layout
        direction="column"
        width="50%"
        paddingTop={25}
        paddingLeft={50}
        paddingRight={25}
        paddingBottom={25}
      >
        <Txt
          fontFamily="Manjer"
          textAlign="center"
          fill="#FFF"
          shadowBlur={10}
          shadowColor="#000"
        >
          Related videos
        </Txt>
        <Rect fill="#0005" width="100%" height="100%" radius={15} />
      </Layout>
    </Layout>,
  );

  yield* layout().gap(0, 1);

  yield* slideIn(view, background, Direction.Top, 3);
  yield* all(
    ...clouds.map((v, i) =>
      slideIn(
        view,
        v,
        Direction.Top,
        random.nextFloat(Math.max(0.1 * i + 0.1, 1), Math.max(0.2 * i + 0.2, 7)),
      )
    ),
  );
});
