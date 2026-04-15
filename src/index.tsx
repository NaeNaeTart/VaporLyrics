import styles from "./style.css" with { type: "text" };
import { Kawarp as KawarpCore } from "@kawarp/core";

interface LyricSyllable {
    startTime: number;
    word: string;
    duration?: number;
}

interface LyricLine {
    startTime: number;
    endTime?: number;
    words: string;
    syllables?: LyricSyllable[];
    role?: "main" | "background" | "duet";
    agent?: string; // v1, v2, etc
}

interface VaporSettings {
    syncOffset: number;
    fontScale: number;
    visualEffect: "kawarp" | "none" | "static";
    textAlign: "center" | "left" | "right";
    showDebugOnStart: boolean;
    showHeader: boolean;
    useNativeSpotify: boolean;
    devMode: boolean;
}

const DEFAULT_SETTINGS: VaporSettings = {
    syncOffset: 0,
    fontScale: 1.0,
    visualEffect: "kawarp",
    textAlign: "center",
    showDebugOnStart: false,
    showHeader: true,
    useNativeSpotify: true,
    devMode: false,
};

const parseLRC = (lrc: string): LyricLine[] => {
    const lines = lrc.split('\n');
    const parsed: LyricLine[] = [];
    const lineRegex = /\[(\d+):(\d+(?:\.\d+)?)\]/;
    
    lines.forEach(line => {
        const match = line.match(lineRegex);
        if (match) {
            const time = (parseInt(match[1]!) * 60 + parseFloat(match[2]!)) * 1000;
            let wordsRaw = line.replace(lineRegex, '').trim();
            
            if (wordsRaw.includes('<')) {
                const syllables: LyricSyllable[] = [];
                const parts = wordsRaw.split(/(<\d+:\d+(?:\.\d+)?>)/g).filter(p => p.length > 0);
                
                let currentSylTime = time;
                let cleanWords = "";
                
                parts.forEach(part => {
                    const sylMatch = part.match(/<(\d+):(\d+(?:\.\d+)?)>/);
                    if (sylMatch) {
                        currentSylTime = (parseInt(sylMatch[1]!) * 60 + parseFloat(sylMatch[2]!)) * 1000;
                    } else {
                        cleanWords += part;
                        syllables.push({ startTime: currentSylTime, word: part });
                    }
                });
                
                let role: LyricLine["role"] = "main";
                if (cleanWords.trim().startsWith("(") && cleanWords.trim().endsWith(")")) role = "background";
                else if (cleanWords.includes(": ")) role = "duet";

                parsed.push({ startTime: time, words: cleanWords.trim(), syllables, role });
            } else if (wordsRaw) {
                let role: LyricLine["role"] = "main";
                if (wordsRaw.startsWith("(") && wordsRaw.endsWith(")")) role = "background";
                else if (wordsRaw.includes(": ")) role = "duet";
                parsed.push({ startTime: time, words: wordsRaw, role });
            }
        } else if (line.trim().length > 0 && !line.includes('[by:') && !line.includes('[ar:')) {
            let role: LyricLine["role"] = "main";
            let content = line.trim();
            if (content.startsWith("(") && content.endsWith(")")) role = "background";
            parsed.push({ startTime: 0, words: content, role });
        }
    });
    const separateBackgroundVocals = (lines: LyricLine[]): LyricLine[] => {
        const final: LyricLine[] = [];
        lines.forEach(line => {
            const hasParens = line.words.includes("(") || line.words.includes(")");
            const isMixed = hasParens && !(line.words.trim().startsWith("(") && line.words.trim().endsWith(")"));
            
            if (isMixed && line.syllables) {
                const mainSyllables = line.syllables.filter(s => !s.word.trim().includes("(")).map(s => ({...s}));
                const bgSyllables = line.syllables.filter(s => s.word.trim().includes("(")).map(s => ({
                    ...s,
                    word: s.word.replace(/[()]/g, '').trim()
                }));
                
                if (mainSyllables.length > 0) {
                    final.push({ ...line, words: mainSyllables.map(s => s.word).join("").trim(), syllables: mainSyllables, role: line.role === "duet" ? "duet" : "main" });
                }
                if (bgSyllables.length > 0) {
                    final.push({ ...line, words: bgSyllables.map(s => s.word).join("").trim(), syllables: bgSyllables, role: "background", agent: undefined });
                }
            } else {
                const cleanedLine = { ...line };
                if (line.words.includes("(")) {
                    cleanedLine.words = line.words.replace(/[()]/g, '').trim();
                    if (line.syllables) {
                        cleanedLine.syllables = line.syllables.map(s => ({
                            ...s,
                            word: s.word.replace(/[()]/g, '').trim()
                        }));
                    }
                    cleanedLine.role = "background";
                    cleanedLine.agent = undefined;
                }
                final.push(cleanedLine);
            }
        });
        return final.sort((a,b) => a.startTime - b.startTime);
    };

    const finalParsed = separateBackgroundVocals(parsed);
    finalParsed.forEach(line => {
        if (line.syllables) {
            for (let j = 0; j < line.syllables.length; j++) {
                const s = line.syllables[j]!;
                if (j < line.syllables.length - 1) s.duration = line.syllables[j+1]!.startTime - s.startTime;
                else s.duration = Math.max(200, (line.endTime || s.startTime + 1000) - s.startTime);
            }
        }
    });
    return finalParsed;
};

const parseTTML = (ttml: string): LyricLine[] => {
    try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(ttml, "text/xml");
        const parsed: LyricLine[] = [];
        
        const parseTime = (timeStr: string | null): number => {
            if (!timeStr) return 0;
            const parts = timeStr.split(':').map(parseFloat);
            if (parts.length === 3) return (parts[0]! * 3600 + parts[1]! * 60 + parts[2]!) * 1000;
            if (parts.length === 2) return (parts[0]! * 60 + parts[1]!) * 1000;
            return parts[0]! * 1000;
        };

        const pTags = doc.getElementsByTagName("p");
        for (let i = 0; i < pTags.length; i++) {
            const p = pTags[i]!;
            const pTime = parseTime(p.getAttribute("begin"));
            const agent = p.getAttribute("ttm:agent") || "v1";
            const roleAttr = p.getAttribute("ttm:role") || "";
            
            let syllables: LyricSyllable[] = [];
            let cleanWords = "";

            const processNode = (node: Node, isBg: boolean) => {
                if (node.nodeType === Node.TEXT_NODE) {
                    const text = node.textContent || "";
                    if (text.trim().length > 0) {
                        cleanWords += text;
                        syllables.push({ startTime: pTime, word: text });
                    }
                } else if (node.nodeType === Node.ELEMENT_NODE) {
                    const el = node as Element;
                    if (el.tagName === "span") {
                        const sTime = parseTime(el.getAttribute("begin")) || pTime;
                        const sRole = el.getAttribute("ttm:role") || "";
                        const innerIsBg = isBg || sRole === "background" || sRole === "x-bg";
                        
                        let sText = "";
                        for (let j = 0; j < el.childNodes.length; j++) {
                            const child = el.childNodes[j]!;
                            if (child.nodeType === Node.TEXT_NODE) sText += child.textContent;
                            else if (child.nodeType === Node.ELEMENT_NODE && (child as Element).tagName === "span") {
                                 sText += child.textContent;
                            }
                        }
                        
                        let word = sText;
                        if (innerIsBg && !word.startsWith("(")) word = `(${word})`;

                        // Spacing Fix: If this span doesn't end in space/hyphen, and there is more content, add a space
                        if (!word.endsWith(" ") && !word.endsWith("-") && node.nextSibling) {
                            const next = node.nextSibling;
                            const nextText = next.textContent || "";
                            if (nextText.length > 0 && !nextText.startsWith(" ") && !nextText.startsWith("-")) {
                                word += " ";
                            }
                        }
                        
                        syllables.push({ startTime: sTime, word });
                        cleanWords += word;
                    } else if (el.tagName === "br") {
                        cleanWords += " ";
                    } else {
                        for (let j = 0; j < el.childNodes.length; j++) {
                            processNode(el.childNodes[j]!, isBg);
                        }
                    }
                }
            };

            const isLineBg = roleAttr === "background" || roleAttr === "x-bg" || (p.textContent?.trim().startsWith("(") && p.textContent?.trim().endsWith(")"));
            
            const spanTags = p.getElementsByTagName("span");
            if (spanTags.length > 0) {
                for (let j = 0; j < p.childNodes.length; j++) {
                    processNode(p.childNodes[j]!, isLineBg);
                }
            } else {
                cleanWords = p.textContent?.trim() || "";
                if (isLineBg && !cleanWords.startsWith("(")) cleanWords = `(${cleanWords})`;
            }

            if (cleanWords.trim()) {
                parsed.push({ 
                    startTime: pTime, 
                    endTime: parseTime(p.getAttribute("end")) || pTime + 5000,
                    words: cleanWords.trim(), 
                    syllables: syllables.length > 0 ? syllables : undefined, 
                    role: isLineBg ? "background" : (agent === "v2" ? "duet" : "main"),
                    agent 
                });
            }
        }
        
        // Post-process to add end times for better tracking
        for (let i = 0; i < parsed.length; i++) {
            const current = parsed[i]!;
            if (i < parsed.length - 1) current.endTime = parsed[i+1]!.startTime;
            else current.endTime = current.startTime + 5000;
        }

        const separateBackgroundVocals = (lines: LyricLine[]): LyricLine[] => {
            const final: LyricLine[] = [];
            lines.forEach(line => {
                const hasParens = line.words.includes("(") || line.words.includes(")");
                const isMixed = hasParens && !(line.words.trim().startsWith("(") && line.words.trim().endsWith(")"));
                
                if (isMixed && line.syllables) {
                    const mainSyllables = line.syllables.filter(s => !s.word.trim().includes("(")).map(s => ({...s}));
                    const bgSyllables = line.syllables.filter(s => s.word.trim().includes("(")).map(s => ({
                        ...s,
                        word: s.word.replace(/[()]/g, '').trim()
                    }));
                    if (mainSyllables.length > 0) {
                        const mWords = mainSyllables.map(s => s.word).join("").trim();
                        final.push({ ...line, words: mWords, syllables: mainSyllables, role: line.role === "duet" ? "duet" : "main" });
                    }
                    if (bgSyllables.length > 0) {
                        const bWords = bgSyllables.map(s => s.word).join("").trim();
                        final.push({ ...line, words: bWords, syllables: bgSyllables, role: "background", agent: undefined });
                    }
                } else {
                    const cleanedLine = { ...line };
                    if (line.words.includes("(")) {
                        cleanedLine.words = line.words.replace(/[()]/g, '').trim();
                        if (line.syllables) {
                            cleanedLine.syllables = line.syllables.map(s => ({
                                ...s,
                                word: s.word.replace(/[()]/g, '').trim()
                            }));
                        }
                        cleanedLine.role = "background";
                        cleanedLine.agent = undefined;
                    }
                    final.push(cleanedLine);
                }
            });
            return final.sort((a,b) => a.startTime - b.startTime);
        };

        const finalParsed = separateBackgroundVocals(parsed);

        // Calculate durations for each syllable
        finalParsed.forEach(line => {
            if (line.syllables) {
                for (let j = 0; j < line.syllables.length; j++) {
                    const s = line.syllables[j]!;
                    if (j < line.syllables.length - 1) {
                        s.duration = line.syllables[j+1]!.startTime - s.startTime;
                    } else if (line.endTime) {
                        s.duration = Math.max(200, line.endTime - s.startTime);
                    } else {
                        s.duration = 400;
                    }
                }
            }
        });

        console.log(`[Vapor] DOM Parser: Captured ${finalParsed.length} lines (Post-separated)`);
        return finalParsed;
    } catch (e) {
        console.error("[Vapor] TTML Parsing failed:", e);
        return [];
    }
};

const App = () => {
    const React = Spicetify.React;
    const { useEffect, useState, useRef } = React;
    const useStateTyped = useState as <T>(val: T | (() => T)) => [T, (val: T | ((prev: T) => T)) => void];

    const [lyrics, setLyrics] = useStateTyped<LyricLine[]>([]);
    const [activeIndices, setActiveIndices] = useStateTyped<number[]>([]);
    const [loading, setLoading] = useStateTyped(false);
    const [status, setStatus] = useStateTyped("Establishing signal...");
    const [coverArt, setCoverArt] = useStateTyped("");
    
    const [transformY, setTransformY] = useStateTyped(0);
    const userOffsetRef = useRef(0);
    const isScrollingRef = useRef(false);
    const scrollTimeoutRef = useRef(null as any);
    
    const [debugLogs, setDebugLogs] = useStateTyped<string[]>([]);
    const [showDebug, setShowDebug] = useStateTyped(false);
    const [showSettings, setShowSettings] = useStateTyped(false);
    
    const [settings, setSettings] = useStateTyped<VaporSettings>(() => {
        const saved = Spicetify.LocalStorage.get("vapor-lyrics-settings");
        if (saved) {
            try { 
                const obj = JSON.parse(saved);
                return { ...DEFAULT_SETTINGS, ...obj }; 
            } catch (e) {}
        }
        return DEFAULT_SETTINGS;
    });

    const settingsRef = useRef(settings);
    useEffect(() => {
        settingsRef.current = settings;
        Spicetify.LocalStorage.set("vapor-lyrics-settings", JSON.stringify(settings));
    }, [settings]);

    useEffect(() => {
        if (settings.showDebugOnStart) setShowDebug(true);
    }, []);

    const lyricsRef = useRef([] as LyricLine[]);
    const containerRef = useRef(null as HTMLDivElement | null);
    const trackRef = useRef(null as string | null);
    const canvasRef = useRef(null as HTMLCanvasElement | null);
    const kawarpRef = useRef(null as any);
    const manualLyricsRef = useRef(null as LyricLine[] | null);
    const activeIndicesRef = useRef([] as number[]); // RAF-safe active tracking
    const transformYRef = useRef(0); // Avoids 60fps React re-renders
    
    const getManualStore = () => {
        try { return JSON.parse(Spicetify.LocalStorage.get("vapor-manual-store") || "{}"); }
        catch { return {}; }
    };
    const saveManualLyric = (uri: string, lyrics: LyricLine[]) => {
        const store = getManualStore();
        store[uri] = lyrics;
        Spicetify.LocalStorage.set("vapor-manual-store", JSON.stringify(store));
    };

    const log = (msg: string, type: "info" | "warn" | "error" | "success" = "info") => {
        const time = new Date().toLocaleTimeString().split(' ')[0];
        const formatted = `[${time}] ${msg}`;
        setDebugLogs((prev: string[]) => [formatted, ...prev].slice(0, 50));
        if (type === "error") console.error(msg);
        else if (type === "warn") console.warn(msg);
        else console.log(msg);
    };

    const fetchLyrics = async () => {
        const data = Spicetify.Player.data;
        const trackObj = data?.track || data?.item || Spicetify.Player.track || {};
        const meta = trackObj?.metadata || {};
        
        let title = meta.title || meta.name || trackObj.title || trackObj.name || "";
        let artist = meta.artist_name || meta.artist || trackObj.artist || "";
        let cover = meta.image_xlarge_url || meta.image_large_url || meta.image_url || "";
        if (cover.startsWith("spotify:image:")) cover = `https://i.scdn.co/image/${cover.split(":")[2]}`;
        setCoverArt(cover);

        // ULTIMATE DOM FALLBACK - If the API is blank, we read the screen
        if (!title || title.length < 1) {
            title = document.querySelector('[data-testid="now-playing-widget"] [data-testid="context-item-link"]')?.textContent || 
                   document.querySelector('.main-nowPlayingWidget-trackTitle')?.textContent || "";
            artist = document.querySelector('[data-testid="now-playing-widget"] [data-testid="context-item-info-subtitles"]')?.textContent || 
                    document.querySelector('.main-nowPlayingWidget-trackArtists')?.textContent || "";
        }

        if (!title || title.trim().length === 0) {
            setStatus("Signal Lost: Searching Metadata...");
            setLoading(false);
            return;
        }

        // Advanced Title Cleaning (stripping "feat.", "(with...)", remastered, etc)
        const cleanTitle = title.split('(')[0].split('-')[0].split(' feat.')[0].split(' ft.')[0].trim();
        const cleanArtist = artist.split(',')[0].split('&')[0].trim();

        setLoading(true);
        const metaInfo = `Syncing: ${cleanArtist} - ${cleanTitle}`;
        setStatus(metaInfo);
        setDebugLogs([]);
        log(`Starting Fetch for ${cleanArtist} - ${cleanTitle}`);
        log(`Metadata: ${title} | ${artist} | ${trackObj.uri}`);

        // Check Manual Overrides
        if (manualLyricsRef.current) {
            log("Applying Session-Manual lyrics", "success");
            setLyrics(manualLyricsRef.current);
            lyricsRef.current = manualLyricsRef.current;
            setStatus("Signal Active (Manual Session)");
            setLoading(false);
            return;
        }

        const persistentStore = getManualStore();
        if (trackObj.uri && persistentStore[trackObj.uri]) {
            log("Applying Persistent-Manual lyrics", "success");
            setLyrics(persistentStore[trackObj.uri]);
            lyricsRef.current = persistentStore[trackObj.uri];
            setStatus("Signal Active (Manual Persistent)");
            setLoading(false);
            return;
        }
        
        const getAppleMusicTTML = async () => {
            log("Resolving Apple Music mapping...");
            const spotifyId = trackObj.uri?.split(":")[2];
            const isrc = trackObj.metadata?.isrc;
            let amId = "";

            // Layer 1: ISRC Search (Most Accurate)
            if (isrc) {
                log(`Direct ISRC lookup: ${isrc}`);
                const searchUrl = `https://lyrics.paxsenix.org/apple-music/search?q=${isrc}`;
                try {
                    const res = await Spicetify.CosmosAsync.get(searchUrl, null, { 
                        'User-Agent': 'Metrolist/13.4.0',
                        'Accept': 'application/json'
                    });
                    
                    if (res?.message || res?.error) {
                        log(`AM Search Error: ${res.message || res.error}`, "error");
                    }

                    let arr = res?.results || res?.data || res?.items;
                    if (Array.isArray(res)) arr = res;
                    if (arr && arr.length > 0) {
                        amId = arr[0].id;
                        log(`Match found via ISRC: ${amId} (${arr[0].name})`, "success");
                    }
                } catch (e) {
                    log(`ISRC Search Exception: ${e}`, "warn");
                }
            }

            // Layer 2: Songlink Mapping (Accurate but rate-limited)
            if (!amId) {
                log("Trying Songlink mapping...");
                try {
                    const songlinkUrl = `https://api.song.link/v1-alpha.1/links?url=spotify:track:${spotifyId}`;
                    const slRes = await Spicetify.CosmosAsync.get(songlinkUrl);
                    const amEntity = slRes?.linksByPlatform?.appleMusic;
                    if (amEntity) {
                        amId = amEntity.entityUniqueId.split("::")[1];
                        log(`Songlink mapped Apple Music ID: ${amId}`, "success");
                    } else if (slRes?.statusCode === 429) {
                        log("Songlink 429: Too Many Requests.", "warn");
                    }
                } catch (e) {
                    log("Songlink mapping failed, trying fuzzy search...", "warn");
                }
            }

            // Layer 3: Fuzzy Text Search (Fallback)
            if (!amId) {
                log(`Attempting Fuzzy Search: ${cleanArtist} - ${cleanTitle}`);
                const searchUrl = `https://lyrics.paxsenix.org/apple-music/search?q=${encodeURIComponent(cleanArtist + " " + cleanTitle)}`;
                let searchRes;
                try { 
                    searchRes = await Spicetify.CosmosAsync.get(searchUrl, null, { 
                        'User-Agent': 'Metrolist/13.4.0',
                        'Accept': 'application/json'
                    });
                } catch (e) {
                    log("Fuzzy Search fetch failed.", "error");
                }
                
                if (searchRes?.message || searchRes?.error) {
                    log(`Fuzzy Search Error: ${searchRes.message || searchRes.error}`, "error");
                }
                log(`Search Response keys: ${searchRes ? Object.keys(searchRes).join(", ") : "null"}`);
                let arr = searchRes?.results || searchRes?.data || searchRes?.items;
                if (Array.isArray(searchRes) && searchRes.length > 0) arr = searchRes;
                if (arr && arr.length > 0) {
                    amId = arr[0].id;
                    log(`Fuzzy Search found ID: ${amId} (${arr[0].name})`, "success");
                }
            }
            
            if (amId) {
                const lyricsUrl = `https://lyrics.paxsenix.org/apple-music/lyrics?id=${amId}&ttml=true`;
                log(`Final Target AM ID: ${amId}`);
                log(`Requesting TTML from Paxsenix...`);
                let text = "";
                
                const processAmResponse = (resStr: string) => {
                    log(`Response Length: ${resStr.length} chars`);
                    try {
                        const obj = JSON.parse(resStr);
                        log(`Parsed JSON metadata: ${Object.keys(obj).join(", ")}`);
                        if (typeof obj === 'string') return obj;
                        if (obj.ttml) return obj.ttml;
                        if (obj.lyrics) return obj.lyrics;
                        if (obj.data?.lyrics) return obj.data.lyrics;
                    } catch(e) {
                        log("Response is likely raw TTML/XML string.");
                    }
                    return resStr;
                };

                try {
                    const res = await Spicetify.CosmosAsync.get(lyricsUrl, null, { 
                        'User-Agent': 'Metrolist/13.4.0'
                    });
                    text = typeof res === 'string' ? res : (res.ttml || res.lyrics || res.data?.lyrics || JSON.stringify(res));
                    text = processAmResponse(text);
                } catch (e) {
                    log(`Paxsenix fetch failed: ${e}`, "error");
                }

                if (text && text.includes("<tt")) {
                    const parsed = parseTTML(text);
                    if (parsed.length > 0) {
                        log("Successfully parsed AM TTML", "success");
                        return { parsed, source: "Apple Music TTML" };
                    }
                } else if (text) {
                    log("Text found but doesn't look like TTML. Samples: " + text.substring(0, 50), "warn");
                }
            }
            log("Apple Music: No results or failed mapping.", "warn");
            throw new Error("No Apple Music match");
        };

        const getMusixmatchWord = async () => {
            log("Attempting Musixmatch (Paxsenix)...");
            const url = `https://lyrics.paxsenix.org/musixmatch/lyrics?t=${encodeURIComponent(cleanTitle)}&a=${encodeURIComponent(cleanArtist)}&type=word`;
            let text = "";
            try {
                const res = await fetch(url, { 
                    headers: { 
                        'User-Agent': 'Metrolist/13.4.0',
                        'Accept': 'application/json'
                    } 
                });
                if (!res.ok) throw new Error("MXM Fetch Error");
                text = await res.text();
                // Attempt to parse out if it returned a JSON escaped string or object
                try {
                    const obj = JSON.parse(text);
                    if (typeof obj === 'string') text = obj;
                    else if (obj.lyrics) text = obj.lyrics;
                    else if (obj.text) text = obj.text;
                } catch(e) {}
            } catch (e) {
                // Fallback to CosmosAsync if CORS blocked native fetch
                const res = await Spicetify.CosmosAsync.get(url, null, { 
                    'User-Agent': 'Metrolist/13.4.0',
                    'Accept': 'application/json'
                });
                text = typeof res === 'string' ? res : (res.lyrics || res.text || JSON.stringify(res));
            }

            const parsed = parseLRC(text);
            if (parsed.length > 0) {
                log("Successfully parsed MXM Word-Sync", "success");
                return { parsed, source: "Musixmatch Word-Sync" };
            }
            log("Musixmatch: No match found.", "warn");
            throw new Error("No MXM word match");
        };

        const getLrcLib = async () => {
            log("Attempting LRCLIB...");
            const res = await Spicetify.CosmosAsync.get(`https://lrclib.net/api/search?artist_name=${encodeURIComponent(cleanArtist)}&track_name=${encodeURIComponent(cleanTitle)}`);
            if (res && res.length > 0) {
                const item = res[0];
                const text = item.syncedLyrics || item.plainLyrics || "";
                const parsed = parseLRC(text);
                if (parsed.length > 0) {
                    log("Successfully parsed LRCLIB", "success");
                    return { parsed, source: "LRCLIB" };
                }
            }
            log("LRCLIB: No results.", "warn");
            throw new Error("No LRCLIB match");
        };

        const getLyricsOvh = async () => {
            log("Attempting Lyrics.ovh...");
            try {
                const url = `https://api.lyrics.ovh/v1/${encodeURIComponent(cleanArtist)}/${encodeURIComponent(cleanTitle)}`;
                const r = await fetch(url);
                if (!r.ok) throw new Error(`HTTP ${r.status}`);
                const res = await r.json();
                if (res.lyrics) {
                    const parsed = parseLRC(res.lyrics);
                    if (parsed.length > 0) {
                        log("Successfully parsed Lyrics.ovh", "success");
                        return { parsed, source: "Lyrics.ovh" };
                    }
                }
            } catch (e) {
                log(`Lyrics.ovh failed: ${e}`, "warn");
            }
            throw new Error("No Lyrics.ovh match");
        };

        const getNetEase = async () => {
            log("Attempting NetEase...");
            const searchUrl = `https://lyrics.paxsenix.org/netease/search?q=${encodeURIComponent(cleanArtist + " " + cleanTitle)}`;
            try {
                const searchRes = await Spicetify.CosmosAsync.get(searchUrl, null, { 'User-Agent': 'Spicetify/1.0 (https://github.com/spicetify/spicetify-cli)' });
                const songId = searchRes?.result?.songs?.[0]?.id;
                if (!songId) {
                    log("NetEase: No search results.", "warn");
                    throw new Error("No NetEase match");
                }

                // We use a different proxy for the actual lyrics if Paxsenix 403s
                log(`Found NetEase Match: ${songId}. Fetching lyrics...`);
                const lyricUrl = `https://music.cyrvoid.com/lyric?id=${songId}`;
                const res = await fetch(lyricUrl).then(r => r.json());
                const lrc = res?.lrc?.lyric || "";
                const yrc = res?.yrc?.lyric || ""; // YRC is NetEase's word-sync format
            
                if (!lrc && !yrc) {
                    log("NetEase: No lyrics returned for this ID.", "warn");
                }
                
            const parseYRC = (yrc: string): LyricLine[] => {
                const parsed: LyricLine[] = [];
                const lines = yrc.split('\n');
                lines.forEach(line => {
                    const match = line.match(/\[(\d+),(\d+)\](.*)/);
                    if (match) {
                        const startTime = parseInt(match[1]!);
                        const wordsRaw = match[3] || "";
                        const syllables: LyricSyllable[] = [];
                        let cleanWords = "";
                        const wordRegex = /\((\d+),(\d+),\d+\)([^\(]*)/g;
                        let wMatch;
                        while ((wMatch = wordRegex.exec(wordsRaw)) !== null) {
                            const wordStart = parseInt(wMatch[1]!);
                            const wordText = wMatch[3] || "";
                            syllables.push({ startTime: startTime + wordStart, word: wordText });
                            cleanWords += wordText;
                        }
                        parsed.push({ 
                            startTime, 
                            words: syllables.length > 0 ? cleanWords : wordsRaw, 
                            syllables: syllables.length > 0 ? syllables : undefined 
                        });
                    }
                });
                // Add end times
                for (let i = 0; i < parsed.length; i++) {
                    const cur = parsed[i]!;
                    cur.endTime = i < parsed.length - 1 ? parsed[i+1]!.startTime : cur.startTime + 5000;
                }
                // Calculate syllable durations
                parsed.forEach(line => {
                    if (line.syllables) {
                        for (let j = 0; j < line.syllables.length; j++) {
                            const s = line.syllables[j]!;
                            if (j < line.syllables.length - 1) s.duration = line.syllables[j+1]!.startTime - s.startTime;
                            else s.duration = Math.max(200, (line.endTime || s.startTime + 1000) - s.startTime);
                        }
                    }
                });
                return parsed;
            };
            const parsed = yrc ? parseYRC(yrc) : parseLRC(lrc);
            if (parsed.length > 0) {
                log("NetEase parsed successfully.", "success");
                return { parsed, source: yrc ? "NetEase Word-Sync" : "NetEase" };
            }
            log("NetEase: Parse failed.", "error");
            throw new Error("NetEase parse failed");
            } catch (e) {
                log(`NetEase fetch failed: ${e}`, "error");
                throw e;
            }
        };

        const getSpotify = async () => {
            log("Attempting Spotify Native...");
            const id = trackObj.uri?.split(":")[2];
            if (!id) throw new Error("No track ID");
            let res;
            try {
                res = await Spicetify.CosmosAsync.get(`https://spclient.wg.spotify.com/color-lyrics/v2/track/${id}`);
                log(`Spotify Sync Type: ${res?.lyrics?.syncType}`, res?.lyrics?.lines ? "info" : "warn");
            } catch (e) {
                log("Spotify Native API Failed.", "warn");
                throw new Error("Spotify Color-Lyrics API Error");
            }
            if (res && res.lyrics && res.lyrics.lines) {
                const parsed: LyricLine[] = res.lyrics.lines.map((l: any) => {
                    const syllables = l.syllables ? l.syllables.map((s: any) => ({
                        startTime: parseInt(s.startTimeMs || "0"),
                        word: s.word || s.character || s.text || ""
                    })) : undefined;
                    return {
                        startTime: parseInt(l.startTimeMs || "0"),
                        words: l.words || "",
                        syllables: syllables && syllables.length > 0 ? syllables : undefined
                    };
                });
                if (parsed.length > 0) {
                    return { 
                        parsed, 
                        source: res.lyrics.syncType === "SYLLABLE_SYNCED" ? "Spotify Word-Sync" : "Spotify" 
                    };
                }
            }
            throw new Error("No Spotify match");
        };

        const getSpotifyProxy = async () => {
            log("Attempting Spotify Lyrics API (Proxy)...");
            const id = trackObj.uri?.split(":")[2];
            if (!id) throw new Error("No track ID");
            const url = `https://spotify-lyric-api-984e7b4face0.herokuapp.com/?trackid=${id}`;
            
            try {
                const r = await fetch(url);
                log(`Proxy Status: ${r.status}`);
                if (!r.ok) throw new Error(`HTTP ${r.status}`);
                const res = await r.json();
                
                if (res && !res.error && (res.lines || res.lyrics?.lines)) {
                    const lines = res.lines || res.lyrics.lines;
                    const syncType = res.syncType || res.lyrics?.syncType;
                    const parsed: LyricLine[] = lines.map((l: any) => {
                        const syllables = l.syllables ? l.syllables.map((s: any) => ({
                            startTime: parseInt(s.startTimeMs || "0"),
                            word: s.word || s.character || s.text || ""
                        })) : undefined;
                        return {
                            startTime: parseInt(l.startTimeMs || "0"),
                            words: l.words || "",
                            syllables: syllables && syllables.length > 0 ? syllables : undefined
                        };
                    });
                    if (parsed.length > 0) {
                        return { 
                            parsed, 
                            source: syncType === "SYLLABLE_SYNCED" ? "Spotify Proxy Word-Sync" : "Spotify Proxy" 
                        };
                    }
                } else if (res.error) {
                    log(`Proxy API reported error: ${res.message || "Unknown"}`, "warn");
                }
            } catch (e) {
                log(`Spotify Proxy Exception: ${e}`, "error");
            }
            throw new Error("Spotify Proxy failed");
        };

        let bestQualityReached = false;
        let signalFound = false;

        const applyLyrics = (res: {parsed: LyricLine[], source: string}) => {
            if (bestQualityReached) return;
            
            let isHighFidelity = res.source === "Apple Music TTML" || 
                                 res.source === "Musixmatch Word-Sync" || 
                                 res.source === "Spotify Word-Sync";
                                 
            if (isHighFidelity) bestQualityReached = true;
            signalFound = true;
            setLyrics(res.parsed);
            lyricsRef.current = res.parsed;
            setStatus(`Signal Active (${res.source}) [${res.parsed.length} lines]`);
            log(`Applied source: ${res.source}`, "success");
        };

        let fetchPromises = [
            getSpotify().then(applyLyrics).catch(() => {}),
            getSpotifyProxy().then(applyLyrics).catch(() => {}),
            getAppleMusicTTML().then(applyLyrics).catch(() => {}),
            getMusixmatchWord().then(applyLyrics).catch(() => {}),
            getNetEase().then(applyLyrics).catch(() => {}),
            getLrcLib().then(applyLyrics).catch(() => {}),
            getLyricsOvh().then(applyLyrics).catch(() => {})
        ];

        Promise.allSettled(fetchPromises).then(() => {
            if (!signalFound) {
                log("No providers found any lyrics.", "error");
                setStatus("Database record empty for this track.");
                setLyrics([]);
                lyricsRef.current = [];
            }
            setLoading(false);
        });
    };

    // Animation Loop — runs once, reads from refs, writes to DOM directly for perf
    useEffect(() => {
        let frame: number;
        const update = () => {
            const currentTime = Spicetify.Player.getProgress() + settingsRef.current.syncOffset;
            const lines = lyricsRef.current;
            
            if (lines.length > 0) {
                const currentActive: number[] = [];
                for (let i = 0; i < lines.length; i++) {
                    const line = lines[i]!;
                    const endTime = line.endTime || (i < lines.length - 1 ? lines[i+1]!.startTime : line.startTime + 5000);
                    if (currentTime >= line.startTime && currentTime < endTime) {
                        currentActive.push(i);
                    }
                }
                
                // Only trigger React re-render when active lines actually change
                const prevActive = activeIndicesRef.current;
                const changed = currentActive.length !== prevActive.length ||
                                 currentActive.some((v, i) => v !== prevActive[i]);
                if (changed) {
                    activeIndicesRef.current = currentActive;
                    setActiveIndices(currentActive);
                }
                
                try {
                    if (currentActive.length > 0 && containerRef.current) {
                        const container = containerRef.current.parentElement;
                        if (container && !isScrollingRef.current) {
                            const containerHeight = container.clientHeight;
                            let targetY: number | null = null;

                            const isMulti = currentActive.length > 1;
                            if (isMulti !== containerRef.current.classList.contains('multi-active')) {
                                containerRef.current.classList.toggle('multi-active', isMulti);
                            }

                            if (currentActive.length === 1) {
                                const el = containerRef.current.children[currentActive[0]!] as HTMLElement;
                                if (el) targetY = -(el.offsetTop - (containerHeight / 2) + (el.clientHeight / 2));
                            } else {
                                const first = containerRef.current.children[currentActive[0]!] as HTMLElement;
                                const last = containerRef.current.children[currentActive[currentActive.length-1]!] as HTMLElement;
                                if (first && last) {
                                    const middle = first.offsetTop + (last.offsetTop + last.clientHeight - first.offsetTop) / 2;
                                    targetY = -(middle - (containerHeight / 2));
                                }
                            }

                            if (targetY !== null && Math.abs(targetY - transformYRef.current) > 0.1) {
                            const lerp = 0.12; 
                            const smoothedY = transformYRef.current + (targetY - transformYRef.current) * lerp;
                            transformYRef.current = smoothedY;
                            userOffsetRef.current = smoothedY;
                            containerRef.current.style.transform = `translate3d(0, ${smoothedY}px, 0)`;
                        }
                    }

                    // Spicy Enhancements: Blurring and Syllable Progress
                    const allLines = containerRef.current!.children;
                    const primaryActiveIdx = currentActive.length > 0 ? currentActive[0]! : -1;
                    
                    for (let i = 0; i < allLines.length; i++) {
                        const lineEl = allLines[i] as HTMLElement;
                        if (!lineEl) continue;

                        const dist = primaryActiveIdx >= 0 ? Math.abs(i - primaryActiveIdx) : 10;
                        
                        // Line Blurring & Scaling (Inspired by Spicy)
                        if (currentActive.includes(i)) {
                            lineEl.style.setProperty('--line-blur', '0px');
                            lineEl.style.setProperty('--line-scale', '1.04');
                        } else {
                            const blurAmount = Math.min(dist * 1.5, 8);
                            const scaleAmount = Math.max(0.85, 1 - dist * 0.03);
                            lineEl.style.setProperty('--line-blur', `${blurAmount}px`);
                            lineEl.style.setProperty('--line-scale', `${scaleAmount}`);
                        }

                        // Syllable Progress Logic
                        if (currentActive.includes(i) && lineEl.classList.contains('word-synced')) {
                            const spans = lineEl.querySelectorAll<HTMLElement>('.vapor-syllable');
                            spans.forEach((span, sIdx) => {
                                const stAttr = span.getAttribute('data-time');
                                if (stAttr === null) return;
                                
                                const st = parseInt(stAttr);
                                const nextSpan = spans[sIdx + 1];
                                const et = nextSpan ? parseInt(nextSpan.getAttribute('data-time') || "0") : (st + 800);
                                
                                if (currentTime >= st) {
                                    span.classList.add('synced');
                                    if (currentTime < et) {
                                        // Current active syllable
                                        const duration = Math.max(1, et - st);
                                        const progress = Math.min(100, Math.max(0, ((currentTime - st) / duration) * 100));
                                        span.style.setProperty('--gradient-pos', `${progress}%`);
                                        span.classList.add('active-syllable');
                                    } else {
                                        span.style.setProperty('--gradient-pos', '100%');
                                        span.classList.remove('active-syllable');
                                    }
                                } else {
                                    span.classList.remove('synced', 'active-syllable');
                                    span.style.setProperty('--gradient-pos', '0%');
                                }
                            });
                        }
                    }
                } else {
                    // Fallback cleanup when no lines are active or container missing
                    if (containerRef.current) {
                        const allLines = containerRef.current.children;
                        for (let i = 0; i < allLines.length; i++) {
                            const lineEl = allLines[i] as HTMLElement;
                            if (lineEl) {
                                lineEl.style.setProperty('--line-blur', '0px');
                                lineEl.style.setProperty('--line-scale', '1');
                            }
                        }
                    }
                    
                    if (isScrollingRef.current) {
                        if (Math.abs(userOffsetRef.current - transformYRef.current) > 0.5) {
                            transformYRef.current = userOffsetRef.current;
                            setTransformY(userOffsetRef.current);
                        }
                    }
                }
            } catch (err) {
                console.error("[Vapor] Animation loop threw an error:", err);
            }
            }
            
            frame = requestAnimationFrame(update);
        };
        frame = requestAnimationFrame(update);
        return () => cancelAnimationFrame(frame);
    }, []); // Runs once — reads all state via refs

    useEffect(() => {
        const handleUpdate = (event?: any, force = false) => {
            const uri = Spicetify.Player.data?.track?.uri || Spicetify.Player.track?.uri || "unknown";
            if (force || event || (uri !== trackRef.current)) {
                trackRef.current = uri;
                setActiveIndices([]);
                setTransformY(0);
                transformYRef.current = 0;
                fetchLyrics();
            }
        };

        const styleId = "vapor-lyrics-styles";
        if (!document.getElementById(styleId)) {
            const s = document.createElement("style");
            s.id = styleId; s.innerHTML = styles;
            document.head.appendChild(s);
        }

        Spicetify.Player.addEventListener("songchange", handleUpdate);
        const heartbeat = setInterval(() => handleUpdate(null, false), 3000);
        handleUpdate(null, true);
        
        return () => {
            clearInterval(heartbeat);
            Spicetify.Player.removeEventListener("songchange", handleUpdate);
        };
    }, []);

    useEffect(() => {
        if (!canvasRef.current) return;
        
        if (settings.visualEffect === "kawarp") {
            if (!kawarpRef.current) {
                kawarpRef.current = new KawarpCore(canvasRef.current);
                kawarpRef.current.start();
            }
            if (coverArt) {
                kawarpRef.current.loadImage(coverArt).catch((e: any) => console.log("Kawarp load error:", e));
            }
        } else {
            if (kawarpRef.current) {
                kawarpRef.current.dispose();
                kawarpRef.current = null;
            }
        }
    }, [settings.visualEffect, coverArt]);

    const isWordSynced = lyrics.some(l => l.syllables && l.syllables.length > 0);
    const effectiveAlign = isWordSynced ? "center" : settings.textAlign;

    return React.createElement("div", { 
        id: "vapor-lyrics-app-container",
        style: { position: "absolute", top: 0, left: 0, width: "100%", height: "100%", overflow: "hidden", zIndex: 100 }
    }, [
        React.createElement("div", { 
            className: `vapor-background ${settings.visualEffect === "static" ? "static-cover" : ""}`, 
            key: "bg",
            style: settings.visualEffect === "static" ? { backgroundImage: `url(${coverArt})` } : {} 
        }, [
            React.createElement("canvas", { 
                key: "canvas", 
                ref: canvasRef, 
                style: { 
                    width: "100%", 
                    height: "100%", 
                    position: "absolute", 
                    top: 0, 
                    left: 0,
                    display: settings.visualEffect === "kawarp" ? "block" : "none"
                } 
            })
        ]),
        React.createElement("div", { className: "vapor-content", key: "content" }, [
            settings.showHeader && React.createElement("header", { className: "vapor-header", key: "header" }, [
                React.createElement("h1", { className: "vapor-title", key: "title" }, "ＶＡＰＯＲ  ＬＹＲＩＣＳ")
            ]),
            React.createElement("main", { 
                className: "vapor-lyrics-container", 
                key: "main",
                onWheel: (e: any) => {
                    isScrollingRef.current = true;
                    userOffsetRef.current -= Number(e.deltaY) * 0.8;
                    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
                    scrollTimeoutRef.current = setTimeout(() => {
                        isScrollingRef.current = false;
                    }, 4000);
                },
                onMouseDown: (e: any) => {
                    isScrollingRef.current = true;
                    const startY = e.clientY;
                    const startOffset = userOffsetRef.current;
                    
                    const onMouseMove = (moveEvent: any) => {
                        userOffsetRef.current = startOffset + (moveEvent.clientY - startY);
                    };
                    const onMouseUp = () => {
                        window.removeEventListener("mousemove", onMouseMove);
                        window.removeEventListener("mouseup", onMouseUp);
                        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
                        scrollTimeoutRef.current = setTimeout(() => {
                            isScrollingRef.current = false;
                        }, 4000);
                    };
                    window.addEventListener("mousemove", onMouseMove);
                    window.addEventListener("mouseup", onMouseUp);
                }
            }, [
                React.createElement("div", { 
                    className: "vapor-lyrics-scroll", 
                    key: "scroll", 
                    ref: containerRef,
                    style: { 
                        textAlign: "center",
                        alignItems: "stretch",
                        padding: "50vh 3rem"
                    }
                }, 
                    loading 
                    ? [React.createElement("p", { className: "vapor-lyric-line v-active", key: "l" }, "Establishing aesthetic uplink...")]
                    : lyrics.length > 0
                    ? lyrics.map((line, i) => {
                        const nextLine = lyrics[i+1];
                        const durationMs = nextLine ? nextLine.startTime - line.startTime : (line.endTime ? (line.endTime - line.startTime) : 3000);
                        let stateClass = "";
                        if (activeIndices.includes(i)) stateClass = "v-active";
                        else if (activeIndices.length > 0 && i < activeIndices[0]!) stateClass = "v-played";

                        const hasSyllables = line.syllables && line.syllables.length > 0;
                        const role = line.role || "main";
                        const agent = line.agent || "v1";
                        
                        let lineAlign: "left" | "right" | "center" = "left";
                        if (role === "background") {
                            lineAlign = "right";
                        } else {
                            // Agent-based positioning: v1=Left, v2=Right, others shared/center
                            if (agent === "v1") lineAlign = "left";
                            else if (agent === "v2") lineAlign = "right";
                            else lineAlign = "center";
                        }
                        
                        return React.createElement("p", { 
                            className: `vapor-lyric-line ${stateClass} ${hasSyllables ? "word-synced" : ""} role-${role} agent-${agent}`, 
                            key: i,
                            style: { 
                                "--line-duration": `${durationMs}ms`,
                                fontSize: `${2.2 * settings.fontScale}rem`,
                                textAlign: lineAlign,
                                alignSelf: lineAlign === "left" ? "flex-start" : (lineAlign === "right" ? "flex-end" : "center"),
                                transformOrigin: lineAlign
                            } as any
                        }, hasSyllables 
                            ? line.syllables!.map((s, idx) => {
                                // Add a trailing space if the next syllable doesn't start with a space
                                // This fix handles "bunched up" syllables in many TTML/LRC sources
                                // But we skip it if the word ends with a hyphen (split syllable)
                                let word = s.word;
                                if (!word.endsWith(" ") && !word.endsWith("-") && idx < line.syllables!.length - 1) {
                                    const nextSyl = line.syllables![idx + 1];
                                    if (nextSyl && !nextSyl.word.startsWith(" ") && !nextSyl.word.startsWith("-")) {
                                        word += " ";
                                    }
                                }
                                
                                return React.createElement("span", {
                                    className: `vapor-syllable ${stateClass === "v-played" ? "synced" : ""}`,
                                    key: idx,
                                    "data-time": s.startTime,
                                    style: { "--syl-duration": `${s.duration || 400}ms` } as any
                                }, word);
                            })
                            : line.words);
                    })
                    : [React.createElement("div", { 
                        key: "no-lyrics", 
                        style: { 
                            display: "flex", flexDirection: "column", alignItems: "center",
                            gap: "12px", opacity: 0.4, paddingTop: "6vh"
                        } 
                    }, [
                        React.createElement("div", { 
                            key: "icon", 
                            style: { fontSize: "3rem" } 
                        }, "♩"),
                        React.createElement("p", { 
                            key: "msg", 
                            className: "vapor-lyric-line",
                            style: { margin: 0, fontSize: "1.2rem", fontWeight: 500 }
                        }, status.startsWith("Establishing") ? "Searching for lyrics..." : "No lyrics available for this track"),
                        status.includes("Signal Active") === false && React.createElement("p", {
                            key: "sub",
                            style: { fontSize: "0.75rem", opacity: 0.6, margin: 0, fontFamily: "monospace", letterSpacing: "1px" }
                        }, status)
                    ])]
                )
            ]),
            React.createElement("div", { 
                className: "floating-controls",
                key: "controls"
            }, [
                settings.devMode && React.createElement("div", { 
                    className: "vapor-debug-status", 
                    key: "st",
                    onClick: () => setShowDebug(!showDebug)
                }, [
                    React.createElement("span", { key: "s" }, status),
                    React.createElement("span", { key: "h", style: { opacity: 0.5, marginLeft: 8 } }, "(Click for Debug)")
                ]),
                React.createElement("div", {
                    className: "vapor-settings-toggle",
                    key: "sett",
                    onClick: () => setShowSettings(!showSettings)
                }, "⚙")
            ]),
            settings.devMode && showDebug && React.createElement("div", { 
                className: "vapor-debug-overlay", 
                key: "dbg",
                onClick: (e: any) => e.stopPropagation()
            }, [
                React.createElement("header", { key: "h" }, [
                    React.createElement("h2", { key: "t" }, "Terminal Uplink"),
                    React.createElement("div", { key: "btns", style: { display: "flex", gap: "8px" } }, [
                        React.createElement("button", { 
                            key: "cp", 
                            onClick: () => {
                                const text = debugLogs.join('\n');
                                navigator.clipboard.writeText(text);
                                setStatus("Logs Copied!");
                                setTimeout(() => setStatus(status), 2000);
                            },
                            style: { fontSize: "10px", padding: "2px 6px" }
                        }, "COPY ALL"),
                        React.createElement("button", { key: "b", onClick: () => setShowDebug(false) }, "✖")
                    ])
                ]),
                React.createElement("div", { className: "debug-list", key: "l" }, 
                    debugLogs.map((log, i) => React.createElement("div", { key: i, className: "debug-line" }, log))
                )
            ]),
            showSettings && React.createElement("div", {
                className: "vapor-settings-overlay",
                key: "set-over",
                onClick: (e: any) => e.stopPropagation()
            }, [
                React.createElement("header", { key: "h" }, [
                    React.createElement("h2", { key: "t" }, "System Configuration"),
                    React.createElement("button", { key: "b", onClick: () => setShowSettings(false) }, "✖")
                ]),
                React.createElement("div", { className: "settings-content", key: "c" }, [
                    // Sync Offset
                    React.createElement("div", { className: "setting-item", key: "sync" }, [
                        React.createElement("label", { key: "l" }, `Sync Offset: ${settings.syncOffset}ms`),
                        React.createElement("input", { 
                            key: "i", 
                            type: "range", 
                            min: -2000, 
                            max: 2000, 
                            step: 50,
                            value: settings.syncOffset,
                            onChange: (e: any) => setSettings({ ...settings, syncOffset: parseInt(e.target.value) })
                        })
                    ]),
                    // Font Scale
                    React.createElement("div", { className: "setting-item", key: "font" }, [
                        React.createElement("label", { key: "l" }, `Font Scale: ${settings.fontScale.toFixed(1)}x`),
                        React.createElement("input", { 
                            key: "i", 
                            type: "range", 
                            min: 0.5, 
                            max: 2.0, 
                            step: 0.1,
                            value: settings.fontScale,
                            onChange: (e: any) => setSettings({ ...settings, fontScale: parseFloat(e.target.value) })
                        })
                    ]),
                    // Text Align
                    React.createElement("div", { className: "setting-item", key: "align" }, [
                        React.createElement("label", { key: "l" }, "Line-Sync Alignment"),
                        React.createElement("div", { className: "button-group", key: "g" }, 
                            ["left", "center", "right"].map(a => React.createElement("button", {
                                key: a,
                                className: settings.textAlign === a ? "active" : "",
                                onClick: () => setSettings({ ...settings, textAlign: a as any })
                            }, a.toUpperCase()))
                        )
                    ]),
                    // Visual Effect
                    React.createElement("div", { className: "setting-item", key: "vis" }, [
                        React.createElement("label", { key: "l" }, "Visual Uplink"),
                        React.createElement("div", { className: "button-group", key: "g" }, 
                            ["kawarp", "static", "none"].map(v => React.createElement("button", {
                                key: v,
                                className: settings.visualEffect === v ? "active" : "",
                                onClick: () => setSettings({ ...settings, visualEffect: v as any })
                            }, v.toUpperCase()))
                        )
                    ]),
                    // Toggles
                    React.createElement("div", { className: "setting-item toggle", key: "dbg-start" }, [
                        React.createElement("label", { key: "l" }, "Auto-show Debug Terminal"),
                        React.createElement("input", { 
                            key: "i", 
                            type: "checkbox",
                            checked: settings.showDebugOnStart,
                            onChange: (e: any) => setSettings({ ...settings, showDebugOnStart: e.target.checked })
                        })
                    ]),
                    React.createElement("div", { className: "setting-item toggle", key: "show-hdr" }, [
                        React.createElement("label", { key: "l" }, "Show Header Title"),
                        React.createElement("input", { 
                            key: "i", 
                            type: "checkbox",
                            checked: settings.showHeader,
                            onChange: (e: any) => setSettings({ ...settings, showHeader: e.target.checked })
                        })
                    ]),
                    React.createElement("div", { className: "setting-item toggle", key: "dev-mode" }, [
                        React.createElement("label", { key: "l" }, "Developer Mode"),
                        React.createElement("input", { 
                            key: "i", 
                            type: "checkbox",
                            checked: settings.devMode,
                            onChange: (e: any) => setSettings({ ...settings, devMode: e.target.checked })
                        })
                    ]),
                    settings.devMode && React.createElement("div", {
                        key: "import-tools",
                        style: { display: "flex", flexDirection: "column", gap: "8px", border: "1px solid rgba(255,255,255,0.1)", padding: "10px", borderRadius: "8px", marginBottom: "10px" }
                    }, [
                        React.createElement("p", { key: "t", style: { margin: "0 0 5px 0", fontSize: "12px", opacity: 0.7 } }, "Aesthetic Uplink Tools"),
                        React.createElement("button", {
                            key: "import-f",
                            className: "dev-button",
                            style: { background: "rgba(255,255,255,0.1)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)", padding: "8px", cursor: "pointer", display: "block" },
                            onClick: () => {
                                const input = document.createElement("input");
                                input.type = "file";
                                input.accept = ".ttml,.xml,.lrc,.txt";
                                input.onchange = async () => {
                                    const file = input.files?.[0];
                                    if (!file) return;
                                    const text = await file.text();
                                    const parsed = file.name.endsWith(".ttml") || file.name.endsWith(".xml") ? parseTTML(text) : parseLRC(text);
                                    
                                    if (parsed.length > 0) {
                                        const persistent = confirm("Make this persistent for this song?");
                                        if (persistent) {
                                            const uri = trackRef.current || Spicetify.Player.data?.track?.uri;
                                            if (uri) saveManualLyric(uri, parsed);
                                            else alert("Error: No track URI found.");
                                        } else {
                                            manualLyricsRef.current = parsed;
                                        }
                                        setLyrics(parsed);
                                        lyricsRef.current = parsed;
                                        setStatus("Manual Uplink Established");
                                    } else {
                                        alert("Failed to extract lyrics from file.");
                                    }
                                };
                                input.click();
                            }
                        }, "IMPORT LYRIC FILE")
                    ]),
                    React.createElement("button", {
                        key: "reset",
                        className: "reset-button",
                        onClick: () => {
                            if (confirm("Reset all settings to defaults?")) {
                                setSettings(DEFAULT_SETTINGS);
                            }
                        }
                    }, "FACTORY RESET")
                ])
            ])
        ])
    ]);
};

(function VaporLyricsSystem() {
    const { Playbar, Platform, ReactDOM, React, CosmosAsync } = Spicetify;
    if (!Playbar || !Platform || !ReactDOM || !React || !CosmosAsync) {
        setTimeout(VaporLyricsSystem, 500); return;
    }

    function mount() {
        const scrollNode = document.querySelector(".main-view-container__scroll-node") as HTMLElement;
        const root = document.querySelector(".main-view-container__scroll-node-child") || document.querySelector("main");
        if (!root) return;
        
        // Disable global scrolling
        if (scrollNode) scrollNode.style.overflow = "hidden";

        let wrapper = document.getElementById("vapor-lyrics-mount-root");
        if (!wrapper) {
            wrapper = document.createElement("div");
            wrapper.id = "vapor-lyrics-mount-root";
            root.innerHTML = ""; root.appendChild(wrapper);
        }
        ReactDOM.render(React.createElement(App), wrapper);
    }

    Platform.History.listen(({ pathname }: { pathname: string }) => {
        if (pathname.includes("vapor-lyrics")) {
            setTimeout(mount, 100);
        } else {
            const w = document.getElementById("vapor-lyrics-mount-root");
            if (w) w.remove();
            
            // Re-enable scrolling when leaving the page
            const scrollNode = document.querySelector(".main-view-container__scroll-node") as HTMLElement;
            if (scrollNode) scrollNode.style.overflow = "";
        }
    });

    if (Platform.History.location.pathname.includes("vapor-lyrics")) mount();

    new Playbar.Button("Vapor Lyrics", `<svg height="16" width="16" viewBox="0 0 16 16" fill="currentColor"><path d="M12 1h-1v11h1V1zM5 1H4v11h1V1zM15 4h-1v5h1V4zM2 4H1v5h1V4zM9 0H7v14h2V0z"></path></svg>`, () => {
        if (Platform.History.location.pathname.includes("vapor-lyrics")) Platform.History.goBack();
        else Platform.History.push("/vapor-lyrics");
    }, false, false);
})();
