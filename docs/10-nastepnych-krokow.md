# Pogłębiarki — 10 następnych kroków

## Rekomendacje dla Sebastiana

---

### 1. Prototyp fizyczny — druk próbny (priorytet: WYSOKI)

**Co:** Zamów 10 egzemplarzy START (25 kart) w drukarni offsetowej.

**Specyfikacja:**
- Karta: 90×130mm, kreda 350g, laminat mat, zaokrąglone rogi
- Kolorowy pasek boczny (per area) + dolny pasek (per depth)
- QR kod na froncie każdej karty (link do /card/{id})
- Rewers: logo Pogłębiarki + wzór area-specific
- Pudełko: karton 300g, tuck-in, hot-stamp logo

**Drukarnie do kontaktu:**
- Multipress.pl — małe nakłady, szybki turnaround
- Drukmol.pl — drukarnia gier karciannych
- TheGameCrafter.com — prototypy gier (US, ale świetna jakość)

**Koszt szacunkowy:** 200-300 zł za 10 szt. prototypowych

**Deadline sugerowany:** do końca tygodnia 14 (do 4 kwietnia 2026)

---

### 2. Beta test z 10 osobami (priorytet: WYSOKI)

**Co:** Daj prototyp 10 różnym osobom z różnych person:
- 2 pary (randki/relacje)
- 2 rodzice z dziećmi
- 2 grupy przyjaciół
- 2 trenerzy/coachowie
- 1 nauczyciel
- 1 manager (zespół w pracy)

**Feedback template:**
1. Ile kart przeszliście w jednej sesji?
2. Przy którym pytaniu zatrzymaliście się najdłużej?
3. Które pytanie pominęliście? Dlaczego?
4. Co czuliście po sesji? (1-10 skala)
5. Czy kupilibyście to? Za ile?
6. Czego brakuje?

**Deadline:** tydzień po otrzymaniu prototypu

---

### 3. Email automation setup (priorytet: WYSOKI)

**Co:** Skonfiguruj ConvertKit (lub Mailchimp) z sekwencją powitalną.

**Stack rekomendowany:**
- **ConvertKit** — lepszy dla solo-creator, visual automation builder
- Cena: darmowy do 1000 subskrybentów
- Integracja: formularz na /newsletter → API ConvertKit

**Sekwencja powitalna (5 maili):**
| Dzień | Temat | Attachement |
|-------|-------|-------------|
| 0 | Twój zestaw startowy Pogłębiarek | PDF lead magnet |
| 2 | Karta dnia: [pytanie z poziomu 1] | — |
| 5 | Dlaczego głębokie rozmowy są trudne? | — |
| 8 | 3 błędy w prowadzeniu rozmów | — |
| 12 | Pogłębiarki START czeka — rabat -10% | Kod rabatowy |

**Deadline:** do końca tygodnia 13 (do 28 marca 2026)

---

### 4. Lead magnet PDF — design (priorytet: WYSOKI)

**Co:** Zaprojektuj 3-stronicowy PDF w Canva/Figma (content gotowy w docs/lead-magnet-content.md).

**Wytyczne designowe:**
- Spójny z landing page — ciemne tło (#0f172a), kolorowe akcenty
- Font: Inter (jak web)
- Logo Pogłębiarki na każdej stronie
- QR kod do strony na ostatniej stronie
- CTA na końcu: „Pogłębiarki START — 49 zł"

**Alternatywa:** React-PDF do programatycznego generowania (ale Canva szybciej dla v1)

---

### 5. Payment integration (priorytet: ŚREDNI)

**Co:** Dodaj koszyk z płatnościami na landing page.

**Opcje:**
| Rozwiązanie | Prowizja | Setup | Doświadczenie PL |
|-------------|----------|-------|-------------------|
| Stripe | 1.4% + 0.25€ | Łatwy | Dobre, wymaga konta |
| Przelewy24 | 1.5% + 0.05 zł | Średni | Natywne PL, BLIK |
| PayU | 2.3% | Łatwy | Popularne w PL |
| Allegro Sprzedaż | 9% | Łatwy | Duży reach |

**Rekomendacja:** Przelewy24 dla strony własnej + Allegro jako dodatkowy kanał.

**Na landing page dodaj:**
- Sekcja „Kup teraz" z wyborem produktu
- Koszyk (local state lub simple Stripe checkout)
- Potwierdzenie zamówienia + email z podziękow

---

### 6. Instagram konto + content calendar (priorytet: ŚREDNI)

**Co:** Załóż @poglebiarki na Instagramie i przygotuj 30 dni contentu.

**Content mix (30 dni):**
- 15 × karta dnia (pytanie + wizualizacja z InstagramCard component)
- 5 × karuzela „Psychologia za kartą"
- 5 × reel „Jak grać" (30-60s per tryb)
- 3 × story quiz „Twój poziom głębokości"
- 2 × behind the scenes (prototyp, proces)

**Narzędzia:**
- InstagramCard component (/instagram) → screenshot → post
- Nano Banana → dodatkowe grafiki
- Later.com lub Buffer — scheduling

---

### 7. Prezentacja dla NM (priorytet: ŚREDNI)

**Co:** Przygotuj 10-slajdową prezentację dla Agnieszki i Grzegorza.

**Struktura:**
1. Problem: rozmowy w organizacjach są powierzchowne
2. Rozwiązanie: Pogłębiarki — narzędzie oparte na nauce
3. Demo: 3 karty na żywo
4. Linia produktowa LEGO
5. Model B2B: jak wbudować w szkolenia NM
6. Revenue model: revenue share
7. Korzyści dla NM
8. Timeline wdrożenia
9. Quick wins: 3 szkolenia w najbliższym miesiącu
10. CTA: „Kto chce przetestować na swoim szkoleniu?"

**Format:** PPTX (biz-materialy skill) lub live demo na stronie

---

### 8. SEO + Content marketing (priorytet: NISKI w fazie 1)

**Co:** Blogowe artykuły pod frazy kluczowe.

**Top 5 fraz:**
1. „gra do rozmowy" — 720 wyszukiwań/mies.
2. „karty do rozmowy dla par" — 480
3. „jak prowadzić głęboką rozmowę" — 320
4. „pytania na randkę" — 1200
5. „gra integracyjna dla zespołu" — 590

**5 artykułów do napisania:**
1. „36 pytań Arona, które zbliżają ludzi" (2000 słów)
2. „5 poziomów głębokości rozmowy — Social Penetration Theory" (1500 słów)
3. „Pogłębiarki vs Prawda czy Wyzwanie — co wybrać?" (1000 słów)
4. „Jak użyć kart do rozmowy na team buildingu" (1500 słów)
5. „Pytania pogłębiające dla par — 30 pomysłów" (2000 słów)

---

### 9. Licencja trenerska (priorytet: NISKI w fazie 1)

**Co:** Przygotuj model licencji dla trenerów, którzy chcą używać Pogłębiarek w swoich szkoleniach.

**Model:**
- Licencja roczna: 299 zł/rok
- Zawiera: KOMPLET + 2 CORPORATE packs + przewodnik facylitacji + webinar onboardingowy
- Ograniczenie: max 50 uczestników na sesję (powyżej = licencja rozszerzona)
- Renewal: 199 zł/rok (30% taniej)

**Materiały do przygotowania:**
- Umowa licencyjna (prawnik)
- Przewodnik facylitacji (rozszerzony — 10 stron, PDF)
- Video onboarding (45 min)
- Certyfikat „Licencjonowany Facylitator Pogłębiarek"

---

### 10. Analytics i tracking (priorytet: NISKI w fazie 1)

**Co:** Dodaj śledzenie kluczowych metryk.

**Events do trackowania:**
| Event | Trigger | Gdzie |
|-------|---------|-------|
| page_view | Każda strona | Wszystkie |
| card_view | Otwarcie karty | /card/:id |
| qr_scan | Wejście z QR | /card/:id (referer) |
| newsletter_signup | Submit formularza | /newsletter |
| product_click | Klik na produkt | /cennik |
| game_start | Start trybu gry | /play |
| deck_build | Zbudowanie talii | /talia |

**Narzędzia:**
- **Plausible** (privacy-first, EU-hosted) — 9€/mies., bez cookies
- **Google Analytics 4** — darmowy, ale cookies + RODO consent
- **PostHog** — darmowy self-hosted, event tracking + session replay

**Rekomendacja:** Plausible na start (prosty, RODO-compliant), PostHog later.

---

## Timeline podsumowanie

| Tydzień | Kroki | Priorytet |
|---------|-------|-----------|
| 13 (25-28.03) | Email automation + lead magnet PDF | WYSOKI |
| 14 (31.03-04.04) | Prototyp fizyczny zamówiony + Instagram setup | WYSOKI |
| 15 (07-11.04) | Beta test start + prezentacja NM draft | WYSOKI |
| 16 (14-18.04) | Payment integration + feedback z beta testu | ŚREDNI |
| 17-18 (21.04-02.05) | Iteracja na feedbacku + content marketing start | ŚREDNI |
| 19-20 (05-16.05) | **LAUNCH** — pełna sprzedaż START + 3 OBSZARY | WYSOKI |
| 21-24 (19.05-13.06) | Scale-up: Allegro, reszta OBSZARÓW, CORPORATE | ŚREDNI |
