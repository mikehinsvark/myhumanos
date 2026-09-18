# Human Intelligence OS Hero Video — QA Notes

## Baseline inspection

The existing hero used a two-column grid with the copy on the left and a 400 × 400 pixel square illustration on the right. The overall hero measured approximately 730 pixels tall at a 1280 × 1100 viewport.

## Updated desktop preview

The illustration has been replaced with a responsive 16:9 video card using the new 94-second Dreams film. At a 1280-pixel desktop viewport, the video occupies the full right column at a readable size while the hero remains compact enough to reveal the lower feature strip and the beginning of the next section without scrolling. The existing headline, supporting copy, three calls to action, pull quote, and four outcome tiles remain intact.

The player includes a lightweight poster, native controls, a prominent play control, a compact metadata bar, and a restrained caption rail. The existing **WATCH THE VIDEO** CTA now deep-links to and plays the featured film. The floating film launcher and modal are also updated to use the new film.

## Responsive preview

At 820 × 1180, the hero remains compact and visually balanced: the copy and buttons occupy a concise first block, the 16:9 player is large and readable, and the four outcome tiles are visible within the same viewport. The poster, metadata bar, native controls, and caption rail all retain clear hierarchy.

At 390 × 844, the navigation collapses correctly, headline and body copy remain readable, and the three calls to action stack cleanly. The player uses the full mobile width. The existing fixed video launcher duplicates the new featured player and partially covers it at the bottom of the viewport; it will therefore be suppressed now that the film is permanently featured in the hero.

## Browser media validation

After the launcher cleanup, a cache-busted desktop reload confirmed the featured player remained in place and the floating launcher was removed. The browser reported the hero video at `readyState 4`, with the correct local MP4 source and a measured duration of approximately 94 seconds. A direct console-initiated playback attempt was correctly blocked by the browser autoplay policy because it was not triggered by a user gesture; the visible play button remains the intended playback path and will be tested separately.

A real user click on the custom hero play control successfully started playback. The control transitioned away, the player entered its active state, and the video advanced past 11 seconds with `readyState 4`, `paused: false`, and the correct 94-second local source. The original hero CTA resolves to the deep link `#hios-feature-film` as intended.
