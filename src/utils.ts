import { showHUD, showToast, Toast, environment } from "@raycast/api";
import { exec } from "child_process";
import { promisify } from "util";
import { join } from "path";

const execAsync = promisify(exec);

export async function toggleMicrophone(mode: "0" | "1" | "2") {
  try {
    const target = "default_record";

    const nircmdPath = join(environment.assetsPath, "nircmd.exe");
    // Quote the path in case there are spaces
    await execAsync(`"${nircmdPath}" mutesysvolume ${mode} ${target}`);

    let message = "Microphone state toggled";
    if (mode === "1") message = "Microphone muted";
    else if (mode === "0") message = "Microphone unmuted";

    await showHUD(message);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    await showToast({
      style: Toast.Style.Failure,
      title: "Error Occurred",
      message: errorMessage,
    });
  }
}
