import { copyFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { existsSync } from "node:fs";

const BUILT_FILE = "Vapor-Lyrics.js";

async function copyToSpicetify() {
    const appData = process.env.APPDATA || (process.platform === 'darwin' ? process.env.HOME + '/Library/Application Support' : process.env.HOME + "/.config");
    const targetDir = join(appData, "spicetify", "Extensions");

    console.log(`🚀 Copying to: ${targetDir}`);

    if (!existsSync(targetDir)) {
        await mkdir(targetDir, { recursive: true });
    }

    try {
        await copyFile(BUILT_FILE, join(targetDir, BUILT_FILE));
        console.log("✅ Success! File copied to Spicetify Extensions.");
    } catch (err) {
        console.error("❌ Error copying file:", err);
        process.exit(1);
    }
}

copyToSpicetify();
