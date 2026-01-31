const unsplash = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=85`;

export const images = {
  hero: unsplash("1490750967868-88aa4486c946", 1920), // soft pink flowers
  heroAlt: unsplash("1501004318641-b39e6451bec6", 1920), // bouquet
  about: unsplash("1455659817273-f96807779a8a", 1200), // arrangement
  parallax: unsplash("1496062031456-07b8f162a322", 1600), // field / nature
  gallery: [
    unsplash("1508610048659-a06b669e3321", 800), // bouquet
    unsplash("1519225421980-715cb0215aed", 800), // wedding
    unsplash("1563241527-3004b7be0ffd", 800),   // orchid
    unsplash("1416879595882-3373a0480b5b", 800), // garden
    unsplash("1490750967868-88aa4486c946", 800),
    unsplash("1501004318641-b39e6451bec6", 800),
  ],
  services: {
    bouquet: unsplash("1508610048659-a06b669e3321", 800),
    bridal: unsplash("1519225421980-715cb0215aed", 800),
    preserved: unsplash("1455659817273-f96807779a8a", 800),
    orchid: unsplash("1563241527-3004b7be0ffd", 800),
    garden: unsplash("1416879595882-3373a0480b5b", 800),
  },
  shop: unsplash("1496062031456-07b8f162a322", 1200),
};
