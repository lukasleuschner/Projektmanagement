document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const attempts = params.get('attempts');
  const origin = params.get('origin');

  const attemptText = document.getElementById('attempt-text');
  if (attempts) {
    attemptText.textContent = "Du hast das Quiz beim ";

    const bold = document.createElement("b");
    bold.textContent = `${attempts}. Versuch`;

    attemptText.appendChild(bold);
    attemptText.append(" abgeschlossen.");
  }

  const infoLink = document.getElementById('info-link');
  const rewardLink = document.getElementById('reward-link');
  const rewardImage = document.getElementById('reward-image');
  const symbol = document.getElementById('symbol');
  const raum = document.getElementById('raum');
  const stickerLink = document.getElementById('sticker-link');
  const imagesContainer = document.getElementById('images');

  function insertAfter(ref, node) {
    if (ref && ref.parentNode) {
      ref.parentNode.insertBefore(node, ref.nextSibling);
    }
  }

  const contentMap = {
    '2D-Animation': {
      info: { url: '#', text: '' },
      reward: { url: '#', text: '' },
      image: '#',
      symbol: ''
    },
    '3D-Veranstaltungen': {
      info: { url: 'https://hs-flensburg.de/studieninteressierte/angebot/bachelor/AI', text: 'Studiengang: Angewandte Informatik' },
      reward: { url: 'Goodies/3D-Veranstaltungen/3D-Veranstaltung Goodies.zip', text: 'Digitale Belohnung herunterladen' },
      images: [
        'Goodies/3D-Veranstaltungen/Laptop Wallpaper Handy 4K.png',
        'Goodies/3D-Veranstaltungen/Krabbe Sticker.png',
      ],
      stickerlink: { url: 'https://sticker.ly/s/L2MM92', text: 'Link zu Sticker.ly' },
      raum: 'A112',
      symbol: '-'
    },
    'Spieleprogrammierung': {
      info: { url: 'https://hs-flensburg.de/sites/default/files/2025-06/Modulhandbuch_B-MI_23_05_2025.pdf#page=34', text: 'Info zu Spiele-Programmierung' },
      reward: { url: 'Goodies/Spieleprogrammierung/Spieleprogrammierung Goodies.zip', text: 'Digitale Belohnung herunterladen' },
      images: [
        'Goodies/Spieleprogrammierung/Gaming Wallpaper Handy 4K.png',
        'Goodies/Spieleprogrammierung/Katze Sticker.png',   

      ],
      stickerlink: { url: 'https://sticker.ly/s/O1EFP8', text: 'Link zu Sticker.ly' },

      raum: 'A25',
      symbol: 'F'
    },
    'Audioproduktion': {
      info: { url: 'https://hs-flensburg.de/sites/default/files/2025-06/Modulhandbuch_B-MI_23_05_2025.pdf#page=12', text: 'Info zu Audio-Produktion' },
      reward: { url: 'Goodies/Audioproduktion/Audioproduktion.zip', text: 'Digitale Belohnung herunterladen' },
      images: [
        'Goodies/Audioproduktion/Welli Wallpaper Handy 4K.png',
        'Goodies/Audioproduktion/Herz Sticker.png',


      ],
      stickerlink: { url: 'https://sticker.ly/s/T6LIKS', text: 'Link zu Sticker.ly' }, 
      raum: 'A13',
      symbol: '$'
    },
    'DesignFilmMarketing': {
      info: { url: 'https://hs-flensburg.de/sites/default/files/2022-01/MA_DFM_2022_Modulkatalog.pdf#page=4', text: 'Modulhandbuch Design, Film & Marketing' },
      reward: { url: 'Goodies/DesignFilmMarketing/DesignFilmMarketing Goodies.zip', text: 'Digitale Belohnung herunterladen' },
      images: [
        'Goodies/DesignFilmMarketing/Wallpaper Strandkiste Handy 4K.png',
        'Goodies/DesignFilmMarketing/WideHoodieWhite.gif',

      ],
      raum: 'A124',
      symbol: 'Q'
    },
    'DigitaleBildbearbeitung': {
      info: { url: 'https://hs-flensburg.de/sites/default/files/2025-06/Modulhandbuch_B-MI_23_05_2025.pdf#page=15', text: 'Info zu Digitale Bildbearbeitung' },
      reward: { url: 'Goodies/DigitaleBildbearbeitung/DDB Goodies.zip', text: 'Digitale Belohnung herunterladen' },
      images: [
        'Goodies/DigitaleBildbearbeitung/Wallpaper Blüte Handy 4K.png',
        'Goodies/DigitaleBildbearbeitung/Tiere Sticker.png',
      ],
      stickerlink: { url: 'https://sticker.ly/s/EE1L74', text: 'Link zu Sticker.ly' }, 
      raum: 'A212 (1)',
      symbol: 'Z'
    },
    'Film&MediaArts': {
      info: { url: 'https://hs-flensburg.de/studieninteressierte/angebot/bachelor/B-FMA', text: 'Studiengang: Film & media Arts' },
      reward: { url: 'Goodies/FilmMediaArts/Film&MediaArts Goodies.zip', text: 'Digitale Belohnung herunterladen' },
      images: [
        'Goodies/FilmMediaArts/Skyline Wallpaper Handy 4K.png',
        'Goodies/FilmMediaArts/QR-Rallye.png',
      ],

      stickerlink: { url: 'https://sticker.ly/s/LHA5G0', text: 'Link zu Sticker.ly' }, 
      raum: 'A14',
      symbol: '#'
    },
    'GrundlagenGestaltung': {
      info: { url: 'https://hs-flensburg.de/studieninteressierte/angebot/bachelor/MI', text: 'Info zu Grundlagen Gestaltung' },
      reward: { url: 'Goodies/GrundlagenGestaltung/GrundlagenGestaltung Goodies.zip', text: 'Digitale Belohnung herunterladen' },
      images: [
        'Goodies/GrundlagenGestaltung/Tetris Wallpaper Handy 4K.png',
        'Goodies/GrundlagenGestaltung/Slim HoodieWhite.gif',
      ],

      raum: 'A212 (2)',
      symbol: '!'
    },
    'AudioFilmtechnik': {
      info: {
        url: 'https://hs-flensburg.de/sites/default/files/2025-06/Modulhandbuch_B-MI_23_05_2025.pdf#page=3',
        text: 'Info zu Filmsprache'
      },
      reward: { url: 'Goodies/AudioFilmtechnik/AudioFilmtechnik.zip', text: 'Digitale Belohnung herunterladen' },
      images: [
        'Goodies/AudioFilmtechnik/Quallen Wallpaper Handy 4K.png',
        'Goodies/AudioFilmtechnik/WideHoodieBlack.gif',],

      raum: 'AU4',
      symbol: 'H'
    },
    'VFX': {
      info: { url: 'https://hs-flensburg.de/sites/default/files/2025-06/Modulhandbuch_B-MI_23_05_2025.pdf#page=51', text: 'Info zu Postproduction' },
      reward: { url: 'Goodies/VFX/VFX Goodies.zip', text: 'Digitale Belohnung herunterladen' },
      images: [
        'Goodies/VFX/Schaltkreis Wallpaper Handy 4K.png',
        'Goodies/VFX/SlimHoodieBlack.gif'],

      raum: 'A26',
      symbol: 'L'
    },
    'Web-Technologien': {
      info: { url: 'https://hs-flensburg.de/sites/default/files/2025-06/Modulhandbuch_B-MI_23_05_2025.pdf#page=42', text: 'Info zu Frontend-Design' },
      reward: { url: 'Goodies/Web-Technologien/Web-Technologien Goodies.zip', text: 'Digitale Belohnung herunterladen' },
      stickerlink: { url: 'https://sticker.ly/s/9BV23Q', text: 'Link zu Sticker.ly' },  
      images: [
        'Goodies/Web-Technologien/Bücherregal Wallpaper Handy 4K.png',
        'Goodies/Web-Technologien/Eule Sticker.png',
      ],
      raum: 'A125',
      symbol: 'Z'
    }
  };

  const content = contentMap[origin];
  if (content) {
    // Info
    if (content.info && content.info.url && content.info.url !== '#') {
      const link = document.createElement('a');
      link.href = content.info.url;
      link.textContent = content.info.text || content.info.url;
      link.target = "_blank";
      link.rel = "noopener";
      infoLink.appendChild(link);
    }

    // Reward-Download
    if (content.reward && content.reward.url && content.reward.url !== '#') {
      const link = document.createElement('a');
      link.href = content.reward.url;
      link.textContent = content.reward.text || content.reward.url;
      link.target = "_blank";
      link.rel = "noopener";
      rewardLink.appendChild(link);
    }

    // Sticker-Link
    if (content.stickerlink && content.stickerlink.url) {
      const label = document.createElement('div');
      label.textContent = 'Sticker-Pack:';
      label.style.marginTop = '12px';

      const link = document.createElement('a');
      link.href = content.stickerlink.url;
      link.textContent = content.stickerlink.text || content.stickerlink.url;
      link.target = "_blank";
      link.rel = "noopener";

      stickerLink.appendChild(label);
      stickerLink.appendChild(link);
    }

    // Bilder NACH den Links
    const targetForImages = imagesContainer || stickerLink || rewardLink || infoLink;
    const wrapper = document.createElement('div');
    wrapper.style.marginTop = '16px';

    if (content.images && Array.isArray(content.images)) {
      content.images.forEach(imgUrl => {
        const img = document.createElement('img');
        img.src = imgUrl;
        img.alt = 'Belohnung';
        img.style.maxWidth = '100%';
        img.style.display = 'block';
        img.style.margin = '16px auto';
        wrapper.appendChild(img);
      });
      // falls #images existiert, direkt dort anhängen, sonst hinter den letzten Link-Block einfügen
      if (imagesContainer) {
        imagesContainer.appendChild(wrapper);
      } else {
        insertAfter(targetForImages, wrapper);
      }
    } else if (content.image) {
      const img = document.createElement('img');
      img.src = content.image;
      img.alt = 'Belohnung';
      img.style.maxWidth = '100%';
      img.style.display = 'block';
      img.style.margin = '16px auto';
      if (imagesContainer) {
        imagesContainer.appendChild(img);
      } else {
        insertAfter(targetForImages, img);
      }
    }

    if (content.raum) raum.textContent = content.raum;
    if (content.symbol) symbol.textContent = content.symbol;
  }
});
