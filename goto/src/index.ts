import { LaunchProps, open, showHUD } from "@raycast/api";
import fetch from "node-fetch";

interface Args {
  where: string;
}

interface Data {
  path: Record<string, string>;
  [key: string]: unknown;
}

const PATH_CORRECTIONS: Record<string, string[]> = {
  vault: ["vautl", "valut", "vualt", "อฟีสะ", "อฟีะส", "อฟสีะ", "อีฟสะ"],
  braze: ["bra", "brae", "braz", "bz", "ิพฟ", "ิผ", "ิพฟผำ"],
  mixpanel: ["mixp", "mixapnel", "mixpane", "ทรป", "ทรปยฟืำส", "ทรปย"],
  grafana: ["grfana", "grfaana", "rgafana", "เพฟดฟืฟ", "เพดฟืฟ", "เพดฟฟืฟ"],
  jkcore: ["jkc", "cero", "ecro", "coer", "croe", "kjcore", "แนพำ", "่าแนพำ", "่าแ"],
  jkmf: ["jkm", "jkmf", "fm", "่าท", "ทด", "่าท"],
  cloud: ["แสนีก", "เนนเสำแสนีก", "clod", "cldou"],
  happyscore: ["happy", "score", "hs", "้ฟยยั"],
};

export default async function main(props: LaunchProps<{ arguments: Args }>) {
  const response = await fetch("https://api.npoint.io/73dd2cf8c0153021561c");
  const responseData = await response.json();
  const data = responseData as Data;

  let indexedData = data.path[props.arguments.where];
  if (!indexedData) {
    const correctedPath = correctTheInput(props.arguments.where);
    if (!correctedPath) {
      showHUD("Wrong Path!!");
      return;
    }
    indexedData = data.path[correctedPath];
  }
  open(indexedData, "company.thebrowser.Browser");
}

const correctTheInput = (path: string): string => {
  if (path.includes("'") || path.charAt(path.length - 1) == "ง") {
    path = path.substring(0, path.length - 1);
  }
  for (const [correctPath, alternatives] of Object.entries(PATH_CORRECTIONS)) {
    if (alternatives.includes(path)) {
      return correctPath;
    }
  }
  return "";
};
