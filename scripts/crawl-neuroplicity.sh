#!/usr/bin/env bash
set -euo pipefail

base_url="${1:-http://neuroplicity.com}"
out_dir=".cache/wp/html"
mkdir -p "$out_dir"

paths=(
  "/"
  "/about/"
  "/researcher-profiles/"
  "/researcher-profiles/nicole-calakos/"
  "/researcher-profiles/cagla-eroglu/"
  "/researcher-profiles/nina-sherwood/"
  "/researcher-profiles/scott-soderling/"
  "/people-on-the-street/"
  "/understanding-neurons/"
  "/conducting-neuroscience-research/"
  "/daily-life-of-a-scientist/"
)

for path in "${paths[@]}"; do
  name="${path#/}"
  name="${name%/}"
  name="${name//\//__}"
  [[ -z "$name" ]] && name="home"

  saved="false"
  for attempt in {1..12}; do
    html="$(curl -sS --max-time 25 "${base_url}${path}" || true)"
    title="$(printf '%s' "$html" | rg -o '<title>[^<]+' -m1 | sed 's/<title>//')"
    if [[ -n "$title" && "$title" != "Database Error" ]]; then
      printf '%s' "$html" > "${out_dir}/${name}.html"
      printf 'saved %-42s %s\n' "$path" "$title"
      saved="true"
      break
    fi
    sleep 2
  done

  if [[ "$saved" == "false" ]]; then
    printf 'failed %-42s\n' "$path"
  fi
done
