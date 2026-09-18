import { watch } from "fs";
import { readFile, writeFile, readdir, mkdir } from "fs/promises"; // 👈 add mkdir
import { existsSync } from "fs";
import { join } from "path";

const BUILD_LOG = "./build.log";
const DIST_DIR = "./dist";
const ASSETS_DIR = "./dist/assets";
const INDEX_HTML = "./dist/index.html";

let lastPosition = 0;

/**
 * Sanitize content to remove null bytes and problematic control characters
 * that can cause issues with string processing and database storage
 */
function sanitizeContent(content) {
  if (!content) return content;

  // Remove null bytes (0x00) and other control characters that cause issues
  return content
    .replace(/\u0000/g, "") // Remove null bytes
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, ""); // Remove other problematic control chars (except newline, tab, carriage return)
}

async function checkForErrors() {
  try {
    if (!existsSync(BUILD_LOG)) {
      return;
    }

    // Read and sanitize content to remove null bytes
    let content = await readFile(BUILD_LOG, "utf-8");
    content = sanitizeContent(content);

    const newContent = content.slice(lastPosition);
    lastPosition = content.length;

    if (!newContent.trim()) {
      return;
    }

    const newLines = newContent.trim().split("\n");

    // Check if any line contains error indicators
    const hasError = newLines.some(
      (line) =>
        /\[31m/i.test(line) ||
        /error|failed|✘/i.test(line) ||
        /ENOENT|TypeError|SyntaxError|ReferenceError/i.test(line) ||
        /is not exported by|Cannot find module|Unexpected token/i.test(line) ||
        /\(\d+:\d+\):/i.test(line) ||
        /^file:/i.test(line),
    );

    if (hasError) {
      console.log("🚨 Build error detected!");

      // Read entire log file to get full context (not just new content)
      const allLines = content.split("\n");

      // Find the error line in the full log
      const errorLineIndex = allLines.findLastIndex(
        (line) =>
          /\[31m/i.test(line) ||
          /error|failed|ENOENT|TypeError|SyntaxError|ReferenceError/i.test(
            line,
          ) ||
          /is not exported by|Cannot find module|Unexpected token/i.test(
            line,
          ) ||
          /\(\d+:\d+\):/i.test(line) ||
          /^file:/i.test(line),
      );

      // Look backward for "build started" to get full context (up to 50 lines back)
      let startIndex = errorLineIndex;
      for (let i = errorLineIndex; i >= Math.max(0, errorLineIndex - 50); i--) {
        if (/build started/i.test(allLines[i])) {
          startIndex = i;
          break;
        }
      }

      // If no "build started" found, go back 20 lines from error
      if (startIndex === errorLineIndex) {
        startIndex = Math.max(0, errorLineIndex - 20);
      }

      // Collect all lines from start to end (or next 30 lines after error)
      const endIndex = Math.min(allLines.length, errorLineIndex + 30);
      const errorContext = allLines.slice(startIndex, endIndex).join("\n");

      await injectErrorToIndexHtml(errorContext);
    }
  } catch (err) {
    console.error("Error checking build log:", err);
  }
}

async function findMainJsFile() {
  try {
    if (!existsSync(ASSETS_DIR)) {
      return null;
    }

    const files = await readdir(ASSETS_DIR);
    // Find the main JS file (typically index-[hash].js)
    const jsFile = files.find((file) => file.match(/^index-[a-zA-Z0-9]+\.js$/));

    return jsFile ? join(ASSETS_DIR, jsFile) : null;
  } catch (err) {
    console.error("Error finding JS file:", err);
    return null;
  }
}

async function injectErrorToIndexHtml(errorMessage) {
  try {
    // Ensure dist directory exists before anything else
    await mkdir(DIST_DIR, { recursive: true }); // 👈 add this

    if (!existsSync(INDEX_HTML)) {
      console.log("⚠️  dist/index.html not found, creating error-only file");
      await writeFile(INDEX_HTML, generateErrorHtml(errorMessage)); // now safe
      return;
    }

    // Read existing index.html
    let htmlContent = await readFile(INDEX_HTML, "utf-8");

    // Remove any previously injected error script
    htmlContent = htmlContent.replace(
      /<script id="build-error-script">[\s\S]*?<\/script>\s*/g,
      "",
    );

    // Inject error script before closing </head> or </body> tag
    const errorScript = `
  <script id="build-error-script">
${generateErrorScript(errorMessage)}
  </script>`;

    if (htmlContent.includes("</head>")) {
      htmlContent = htmlContent.replace("</head>", `${errorScript}\n</head>`);
    } else if (htmlContent.includes("</body>")) {
      htmlContent = htmlContent.replace("</body>", `${errorScript}\n</body>`);
    } else {
      htmlContent += errorScript;
    }

    await writeFile(INDEX_HTML, htmlContent);
    console.log("✅ Error injected into dist/index.html");
  } catch (err) {
    console.error("Error injecting to index.html:", err);
  }
}

function generateErrorHtml(errorMessage) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Build Error</title>
</head>
<body>
  <script id="build-error-script">
${generateErrorScript(errorMessage)}
  </script>
</body>
</html>`;
}

function generateErrorScript(errorMessage) {
  // Strip ANSI color codes for better readability
  const cleanError = errorMessage
    .replace(/\[(\d+)m/g, "") // Remove ANSI codes like [31m, [39m
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\$/g, "\\$");

  return `
// BUILD ERROR DETECTED - Injected by watch-build-errors.js
(function() {
  const errorMsg = \`
  <error>
${cleanError}
<error/>
\`;
  
  // Send error to parent window via postMessage
  if (window.parent && window.parent !== window) {
    window.parent.postMessage({
      type: 'BUILD_ERROR',
      error: errorMsg,
      timestamp: new Date().toISOString(),
      source: 'vite-build-watcher'
    }, '*');
    console.log('📤 Error sent to parent via postMessage');
  }
  
  // Throw the error to appear in browser console
  const buildError = new Error('BUILD ERROR');
  buildError.name = '🚨 Vite Build Error';
  buildError.message = errorMsg;
  
  // Log styled error before throwing
  console.error('%c' + errorMsg, 'color: #ff0000; font-weight: bold; font-family: monospace;');
  
  // Display error overlay in the browser
  if (typeof document !== 'undefined') {
    const existingOverlay = document.getElementById('build-error-overlay');
    if (existingOverlay) {
      existingOverlay.remove();
    }
    
    const overlay = document.createElement('div');
    overlay.id = 'build-error-overlay';
    overlay.innerHTML = \`
      <div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.95); z-index: 999999; color: #ff6b6b; font-family: monospace; padding: 20px; overflow: auto;">
        <div style="max-width: 1200px; margin: 0 auto;">
          <h2 style="color: #ff6b6b; margin-bottom: 20px; font-size: 24px;">🚨 Build Error</h2>
          <pre style="background: #1a1a1a; padding: 20px; border-radius: 8px; overflow-x: auto; white-space: pre-wrap; word-wrap: break-word; font-size: 14px; line-height: 1.5;">\${errorMsg.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
          <button onclick="document.getElementById('build-error-overlay').remove()" style="margin-top: 20px; padding: 10px 20px; background: #ff6b6b; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 16px; font-weight: bold;">Close Overlay</button>
        </div>
      </div>
    \`;
    overlay.style.display = 'none';
    document.body.appendChild(overlay);
  }
  
  // Throw the error so it appears in console with stack trace
  throw buildError;
})();
`;
}

console.log("👀 Watching build.log for errors...");

// Watch the build.log file
if (existsSync(BUILD_LOG)) {
  // Initialize position (sanitize to get accurate length)
  readFile(BUILD_LOG, "utf-8")
    .then((content) => {
      const sanitized = sanitizeContent(content);
      lastPosition = sanitized.length;
    })
    .catch(() => {
      lastPosition = 0;
    });
}

watch(BUILD_LOG, { persistent: true }, (eventType) => {
  if (eventType === "change") {
    checkForErrors();
  }
});

// Also check periodically in case watch misses something
setInterval(checkForErrors, 1000);
