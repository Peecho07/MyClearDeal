#!/usr/bin/env python3
"""MyClearDeal reel voiceovers via local Kokoro (free, Apache 2.0).

Renders every line of scripts.json per reel and version (A/B), places each line
at its scene cut, fits it to its window, mixes one track per reel and muxes it
onto the silent reel video.

Usage:
  python3 make_voiceovers.py --list-voices
  python3 make_voiceovers.py --launch-set /path/to/MyClearDeal-launch-set
  python3 make_voiceovers.py --launch-set ... --only 02-five-jobs --versions B

Needs: VoiceStudio running (default http://localhost:3900), ffmpeg + ffprobe on PATH.
Stdlib only.
"""
import argparse, json, os, re, shutil, subprocess, sys
import soundfile as sf
from kokoro_onnx import Kokoro
MODELS = os.environ.get('KOKORO_DIR', '/home/user/MyClearDeal-work/models')
_K = None

HERE = os.path.dirname(os.path.abspath(__file__))
MAX_TEMPO = 1.15   # speed-up allowed to fit a window before flagging
TAIL = 0.15        # breathing room before the next scene cut


def probe(path):
    out = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                          "-of", "csv=p=0", path], capture_output=True, text=True)
    try:
        return float(out.stdout.strip())
    except ValueError:
        return None


def clean(text):
    text = re.sub(r"\[spell\](.*?)\[/spell\]", lambda m: " ".join(m.group(1)), text)
    return re.sub(r"\[/?[a-z]+[^\]]*\]", "", text)


def tts(base, key, voice, text, out, speed=1.0):
    global _K
    if _K is None:
        _K = Kokoro(os.path.join(MODELS, "kokoro-v1.0.onnx"), os.path.join(MODELS, "voices-v1.0.bin"))
    lang = "es" if voice[0] == "e" else "en-us"
    slow = len(re.findall(r"\[slow\]", text))
    samples, sr = _K.create(clean(text), voice=voice, speed=speed * (0.9 if slow else 1.0), lang=lang)
    sf.write(out, samples, sr)
    return probe(out)


def words(s):
    s = re.sub(r"\[/?[a-z]+[^\]]*\]", "", s.lower())
    return re.findall(r"[a-z0-9áéíóúñü']+", s)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--launch-set", help="folder that contains reels/")
    ap.add_argument("--base", default=os.environ.get("VOICESTUDIO_URL", "http://localhost:3900"))
    ap.add_argument("--voices", default=os.path.join(HERE, "voices.json"))
    ap.add_argument("--out", default=os.path.join(HERE, "output"))
    ap.add_argument("--only", nargs="*", help="reel ids to render")
    ap.add_argument("--versions", nargs="*", default=["A", "B"])
    ap.add_argument("--no-transcribe", action="store_true")
    ap.add_argument("--list-voices", action="store_true")
    a = ap.parse_args()
    key = os.environ.get("VOICESTUDIO_API_KEY")

    if a.list_voices:
        print(open(a.voices).read())
        return
    for tool in ("ffmpeg", "ffprobe"):
        if not shutil.which(tool):
            raise SystemExit(f"{tool} not found on PATH")
    if not a.launch_set:
        raise SystemExit("--launch-set is required")
    if not os.path.exists(a.voices):
        raise SystemExit(f"Missing {a.voices}. Copy voices.example.json to voices.json and fill in profile IDs "
                         "(run --list-voices to see them).")
    voices = json.load(open(a.voices))
    cfg = json.load(open(os.path.join(HERE, "scripts.json")))
    os.makedirs(a.out, exist_ok=True)
    report = ["# Voiceover render report", ""]
    all_flags = []

    for reel in cfg["reels"]:
        if a.only and reel["id"] not in a.only:
            continue
        video = os.path.join(a.launch_set, reel["video"])
        vdur = probe(video) if os.path.exists(video) else None
        have_video = bool(vdur)
        if not have_video:
            vdur = reel["segments"][-1]["end"]
            print(f"note: {video} not found, rendering the voice track only")
        for ver in a.versions:
            vkey = f"{reel['lang']}_{ver}"
            voice = voices.get(vkey)
            if not voice or voice.startswith("PASTE"):
                print(f"skip {reel['id']} {ver}: no voice set for {vkey} in voices.json")
                continue
            name = f"{reel['id']}-{ver}"
            tmp = os.path.join(a.out, "_parts", name)
            os.makedirs(tmp, exist_ok=True)
            print(f"\n== {name}  (voice {vkey}={voice})")
            report += [f"## {name}", "", "| Start | Window | Raw | Final | Line |", "|---|---|---|---|---|"]
            inputs, filters, flags = [], [], []
            for i, (seg, line) in enumerate(zip(reel["segments"], reel[ver])):
                raw = os.path.join(tmp, f"{i:02d}-raw.wav")
                fit = os.path.join(tmp, f"{i:02d}.wav")
                d = tts(a.base, key, voice, line, raw)
                window = seg["end"] - seg["start"] - TAIL
                tempo = 1.0
                if d > window:
                    tempo = min(d / window, MAX_TEMPO)
                subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", raw, "-af",
                                f"atempo={tempo:.4f},aresample=48000", "-ac", "1", fit], check=True)
                fd = probe(fit)
                note = ""
                if fd > window + 0.05:
                    note = " OVERRUN"
                    flags.append(f"{name} line {i+1} runs {fd - window:.2f}s past its scene. Shorten: {line!r}")
                elif tempo > 1.0:
                    note = f" (sped x{tempo:.2f})"
                print(f"  {seg['start']:>5.1f}s  {d:4.2f}s -> {fd:4.2f}s / {window:4.2f}s{note}  {line}")
                report.append(f"| {seg['start']:.1f}s | {window:.2f}s | {d:.2f}s | {fd:.2f}s{note} | {line} |")
                inputs += ["-i", fit]
                filters.append(f"[{i}:a]adelay={int(seg['start']*1000)}:all=1[s{i}]")
            n = len(filters)
            mix = ";".join(filters) + ";" + "".join(f"[s{i}]" for i in range(n)) + \
                f"amix=inputs={n}:normalize=0:dropout_transition=0,apad,atrim=0:{vdur}," \
                f"loudnorm=I=-14:TP=-1.5:LRA=11,aresample=48000[vo]"
            wav = os.path.join(a.out, f"{name}.wav")
            subprocess.run(["ffmpeg", "-v", "error", "-y", *inputs, "-filter_complex", mix,
                            "-map", "[vo]", "-ac", "2", wav], check=True)
            if have_video:
                mp4 = os.path.join(a.out, f"{name}.mp4")
                subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", video, "-i", wav, "-map", "0:v:0",
                                "-map", "1:a:0", "-c:v", "copy", "-c:a", "aac", "-b:a", "192k",
                                "-shortest", "-movflags", "+faststart", mp4], check=True)
                print(f"  -> {mp4}  ({probe(mp4):.2f}s)  {wav}  ({probe(wav):.2f}s)")
                report += ["", f"Files: `{name}.mp4` ({probe(mp4):.2f}s), `{name}.wav` ({probe(wav):.2f}s)"]
            else:
                report += ["", f"Files: `{name}.wav` ({probe(wav):.2f}s). MP4 not made: reel video missing."]

            report.append("Transcript check: not available with the free engine, listen for misreads.")
            all_flags += flags
            report.append("")

    report += ["## Flags", ""] + ([f"- {f}" for f in all_flags] or ["- None. Every line fits its scene."])
    for f in all_flags:
        print("FLAG:", f)
    with open(os.path.join(a.out, "report.md"), "w") as f:
        f.write("\n".join(report))
    print(f"\nDone. Review {os.path.join(a.out, 'report.md')}")


if __name__ == "__main__":
    main()
