# For You — Birthday Website

A dark-vintage, romantic birthday microsite built with Next.js App Router, Tailwind CSS, Framer Motion and Lucide React.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Personalize before publishing

### 1. Add your photos

Put ten different image files in `public/images/`: `hero-1.jpg` to `hero-3.jpg` for the hero collage, `memory-1.jpg` to `memory-4.jpg` for The Little Moments gallery, and `frame-1.jpg` to `frame-3.jpg` for the film strip. Each section now uses its own photos.

### 2. Add the song

Put an audio file at `public/music/our-song.mp3`. Use a song you have the right to use. The browser tries playback after the visitor opens or skips the envelope; autoplay with sound before user interaction is commonly blocked. The fixed vinyl control can pause and resume the song. If the file is missing, the player stays available and explains where to add it.

### 3. Personalize the words

Edit `src/components/BirthdayExperience.tsx`:

- `memories` for the four relationship timeline chapters.
- The hero paragraphs for the birthday greeting.
- The inline letter paragraphs for your personal note.
- `photos` for the gallery captions.

Replace generic example text with details only the two of you understand.

### 4. Change the page title

Edit `metadata` in `src/app/layout.tsx`.

## Publish

Push the project to a GitHub repository, import it into Vercel, and deploy using the default Next.js settings. No database or environment variables are required for this static, frontend-only experience.

## Experience notes

- The envelope opens with a short letter reveal and includes a skip control.
- The love letter opens inline, the photos reveal as you scroll and open in a keyboard-navigable lightbox, and a film strip leads into the timeline.
- The birthday candle goes out before the final message appears.
- Decorative motion is reduced when the visitor has enabled their device's reduced-motion setting.
- Music and photos are placeholders until you add your own media files.
