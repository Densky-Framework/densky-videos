import { Txt, TxtProps } from "@motion-canvas/2d";

const defaultIconProps: TxtProps = {
  fill: "#FFF",
  fontSize: 72,
  fontFamily: "Symbol",
    shadowColor: "#000",
    shadowBlur: 5,
};

export class Icon extends Txt {
  constructor(icon: string, props?: TxtProps);
  constructor(props: TxtProps);
  constructor(icon: string | TxtProps, props?: TxtProps) {
    if (typeof icon == "string") {
      super({ children: icon, text: icon, ...defaultIconProps, ...props });
    } else {
      super({ ...defaultIconProps, ...props });
    }
  }
}

export enum IconData {
  ArrowFlat = "󰞕",
  Cloud = "󰅟",
  CloudAlert = "󰧠",
  CloudConfig = "󰞵",
  CloudLock = "󱇱",
  CloudPercent = "󱨵",
  CloudSearch = "󰥖",
  CloudUpload = "",
  DB = "",
  FamilyTree = "󱘎",
  Ferris = "",
  MongoDB = "",
  NaturalTree = "󰔱",
  PostgresDB = "",
  Router = "󰑩",
  Rust = "",
  Server = "󰒋",
  SqliteDB = "",
  Star = "",
}
