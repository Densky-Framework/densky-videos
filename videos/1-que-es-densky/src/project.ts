import { makeProject } from "@motion-canvas/core";
import "./fonts.css";

import intro from "./scenes/0_intro?scene";
import introduction from "./scenes/1_introduction?scene";
import specialist from "./scenes/2_specialist?scene";
import edge from "./scenes/3_edge?scene";
import rust from "./scenes/4_rust?scene";
import outro from "./scenes/5_outro?scene";

export default makeProject({
  scenes: [intro, introduction, specialist, edge, rust, outro],
});
