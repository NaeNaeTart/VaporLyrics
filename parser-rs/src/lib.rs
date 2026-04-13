use wasm_bindgen::prelude::*;
use serde::{Serialize, Deserialize};
use regex::Regex;

#[derive(Serialize, Deserialize)]
pub struct LyricLine {
    #[serde(rename = "startTime")]
    pub start_time: f64, // Renamed for JSON interop but snake_case in Rust
    pub words: String,
}

#[wasm_bindgen]
pub fn parse_lrc(lrc: &str) -> JsValue {
    let re = Regex::new(r"\[(\d+):(\d+\.\d+)\]").unwrap();
    let mut lines = Vec::new();

    for line in lrc.lines() {
        if let Some(caps) = re.captures(line) {
            let minutes: f64 = caps[1].parse().unwrap_or(0.0);
            let seconds: f64 = caps[2].parse().unwrap_or(0.0);
            let start_time = (minutes * 60.0 + seconds) * 1000.0;
            let words = line.replace(&caps[0], "").trim().to_string();
            
            if !words.is_empty() {
                lines.push(LyricLine { start_time, words });
            }
        }
    }

    serde_wasm_bindgen::to_value(&lines).unwrap_or(JsValue::NULL)
}

#[wasm_bindgen]
pub fn parse_ttml(ttml: &str) -> JsValue {
    let re = Regex::new(r#"(?s)<p[^>]*begin="([^"]+)"[^>]*>(.*?)</p>"#).unwrap();
    let mut lines = Vec::new();

    for caps in re.captures_iter(ttml) {
        let begin = &caps[1];
        let content = &caps[2];
        
        let start_time = if begin.contains(':') {
            let parts: Vec<&str> = begin.split(':').collect();
            if parts.len() == 3 {
                let h: f64 = parts[0].parse().unwrap_or(0.0);
                let m: f64 = parts[1].parse().unwrap_or(0.0);
                let s: f64 = parts[2].parse().unwrap_or(0.0);
                (h * 3600.0 + m * 60.0 + s) * 1000.0
            } else { 0.0 }
        } else {
            begin.replace('s', "").parse::<f64>().unwrap_or(0.0) * 1000.0
        };

        let words = content.replace("<br/>", " ")
                           .replace("<br />", " ")
                           .replace("<![CDATA[", "")
                           .replace("]]>", "")
                           .trim().to_string();

        if !words.is_empty() {
            lines.push(LyricLine { start_time, words });
        }
    }

    serde_wasm_bindgen::to_value(&lines).unwrap_or(JsValue::NULL)
}
