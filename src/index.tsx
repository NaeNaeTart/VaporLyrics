import styles from "./style.css" with { type: "text" };
import { Kawarp as KawarpCore } from "@kawarp/core";

interface LyricSyllable {
    startTime: number;
    word: string;
}

interface LyricLine {
    startTime: number;
    words: string;
    syllables?: LyricSyllable[];
}

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
                
                parsed.push({ startTime: time, words: cleanWords.trim(), syllables });
            } else {
                if (wordsRaw) parsed.push({ startTime: time, words: wordsRaw });
            }
        }
    });
    return parsed;
};

const parseTTML = (ttml: string): LyricLine[] => {
    const parsed: LyricLine[] = [];
    const pRegex = /<p[^>]*begin="([^"]*)"[^>]*>(.*?)<\/p>/gs;
    
    const timeToMs = (tStr: string) => {
        if (!tStr) return 0;
        const parts = tStr.split(':');
        if (parts.length === 3) return (parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseFloat(parts[2])) * 1000;
        if (parts.length === 2) return (parseInt(parts[0]) * 60 + parseFloat(parts[1])) * 1000;
        if (tStr.endsWith('s')) return parseFloat(tStr.replace('s', '')) * 1000;
        return parseFloat(tStr) * 1000;
    };

    let pMatch;
    while ((pMatch = pRegex.exec(ttml)) !== null) {
        const pTime = timeToMs(pMatch[1]);
        const innerHTML = pMatch[2];
        const syllables: LyricSyllable[] = [];
        
        let cleanWords = "";
        if (innerHTML.includes('<span') || innerHTML.includes('<s')) {
            const sRegex = /<(?:s|span)[^>]*begin="([^"]*)"[^>]*>([^<]*)<\/(?:s|span)>/g;
            let sMatch;
            while ((sMatch = sRegex.exec(innerHTML)) !== null) {
                const sTime = timeToMs(sMatch[1]);
                let word = sMatch[2].replace(/&apos;/g, "'").replace(/&amp;/g, "&").replace(/&quot;/g, '"');
                if (word.trim() || word === " ") {
                    syllables.push({ startTime: sTime, word });
                    cleanWords += word;
                }
            }
        }
        
        if (syllables.length === 0) {
            cleanWords = innerHTML.replace(/<[^>]*>/g, '').replace(/&apos;/g, "'").replace(/&quot;/g, '"');
        }
        
        const words = cleanWords.replace(/<br\s*\/?>/gi, " ").trim();
        if (words) {
            parsed.push({ startTime: pTime, words, syllables: syllables.length > 0 ? syllables : undefined });
        }
    }
    return parsed;
};

const App = () => {
    const React = Spicetify.React;
    const { useEffect, useState, useRef } = React;
    const useStateTyped = useState as <T>(val: T) => [T, (val: T) => void];

    const [lyrics, setLyrics] = useStateTyped<LyricLine[]>([]);
    const [activeIndex, setActiveIndex] = useStateTyped(-1);
    const [loading, setLoading] = useStateTyped(false);
    const [status, setStatus] = useStateTyped("Establishing signal...");
    const [coverArt, setCoverArt] = useStateTyped("");
    
    const [transformY, setTransformY] = useStateTyped(0);
    const [debugLogs, setDebugLogs] = useStateTyped<string[]>([]);
    const [showDebug, setShowDebug] = useStateTyped(false);
    
    const lyricsRef = useRef([] as LyricLine[]);
    const containerRef = useRef(null as HTMLDivElement | null);
    const trackRef = useRef(null as string | null);
    const canvasRef = useRef(null as HTMLCanvasElement | null);
    const kawarpRef = useRef(null as any);

    const log = (msg: string, type: "info" | "warn" | "error" | "success" = "info") => {
        const time = new Date().toLocaleTimeString().split(' ')[0];
        const formatted = `[${time}] ${msg}`;
        setDebugLogs(prev => [formatted, ...prev].slice(0, 50));
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
        
        const getAppleMusicTTML = async () => {
            log("Resolving Apple Music mapping...");
            const spotifyId = trackObj.uri?.split(":")[2];
            const isrc = trackObj.metadata?.isrc;
            let amId = "";

            // Layer 1: ISRC Search (Most Accurate)
            if (isrc) {
                log(`Direct ISRC lookup: ${isrc}`);
                try {
                    const searchUrl = `https://lyrics.paxsenix.org/apple-music/search?q=${isrc}`;
                    const res = await Spicetify.CosmosAsync.get(searchUrl, null, { 'User-Agent': 'Spicetify/1.0 (https://github.com/spicetify/spicetify-cli)' });
                    let arr = res?.results || res?.data || res?.items;
                    if (Array.isArray(res)) arr = res;
                    if (arr && arr.length > 0) {
                        amId = arr[0].id;
                        log(`Match found via ISRC: ${amId} (${arr[0].name})`, "success");
                    }
                } catch (e) {
                    log("ISRC search failed or blocked.", "warn");
                }
            }

            // Layer 2: Songlink Mapping (Accurate but rate-limited)
            if (!amId) {
                log("Trying Songlink mapping...");
                try {
                    const songlinkUrl = `https://api.song.link/v1-alpha.1/links?url=spotify:track:${spotifyId}`;
                    const slRes = await fetch(songlinkUrl).then(r => r.json());
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
                    searchRes = await Spicetify.CosmosAsync.get(searchUrl, null, { 'User-Agent': 'Lyrically/1.0 (https://github.com/NaeNaeTart/VaporLyrics)' });
                } catch (e) {
                    log("Fuzzy Search fetch failed.", "error");
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
                    const res = await Spicetify.CosmosAsync.get(lyricsUrl, null, { 'User-Agent': 'Spicetify/1.0 (https://github.com/spicetify/spicetify-cli)' });
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
            try {
                const res = await fetch(url, { headers: { 'User-Agent': 'Lyrically/1.0 (https://github.com/NaeNaeTart/VaporLyrics)' } });
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
                const res = await Spicetify.CosmosAsync.get(url, null, { 'User-Agent': 'Lyrically/1.0 (https://github.com/NaeNaeTart/VaporLyrics)' });
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
                        const startTime = parseInt(match[1]);
                        const wordsRaw = match[3];
                        const syllables: LyricSyllable[] = [];
                        let cleanWords = "";
                        
                        // YRC Word format: (start,duration,0)Word
                        const wordRegex = /\((\d+),(\d+),\d+\)([^\(]*)/g;
                        let wMatch;
                        while ((wMatch = wordRegex.exec(wordsRaw)) !== null) {
                            const wordStart = parseInt(wMatch[1]);
                            const wordText = wMatch[3];
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
            setStatus(`Signal Active (${res.source})`);
            log(`Applied source: ${res.source}`, "success");
        };

        let fetchPromises = [
            getSpotify().then(applyLyrics).catch(() => {}),
            getAppleMusicTTML().then(applyLyrics).catch(() => {}),
            getMusixmatchWord().then(applyLyrics).catch(() => {}),
            getNetEase().then(applyLyrics).catch(() => {}),
            getLrcLib().then(applyLyrics).catch(() => {})
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

    // Animation Loop (High-Frequency GPU Sync)
    useEffect(() => {
        let frame: number;
        const update = () => {
            const currentTime = Spicetify.Player.getProgress();
            const lines = lyricsRef.current;
            
            if (lines.length > 0) {
                let index = -1;
                for (let i = 0; i < lines.length; i++) {
                    if (currentTime >= lines[i].startTime) index = i;
                    else break;
                }
                
                if (index !== -1 && containerRef.current) {
                    if (index !== activeIndex) {
                        setActiveIndex(index);
                        const activeEl = containerRef.current.children[index] as HTMLElement;
                        if (activeEl) {
                            const containerHeight = containerRef.current.parentElement?.clientHeight || 0;
                            const offset = activeEl.offsetTop - (containerHeight / 2) + (activeEl.clientHeight / 2);
                            setTransformY(-offset);
                        }
                    }
                    
                    const activeEl = containerRef.current.children[index] as HTMLElement;
                    if (activeEl && activeEl.classList.contains('word-synced')) {
                        const spans = activeEl.querySelectorAll('.vapor-syllable');
                        spans.forEach(span => {
                            const st = parseInt(span.getAttribute('data-time') || "0");
                            if (currentTime >= st) span.classList.add('synced');
                            else span.classList.remove('synced');
                        });
                    }
                }
            }
            frame = requestAnimationFrame(update);
        };
        frame = requestAnimationFrame(update);
        return () => cancelAnimationFrame(frame);
    }, [activeIndex]);

    useEffect(() => {
        const handleUpdate = (event?: any, force = false) => {
            const uri = Spicetify.Player.data?.track?.uri || Spicetify.Player.track?.uri || "unknown";
            if (force || event || (uri !== trackRef.current)) {
                trackRef.current = uri;
                setActiveIndex(-1);
                setTransformY(0);
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
        if (canvasRef.current && !kawarpRef.current) {
            kawarpRef.current = new KawarpCore(canvasRef.current);
            kawarpRef.current.start();
        }
        return () => {
            if (kawarpRef.current) {
                kawarpRef.current.dispose();
                kawarpRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        if (kawarpRef.current && coverArt) {
            kawarpRef.current.loadImage(coverArt).catch((e: any) => console.log("Kawarp load error:", e));
        }
    }, [coverArt]);

    return React.createElement("div", { 
        id: "vapor-lyrics-app-container",
        style: { position: "absolute", top: 0, left: 0, width: "100%", height: "100%", overflow: "hidden", zIndex: 100 }
    }, [
        React.createElement("div", { className: "vapor-background", key: "bg" }, [
            React.createElement("canvas", { 
                key: "canvas", 
                ref: canvasRef, 
                style: { width: "100%", height: "100%", position: "absolute", top: 0, left: 0 } 
            })
        ]),
        React.createElement("div", { className: "vapor-content", key: "content" }, [
            React.createElement("header", { className: "vapor-header", key: "header" }, [
                React.createElement("h1", { className: "vapor-title", key: "title" }, "ＶＡＰＯＲ  ＬＹＲＩＣＳ")
            ]),
            React.createElement("main", { className: "vapor-lyrics-container", key: "main" }, [
                React.createElement("div", { 
                    className: "vapor-lyrics-scroll", 
                    key: "scroll", 
                    ref: containerRef,
                    style: { transform: `translate3d(0, ${transformY}px, 0)` }
                }, 
                    loading 
                    ? [React.createElement("p", { className: "vapor-lyric-line active", key: "l" }, "Establishing aesthetic uplink...")]
                    : lyrics.length > 0
                    ? lyrics.map((line, i) => {
                        const durationMs = i < lyrics.length - 1 ? lyrics[i+1].startTime - line.startTime : 3000;
                        let stateClass = "";
                        if (i === activeIndex) stateClass = "active";
                        else if (activeIndex !== -1 && i < activeIndex) stateClass = "played";

                        const hasSyllables = line.syllables && line.syllables.length > 0;
                        
                        return React.createElement("p", { 
                            className: `vapor-lyric-line ${stateClass} ${hasSyllables ? "word-synced" : ""}`, 
                            key: i,
                            style: { "--line-duration": `${durationMs}ms` } as any
                        }, hasSyllables 
                            ? line.syllables!.map((s, idx) => React.createElement("span", {
                                className: "vapor-syllable",
                                key: idx,
                                "data-time": s.startTime
                              }, s.word))
                            : line.words)
                    })
                    : [React.createElement("p", { className: "vapor-lyric-line", key: "i" }, status === "Establishing signal..." ? "Initializing signal..." : status)]
                )
            ]),
            React.createElement("div", { 
                className: "vapor-debug-status", 
                key: "st",
                onClick: () => setShowDebug(!showDebug)
            }, [
                React.createElement("span", { key: "s" }, status),
                React.createElement("span", { key: "h", style: { opacity: 0.5, marginLeft: 8 } }, "(Click for Debug)")
            ]),
            showDebug && React.createElement("div", { 
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
