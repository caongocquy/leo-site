import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';

// Reproducible social-card art. Generated as JPEG for reliable previews on major social apps.
const WIDTH = 1200;
const HEIGHT = 630;
const svg = `<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#14242A"/><stop offset=".55" stop-color="#0D181D"/><stop offset="1" stop-color="#102E28"/></linearGradient>
  <radialGradient id="glow"><stop stop-color="#74E7B6" stop-opacity=".17"/><stop offset="1" stop-color="#74E7B6" stop-opacity="0"/></radialGradient>
  <linearGradient id="mint" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#C0F6DC"/><stop offset="1" stop-color="#71EAB9"/></linearGradient>
  <pattern id="grid" width="34" height="34" patternUnits="userSpaceOnUse"><path d="M34 0H0V34" fill="none" stroke="#A8F2D2" stroke-opacity=".065" stroke-width="1"/></pattern>
  <filter id="shadow"><feDropShadow dx="0" dy="24" stdDeviation="22" flood-color="#000" flood-opacity=".3"/></filter>
</defs>
<rect width="1200" height="630" fill="url(#bg)"/>
<rect width="1200" height="630" fill="url(#grid)"/>
<ellipse cx="980" cy="190" rx="370" ry="340" fill="url(#glow)"/>
<circle cx="1062" cy="100" r="3" fill="#80EABB" opacity=".8"/>
<circle cx="726" cy="72" r="2" fill="#80EABB" opacity=".5"/>
<circle cx="760" cy="552" r="3" fill="#80EABB" opacity=".8"/>

<rect x="68" y="61" width="55" height="55" rx="13" fill="url(#mint)"/>
<text x="82" y="101" fill="#0B211A" font-family="Arial,Helvetica,sans-serif" font-size="38" font-weight="800">L.</text>
<text x="142" y="97" fill="#CBDCD8" font-family="Arial,Helvetica,sans-serif" font-size="17" font-weight="700" letter-spacing="3">LEO / PORTFOLIO</text>
<path d="M67 152H1133" stroke="#446A5F" stroke-opacity=".65"/>

<text x="65" y="293" fill="url(#mint)" font-family="Arial,Helvetica,sans-serif" font-size="144" font-weight="800" letter-spacing="-11">LEO</text>
<text x="71" y="349" fill="#F2F8F5" font-family="Arial,Helvetica,sans-serif" font-size="39" font-weight="700">Mobile Engineer</text>
<text x="71" y="397" fill="#F2F8F5" font-family="Arial,Helvetica,sans-serif" font-size="39" font-weight="700">&amp; Open-Source Builder</text>
<text x="72" y="461" fill="#9FBFB5" font-family="Arial,Helvetica,sans-serif" font-size="21">React Native  /  Developer Tools  /  AI</text>
<rect x="72" y="502" width="276" height="44" rx="10" fill="#1F443B" stroke="#497D69"/>
<text x="90" y="530" fill="#BDF2D3" font-family="Arial,Helvetica,sans-serif" font-size="16" font-weight="600">github.com/caongocquy</text>

<!-- Editor + phone visuals are abstract artwork, not app screenshots. -->
<g filter="url(#shadow)">
<g transform="rotate(-6 868 349)">
  <rect x="693" y="182" width="403" height="340" rx="17" fill="#111F26" stroke="#41645C" stroke-width="2"/>
  <rect x="693" y="182" width="403" height="46" rx="17" fill="#203239"/>
  <rect x="693" y="208" width="403" height="20" fill="#203239"/>
  <circle cx="724" cy="205" r="6" fill="#F08383"/><circle cx="744" cy="205" r="6" fill="#E6BD67"/><circle cx="764" cy="205" r="6" fill="#73DAA7"/>
  <text x="806" y="210" font-family="Arial,Helvetica,sans-serif" font-size="15" fill="#D5E8DE">code-atlas.ts</text>
  <text x="718" y="266" font-family="monospace" font-size="18" fill="#8FC4F8">import</text>
  <text x="796" y="266" font-family="monospace" font-size="18" fill="#C9EBDF">{ graph }</text>
  <text x="718" y="305" font-family="monospace" font-size="18" fill="#A0EDBF">const</text>
  <text x="778" y="305" font-family="monospace" font-size="18" fill="#E7EEEF">workspace =</text>
  <rect x="719" y="331" width="306" height="9" rx="5" fill="#38665B"/>
  <rect x="719" y="355" width="231" height="9" rx="5" fill="#33504F"/>
  <rect x="719" y="379" width="274" height="9" rx="5" fill="#38665B"/>
  <rect x="719" y="403" width="202" height="9" rx="5" fill="#33504F"/>
  <rect x="719" y="447" width="134" height="27" rx="8" fill="#224638"/>
  <text x="733" y="466" font-family="Arial,Helvetica,sans-serif" font-size="12" font-weight="700" fill="#B6F1CF">OPEN SOURCE</text>
</g>
<g transform="rotate(6 1040 420)">
  <rect x="965" y="278" width="159" height="282" rx="29" fill="#07131A" stroke="#8FBFAE" stroke-width="6"/>
  <rect x="975" y="291" width="139" height="258" rx="21" fill="#EEF6F0"/>
  <rect x="1013" y="295" width="66" height="13" rx="7" fill="#0B1619"/>
  <text x="991" y="355" font-family="Arial,Helvetica,sans-serif" font-size="12" fill="#477A65">MOBILE</text>
  <text x="991" y="387" font-family="Arial,Helvetica,sans-serif" font-size="20" font-weight="700" fill="#112D27">Build better.</text>
  <rect x="991" y="422" width="108" height="32" rx="8" fill="#D3EDE0"/>
  <circle cx="1007" cy="438" r="5" fill="#63B78D"/>
  <rect x="1021" y="434" width="61" height="7" rx="3.5" fill="#74B99A"/>
  <rect x="991" y="468" width="108" height="32" rx="8" fill="#D3EDE0"/>
  <circle cx="1007" cy="484" r="5" fill="#63B78D"/>
  <rect x="1021" y="480" width="61" height="7" rx="3.5" fill="#74B99A"/>
</g>
</g>
<path d="M74 583H1128" stroke="#416B5D" stroke-opacity=".7"/>
<text x="72" y="609" fill="#93ABA5" font-family="Arial,Helvetica,sans-serif" font-size="16" letter-spacing="1.1">CAO NGOC QUY</text>
<text x="1129" y="609" fill="#93ABA5" text-anchor="end" font-family="Arial,Helvetica,sans-serif" font-size="16">leo-site.quy-caongoc.workers.dev</text>
</svg>`;

const destination = join(process.cwd(), 'public', 'og-image.jpg');
await mkdir(join(process.cwd(), 'public'), { recursive: true });
await sharp(Buffer.from(svg)).jpeg({ quality: 84, mozjpeg: true }).toFile(destination);
console.log(`Generated social preview: ${destination} (${WIDTH}x${HEIGHT})`);
