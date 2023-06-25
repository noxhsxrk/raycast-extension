import { Clipboard, open, showHUD } from "@raycast/api";

const main = async () => {
  const urlPromise = Clipboard.readText();
  const url = await urlPromise;
  if (!url) {
    await showHUD("Converted Failed!!");
    return await Clipboard.copy("");
  }


  const localhost = "http://localhost:8001/";
  const testCode = "&test_code=17A472FC374610CBF20A787910A29592EC3D0BA5E2986D120639A8F7639B09FB";
  const code = url.substring(71);

  const result = localhost + code + testCode;

  await open(result, "com.google.Chrome.canary");
  await Clipboard.copy(result);
  await showHUD("Converted Successfully!!");
};

export default main;
