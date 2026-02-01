package jpn

import (
	"sort"
	"strings"
	"unicode"
	"unicode/utf8"
)

// katakana to hiragana: ァ U+30A1–ン U+30F6 → ぁ U+3041–ん U+3096 (offset 0x60)
const kanaDelta = 0x60

// kanjiToHiraganaList: (kanji, hiragana) pairs, longest kanji first for replacement order.
var kanjiToHiraganaList = []struct{ kanji, hira string }{
	{"胡蝶蘭", "こちょうらん"}, {"勿忘草", "わすれなぐさ"}, {"彼岸花", "ひがんばな"}, {"沈丁花", "じんちょうげ"},
	{"向日葵", "ひまわり"}, {"紫陽花", "あじさい"}, {"桜草", "さくらそう"}, {"芍薬", "しゃくやく"},
	{"薔薇", "ばら"}, {"百合", "ゆり"}, {"桜", "さくら"}, {"梅", "うめ"}, {"菊", "きく"}, {"椿", "つばき"},
	{"菖蒲", "しょうぶ"}, {"桔梗", "ききょう"}, {"朝顔", "あさがお"}, {"躑躅", "つつじ"}, {"撫子", "なでしこ"},
	{"竜胆", "りんどう"}, {"水仙", "すいせん"}, {"蓮", "はす"}, {"牡丹", "ぼたん"}, {"皐月", "さつき"},
	{"蘭", "らん"}, {"花", "はな"},
}

func init() {
	sort.Slice(kanjiToHiraganaList, func(i, j int) bool {
		return len(kanjiToHiraganaList[i].kanji) > len(kanjiToHiraganaList[j].kanji)
	})
}

// NormalizeForSimilarity normalizes Japanese text for similarity matching (no API, free):
// - trims and collapses spaces
// - converts full-width katakana to hiragana (バラ → ばら)
// - converts common kanji (especially flower names) to hiragana (薔薇 → ばら)
func NormalizeForSimilarity(s string) string {
	s = trimAndCollapseSpaces(s)
	var b strings.Builder
	for len(s) > 0 {
		replaced := false
		for _, p := range kanjiToHiraganaList {
			if strings.HasPrefix(s, p.kanji) {
				b.WriteString(p.hira)
				s = s[len(p.kanji):]
				replaced = true
				break
			}
		}
		if replaced {
			continue
		}
		r, size := utf8.DecodeRuneInString(s)
		s = s[size:]
		if r >= 0x30A1 && r <= 0x30F6 {
			// full-width katakana (ァ-ン) → hiragana
			b.WriteRune(r - kanaDelta)
		} else if r >= 0xFF66 && r <= 0xFF9D {
			// half-width katakana → full-width then to hiragana (approximate)
			if hw := halfWidthToHiragana(r); hw != 0 {
				b.WriteRune(hw)
			} else {
				b.WriteRune(r)
			}
		} else {
			b.WriteRune(r)
		}
	}
	return b.String()
}

func trimAndCollapseSpaces(s string) string {
	s = strings.TrimSpace(s)
	var b strings.Builder
	var prevSpace bool
	for _, r := range s {
		if unicode.IsSpace(r) {
			if !prevSpace {
				b.WriteRune(' ')
				prevSpace = true
			}
		} else {
			b.WriteRune(r)
			prevSpace = false
		}
	}
	return strings.TrimSpace(b.String())
}

// halfWidthToHiragana converts half-width katakana (U+FF66–U+FF9D) to hiragana.
// See: https://en.wikipedia.org/wiki/Half-width_kana
func halfWidthToHiragana(r rune) rune {
	if r < 0xFF66 || r > 0xFF9D {
		return 0
	}
	// ｦ=0xFF66 → を=0x3092,  ｱ=0xFF71→あ=0x3042 ... ﾝ=0xFF9D→ん=0x3093
	switch {
	case r == 0xFF66:
		return 0x3092 // を
	case r == 0xFF9E:
		return 0 // ﾞ (voiced, skip)
	case r == 0xFF9F:
		return 0 // ﾟ (semi-voiced, skip)
	case r >= 0xFF71 && r <= 0xFF9D:
		// ｱ-ﾝ: table from 0xFF71 to hiragana あ い う え お か き ...
		base := []rune{
			0x3042, 0x3044, 0x3046, 0x3048, 0x304A, // あいうえお
			0x304B, 0x304D, 0x304F, 0x3051, 0x3053, // かきくけこ
			0x3055, 0x3057, 0x3059, 0x305B, 0x305D, // さしすせそ
			0x305F, 0x3061, 0x3064, 0x3066, 0x3068, // たちつてと
			0x306A, 0x306B, 0x306C, 0x306D, 0x306E, // なにぬねの
			0x306F, 0x3072, 0x3075, 0x3078, 0x307B, // はひふへほ
			0x307E, 0x307F, 0x3080, 0x3081, 0x3082, // まみむめも
			0x3084, 0x3086, 0x3088,                   // やゆよ
			0x3089, 0x308A, 0x308B, 0x308C, 0x308D, // らりるれろ
			0x308F, 0x3092, 0x3093,                   // わをん
		}
		idx := int(r - 0xFF71)
		if idx >= 0 && idx < len(base) {
			return base[idx]
		}
	}
	return 0
}
