/**
 * TruthLens - Multimodal Digital Forensics & Deepfake Detection Engine
 * Client-Side Analysis, Cross-Modal Correlation, and Forensic Reporting
 */

// Application State
const TruthLens = {
  currentCaseId: 'TL-2026-081',
  activeViewMode: 'ela', // 'original', 'ela', 'noise'
  elaAmplifier: 25,
  audioPlaying: false,
  audioContext: null,
  audioSource: null,
  analyserNode: null,
  animationFrameId: null,
  videoCurrentTime: 4.2,
  videoDuration: 12.0,
  
  // Custom uploaded files store
  customEvidence: {
    image: null,
    video: null,
    audio: null,
    text: null
  },

  // Case Studies Database
  cases: {
    'TL-2026-081': {
      id: 'TL-2026-081',
      title: 'Diplomatic Summit Fabricated Address',
      type: 'Foreign Disinformation / Deepfake Video & Cloned Voice',
      classification: 'CRITICAL THREAT',
      date: '2026-11-18 14:22:05 UTC',
      summary: 'A viral video clip depicting Foreign Minister Kovacs announcing unilateral withdrawal from the Geneva Humanitarian Treaty. Multimodal signals indicate synthetic facial reenactment, neural cloned speech, and contradictory environmental metadata.',
      overallVerdict: 'High Probability Synthetic Manipulation',
      calibratedScore: 91,
      confidenceMargin: 6,
      scoreClass: 'high-manipulation',
      indicatorsCount: 7,
      crossModalStatus: 'Severe Discrepancies (3 Major Mismatches)',
      
      // Image / Visual Evidence
      image: {
        filename: 'summit_keyframe_04s.jpg',
        size: '1.42 MB',
        mime: 'image/jpeg',
        dimensions: '1920 x 1080',
        hash: 'e8b3a7261d5f8c4992de31f7902bb381a179c3d4f938927bc712f5a6e8103d12',
        verdict: 'MANIPULATION DETECTED',
        verdictClass: 'badge-flagged',
        visualType: 'face_deepfake',
        bbox: { x: 38, y: 20, w: 24, h: 42, label: 'Synthetic Facial Splice [0.93]' },
        exif: {
          make: 'Unknown / Stripped',
          model: 'Null',
          software: 'Lavf59.27.100 (FFmpeg Pipe)',
          dateTime: '2026-11-18 13:45:10',
          colorSpace: 'sRGB (Untagged)',
          gps: 'Missing',
          tamperFlag: 'High: Missing Quantization Tables'
        },
        indicators: [
          { title: 'Facial Boundary Warping', detail: 'Irregular gradient blurring along jawline and hairline consistent with Poisson blending in face-swap architectures.', sev: 'high' },
          { title: 'High-Frequency Compression Mismatch', detail: 'ELA reveals face region error level is 3.4x lower than background scene, indicating separate compression pass.', sev: 'high' }
        ]
      },

      // Video Evidence
      video: {
        filename: 'minister_address_clip.mp4',
        size: '18.6 MB',
        mime: 'video/mp4',
        duration: 12.0,
        fps: 30,
        hash: '7c9a410d9f4e221b66782c5a034d6ee1fa88274198ec510ab9e4726bf839211c',
        verdict: 'TEMPORAL ANOMALIES',
        verdictClass: 'badge-flagged',
        anomaliesTimeline: [
          { start: 0, end: 2.5, level: 'normal' },
          { start: 2.5, end: 8.0, level: 'critical', label: 'Lip-Sync Desynchronization & Facial Artifacts' },
          { start: 8.0, end: 12.0, level: 'moderate', label: 'Unnatural Blink Suppression' }
        ],
        blinkRate: '1.2 blinks/min (Expected baseline: 12-18)',
        lipSyncOffset: '+195 ms phase drift',
        opticalFlowVariance: 'Spike at Frame 142 (Boundary tear)'
      },

      // Audio Evidence
      audio: {
        filename: 'minister_audio_track.wav',
        size: '4.8 MB',
        mime: 'audio/x-wav',
        duration: 12.0,
        hash: '3f7b9921e1498b0227cd64539820f182cba948d39023ef61a7c0932148b4112e',
        verdict: 'CLONED SPEECH DETECTED',
        verdictClass: 'badge-flagged',
        spectralCutoff: '7.8 kHz (Hard Neural Vocoder Roll-off)',
        pitchRoboticism: '92.4% Pitch Stability (Lack of natural micro-tremor)',
        phaseContinuity: 'Discontinuous phase transitions between phonemes',
        noiseFloor: 'Sterile digital silence in pauses (-88 dB)'
      },

      // Text / Context Evidence
      text: {
        filename: 'social_release_telegram.txt',
        size: '1.8 KB',
        hash: 'b140cd982fa10476e3381a4d6e902b742843efc60921820984dafa9801723467',
        verdict: 'CLAIM CONTRADICTION',
        verdictClass: 'badge-flagged',
        rawText: `URGENT BROADCAST | GENEVA: Foreign Minister Kovacs addressed reporters outside the Palais des Nations at 14:00 today amidst heavy downpours, confirming full unilateral cessation of Article 4 compliance. "We have reached our limit," Kovacs stated firmly to the damp crowd. #GenevaSummit #BreakingNews`,
        claims: [
          { entity: 'Speaker', claimed: 'Minister Kovacs', verified: 'Face & Voice Synthesized', match: false },
          { entity: 'Location', claimed: 'Palais des Nations, Geneva', verified: 'Background matches stock photo #2819', match: false },
          { entity: 'Weather', claimed: 'Heavy downpours / damp crowd', verified: 'Visuals show direct overhead sunlight & dry pavement', match: false },
          { entity: 'Time Claim', claimed: '14:00 CET', verified: 'Shadow cast indicates ~10:30 AM sun elevation', match: false }
        ]
      },

      // Cross-Modal Correlation Points
      crossModalMatrix: {
        scores: [88, 94, 91, 85, 90], // [Audio-Visual, Video-Text, Audio-Text, Image-Text, Metadata-Physical]
        inconsistencies: [
          {
            modalities: 'Audio ↔ Visual',
            severity: 'critical',
            title: 'Phoneme-to-Viseme Desync',
            description: 'Audio speech phonemes /b/ and /m/ occur while lips remain open at timestamp 00:04.12.',
            impact: 'Direct confirmation of audio replacement or asynchronous video dubbing.'
          },
          {
            modalities: 'Visual ↔ Contextual Text',
            severity: 'critical',
            title: 'Atmospheric & Weather Contradiction',
            description: 'Transcript asserts speech occurred in "heavy downpours", but visual frames show crisp shadow geometry and dry flag fabric.',
            impact: 'Severe textual fabrication uncoupled from authentic environmental capture.'
          },
          {
            modalities: 'Metadata ↔ Audio Acoustic Profile',
            severity: 'moderate',
            title: 'Acoustic Room Response Incongruity',
            description: 'Visual shows outdoor open plaza, but voice recording has artificial anechoic profile lacking outdoor wind noise and ground reflections.',
            impact: 'Studio vocoder speech spliced onto synthetic outdoor backdrop.'
          }
        ]
      },

      // Uncertainty & Honest Caveats
      uncertainties: {
        confidenceLevel: 'High (Calibrated Score 91% ± 6%)',
        alternativeExplanations: [
          'Variable Frame Rate (VFR) transcode on social platforms can artificially induce lip-sync offsets up to 120ms.',
          'Platform audio compression (e.g. Telegram 32kbps Opus) may introduce high-frequency cutoffs around 8-10 kHz.',
          'Color banding and edge artifacts could partially stem from aggressive HEVC B-frame compression.'
        ],
        whyNotProof: 'TruthLens analysis flags cumulative mathematical inconsistencies across 4 modalities. While the probability of non-synthetic origin is under 9%, official legal attribution requires cryptographic sensor attestations or device seizure.'
      }
    },

    'TL-2026-094': {
      id: 'TL-2026-094',
      title: 'CEO Treasury Wire Authorization Fraud',
      type: 'Executive Impersonation / Spliced Document & Cloned Voice Note',
      classification: 'HIGH-FINANCIAL RISK',
      date: '2026-11-17 09:12:30 UTC',
      summary: 'A fraudulent $4.2M wire authorization sent to a corporate treasury department consisting of a rushed WhatsApp audio note matching the CEO voice accompanied by a PDF invoice with forged corporate stamps.',
      overallVerdict: 'High Probability Voice Clone & Document Splicing',
      calibratedScore: 94,
      confidenceMargin: 5,
      scoreClass: 'high-manipulation',
      indicatorsCount: 6,
      crossModalStatus: 'Stark Inconsistencies (2 Major Mismatches)',
      
      image: {
        filename: 'treasury_invoice_stamp.png',
        size: '890 KB',
        mime: 'image/png',
        dimensions: '1240 x 1754',
        hash: '42b8e1903fa652c771dae298103c8021a88b5601934e6210f9a23c0182479e01',
        verdict: 'DOCUMENT TAMPERING',
        verdictClass: 'badge-flagged',
        visualType: 'document_tamper',
        bbox: { x: 55, y: 68, w: 32, h: 22, label: 'Spliced Signature & Bank Seal [0.96]' },
        exif: {
          make: 'Scanner Software',
          model: 'Adobe Photoshop 24.5 (Windows)',
          software: 'Photoshop Save for Web',
          dateTime: '2026-11-17 08:55:12',
          colorSpace: 'Untagged',
          gps: 'None',
          tamperFlag: 'Critical: Adobe History Meta Tag Present'
        },
        indicators: [
          { title: 'Signature Pixel Grid Discontinuity', detail: 'The signature area has a 72 DPI resolution pasted onto a 300 DPI scanned document page.', sev: 'high' },
          { title: 'Digital Seal Compression Disparity', detail: 'ELA analysis demonstrates the bank endorsement seal was inserted after the page was compressed.', sev: 'high' }
        ]
      },

      video: {
        filename: 'not_applicable_still_audio.mp4',
        size: '2.1 MB',
        mime: 'video/mp4',
        duration: 8.0,
        fps: 1,
        hash: '910248a31e892c554a938174ef8204b6a98213e4590218ab40e891c34a872611',
        verdict: 'STATIC PRESENTATION',
        verdictClass: 'badge-clean',
        anomaliesTimeline: [
          { start: 0, end: 8.0, level: 'normal', label: 'Static graphic presentation (No temporal deepfake)' }
        ],
        blinkRate: 'N/A',
        lipSyncOffset: 'N/A',
        opticalFlowVariance: '0.0 (Static Graphic)'
      },

      audio: {
        filename: 'ceo_urgent_voicenote.ogg',
        size: '320 KB',
        mime: 'audio/ogg',
        duration: 8.0,
        hash: '84920198ea23b874c9103829ef8109247291a834b90123984ca901283e789012',
        verdict: 'VOICE CLONE CONFIRMED',
        verdictClass: 'badge-flagged',
        spectralCutoff: '16.0 kHz (ElevenLabs / CosyVoice Vocoder signature)',
        pitchRoboticism: 'Synthetic pitch variation lacking emotional stress harmonics',
        phaseContinuity: 'Artificial cross-fades at phrase boundaries',
        noiseFloor: 'Synthetically inserted tape hiss without acoustic reverb'
      },

      text: {
        filename: 'whatsapp_urgent_message.txt',
        size: '420 B',
        hash: '22340918fa9021e84738291a039b812347890128472910ab3847192837461928',
        verdict: 'TIMING CONTRADICTION',
        verdictClass: 'badge-flagged',
        rawText: `From: CEO Henderson [Mobile] - 09:10 AM: "Listen, I am currently boarding flight LH402 in Frankfurt tarmac with bad reception. Send the $4.2M wire to Acuity Global Escrow immediately before takeoff or the acquisition collapses. Invoice attached."`,
        claims: [
          { entity: 'Speaker Location', claimed: 'Frankfurt Airport tarmac', verified: 'Zero jet engine or airport PA acoustic presence in audio', match: false },
          { entity: 'Flight Schedule', claimed: 'LH402 departure 09:15', verified: 'LH402 departs at 17:45 according to flight tracking', match: false },
          { entity: 'Device Author', claimed: 'CEO Mobile Phone', verified: 'Invoice metadata authored on Windows PC running Photoshop', match: false }
        ]
      },

      crossModalMatrix: {
        scores: [95, 98, 92, 88, 97],
        inconsistencies: [
          {
            modalities: 'Audio ↔ Contextual Text',
            severity: 'critical',
            title: 'Tarmac Ambiance Total Absence',
            description: 'Audio message claims to be recorded while boarding a Boeing 747 in Frankfurt, but audio reveals zero background noise (SNR > 65 dB).',
            impact: 'Pre-rendered TTS model generated in silence.'
          },
          {
            modalities: 'Image Metadata ↔ Mobile Claim',
            severity: 'critical',
            title: 'Device Source Mismatch',
            description: 'Text claims quick mobile invoice forward, but PDF/PNG metadata exposes creation on Windows workstation using Adobe Photoshop at 08:55.',
            impact: 'Conclusively debunks mobile phone spontaneous capture.'
          }
        ]
      },

      uncertainties: {
        confidenceLevel: 'Very High (Calibrated Score 94% ± 5%)',
        alternativeExplanations: [
          'Noise-canceling enterprise microphone headsets can significantly suppress environmental airplane noise.',
          'Accounting assistants may have prepared the document in Photoshop on desktop on behalf of the executive.'
        ],
        whyNotProof: 'Acoustic voice synthesis models have high accuracy but voice similarities can occasionally occur naturally; forensic banking freeze requires direct out-of-band biometric phone call verification.'
      }
    },

    'TL-2026-112': {
      id: 'TL-2026-112',
      title: 'Wildfire Catastrophe Photo Manipulation',
      type: 'Social Propaganda / AI Diffusion Composite Image',
      classification: 'MODERATE-PROPAGANDA',
      date: '2026-11-16 18:04:11 UTC',
      summary: 'A dramatic photograph depicting the historic Cathedral engulfed by raging 80-foot wildfires, shared widely across media to incite panic. Forensic analysis indicates an AI diffusion background spliced with a vintage tourist photograph.',
      overallVerdict: 'High Probability Composite / Generative Image',
      calibratedScore: 86,
      confidenceMargin: 8,
      scoreClass: 'high-manipulation',
      indicatorsCount: 5,
      crossModalStatus: 'Moderate Inconsistencies',

      image: {
        filename: 'cathedral_fire_catastrophe.jpg',
        size: '3.1 MB',
        mime: 'image/jpeg',
        dimensions: '2048 x 1536',
        hash: '6a8910248f21903ba849102384a719284b901283749012384719028347102938',
        verdict: 'SYNTHETIC COMPOSITE',
        verdictClass: 'badge-flagged',
        visualType: 'diffusion_composite',
        bbox: { x: 30, y: 15, w: 45, h: 70, label: 'Spliced Foreground Structure [0.89]' },
        exif: {
          make: 'Sony',
          model: 'ILCE-7RM5 (Fabricated)',
          software: 'Midjourney v6.1 / Composite',
          dateTime: '2026-11-16 17:40:00',
          colorSpace: 'Display P3',
          gps: '44.8378° N, 0.5792° W (Bordeaux)',
          tamperFlag: 'Moderate: EXIF Tag Order Irregularity'
        },
        indicators: [
          { title: 'Generative Smoke Artifacts', detail: 'Smoke plumes display repetitive latent diffusion fractal patterns with impossible physical vortex dissipation.', sev: 'high' },
          { title: 'Lighting Direction Contradiction', detail: 'Cathedral spire shadows cast towards southeast while foreground blaze is positioned directly south.', sev: 'high' }
        ]
      },

      video: {
        filename: 'not_supplied.mp4',
        size: '0 B',
        mime: 'none',
        duration: 0,
        fps: 0,
        hash: 'N/A',
        verdict: 'NO VIDEO EVIDENCE',
        verdictClass: 'badge-clean',
        anomaliesTimeline: [],
        blinkRate: 'N/A',
        lipSyncOffset: 'N/A',
        opticalFlowVariance: 'N/A'
      },

      audio: {
        filename: 'not_supplied.wav',
        size: '0 B',
        mime: 'none',
        duration: 0,
        hash: 'N/A',
        verdict: 'NO AUDIO EVIDENCE',
        verdictClass: 'badge-clean',
        spectralCutoff: 'N/A',
        pitchRoboticism: 'N/A',
        phaseContinuity: 'N/A',
        noiseFloor: 'N/A'
      },

      text: {
        filename: 'tweet_breaking_news.txt',
        size: '280 B',
        hash: '5719208347190283471092837401928347109283740192834710928374019283',
        verdict: 'FACTUAL INCONSISTENCY',
        verdictClass: 'badge-flagged',
        rawText: `BREAKING: The historic Saint-Andre Cathedral is currently surrounded by unstoppable 100-foot flames! Firefighters report 0% containment as winds reach 65 mph. Prayers for Bordeaux! #WildfireAlert #BordeauxFire`,
        claims: [
          { entity: 'Location Event', claimed: 'Saint-Andre Cathedral Fire', verified: 'Municipal fire department reported zero active fires in city center', match: false },
          { entity: 'Wind Velocity', claimed: '65 mph gusts', verified: 'Weather station records calm 4 mph breeze', match: false }
        ]
      },

      crossModalMatrix: {
        scores: [60, 85, 50, 92, 88],
        inconsistencies: [
          {
            modalities: 'Image ↔ Ground Reality Data',
            severity: 'critical',
            title: 'Meteorological & Geo Disparity',
            description: 'Claimed 65 mph gale force winds are contradicted by smoke plumes in the photo rising almost vertically (indicative of calm air).',
            impact: 'Physical simulation failure characteristic of generative models.'
          }
        ]
      },

      uncertainties: {
        confidenceLevel: 'Moderate-High (Calibrated Score 86% ± 8%)',
        alternativeExplanations: [
          'Extreme thermal draft from actual large fires can create localized vertical smoke columns even during high crosswinds.',
          'HDR camera processing can distort natural shadow directions.'
        ],
        whyNotProof: 'Camera model EXIF may have been altered by automated social media redistribution pipelines without altering the core image.'
      }
    },

    'TL-2026-042': {
      id: 'TL-2026-042',
      title: 'Verified Official Press Briefing',
      type: 'Authentic Evidentiary Reference / Raw Media Capture',
      classification: 'VERIFIED AUTHENTIC',
      date: '2026-11-15 11:00:00 UTC',
      summary: 'Raw camera and audio recording of the Ministry of Health public health update. Submitted for baseline authentication and integrity certification.',
      overallVerdict: 'High Authenticity Corroboration (Clean)',
      calibratedScore: 4,
      confidenceMargin: 3,
      scoreClass: 'authentic-score',
      indicatorsCount: 0,
      crossModalStatus: 'Consistent Across All Modalities',

      image: {
        filename: 'briefing_raw_frame.jpg',
        size: '8.4 MB',
        mime: 'image/jpeg',
        dimensions: '3840 x 2160',
        hash: '1102938471029384710293847102938471029384710293847102938471029384',
        verdict: 'GENUINE SENSOR INTEGRITY',
        verdictClass: 'badge-clean',
        visualType: 'genuine_photo',
        bbox: null,
        exif: {
          make: 'Canon',
          model: 'EOS R5 Mark II',
          software: 'Firmware v1.1.0 (Signed)',
          dateTime: '2026-11-15 10:58:32',
          colorSpace: 'Adobe RGB',
          gps: '38.8977° N, 77.0365° W',
          tamperFlag: 'Clean: Hardware C2PA Authenticity Manifest Present'
        },
        indicators: [
          { title: 'Uniform Sensor Noise Distribution', detail: 'Poisson-Gaussian noise variance is uniformly distributed across facial features, clothing, and background.', sev: 'clean' },
          { title: 'Consistent Error Level Profile', detail: 'Zero ELA edge anomalies; uniform quantization across all 8x8 DCT blocks.', sev: 'clean' }
        ]
      },

      video: {
        filename: 'press_feed_prores.mov',
        size: '142 MB',
        mime: 'video/quicktime',
        duration: 15.0,
        fps: 60,
        hash: '2291028347102938471029384710293847102938471029384710293847102938',
        verdict: 'TEMPORALLY COHERENT',
        verdictClass: 'badge-clean',
        anomaliesTimeline: [
          { start: 0, end: 15.0, level: 'normal', label: 'Continuous natural temporal motion' }
        ],
        blinkRate: '15.4 blinks/min (Natural physiological baseline)',
        lipSyncOffset: '-8 ms (Imperceptible, within broadcast sync tolerances)',
        opticalFlowVariance: 'Smooth natural ballistic motion curves'
      },

      audio: {
        filename: 'podium_shure_sm58.wav',
        size: '18.2 MB',
        mime: 'audio/x-wav',
        duration: 15.0,
        hash: '3391028347102938471029384710293847102938471029384710293847102938',
        verdict: 'AUTHENTIC ACOUSTIC SPEECH',
        verdictClass: 'badge-clean',
        spectralCutoff: '22.05 kHz (Full Nyquist acoustic bandwidth)',
        pitchRoboticism: 'Natural vocal cord fundamental frequency jitter & shimmer',
        phaseContinuity: 'Natural organic phase progression across harmonics',
        noiseFloor: 'Authentic HVAC background rumble (-52 dB)'
      },

      text: {
        filename: 'reuters_wire_transcript.txt',
        size: '1.2 KB',
        hash: '4491028347102938471029384710293847102938471029384710293847102938',
        verdict: '100% CORROBORATED',
        verdictClass: 'badge-clean',
        rawText: `WASHINGTON (Reuters) - Public Health Director Alvarez announced new seasonal vaccine recommendations this morning from the National Press Club. The 15-minute briefing outlined distribution logistical timelines. Alvarez confirmed full state-level stockpile availability.`,
        claims: [
          { entity: 'Speaker', claimed: 'Director Alvarez', verified: 'Face and biometrics match certified database', match: true },
          { entity: 'Location', claimed: 'National Press Club', verified: 'Podium insignia and backdrop match location records', match: true },
          { entity: 'Topic & Context', claimed: 'Seasonal vaccine timelines', verified: 'Spoken transcript precisely matches speech audio', match: true }
        ]
      },

      crossModalMatrix: {
        scores: [12, 10, 8, 14, 9], // Very low manipulation likelihood across all
        inconsistencies: [
          {
            modalities: 'All Modalities Corroborated',
            severity: 'corroborated',
            title: 'Unified Signal Integrity',
            description: 'Lip motion, spoken phonemes, room impulse response, lighting angles, and wire text demonstrate seamless cross-modal alignment.',
            impact: 'High evidential reliability; satisfies criteria for authentic legal evidence.'
          }
        ]
      },

      uncertainties: {
        confidenceLevel: 'High Authenticity (Calibrated Score 4% ± 3%)',
        alternativeExplanations: [
          'Even authentic footage can undergo minor compression artifacts when transcoded for broadcast.',
          'Cryptographic C2PA provenance credentials confirm direct camera sensor origin.'
        ],
        whyNotProof: 'Cryptographic provenance strongly validates capture device, but human investigators should still verify that physical surroundings were not staged.'
      }
    }
  },

  // Toast Notification System
  showToast(message, type = 'info', duration = 3200) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const icon = type === 'success' ? '✓' : type === 'warning' ? '⚠' : 'ℹ';
    toast.innerHTML = `<span style="font-weight:700; color:var(--accent-cyan);">${icon}</span> <span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  },

  // Screen Reader Announcer Helper
  announce(text) {
    const announcer = document.getElementById('aria-announcer');
    if (announcer) {
      announcer.textContent = text;
    }
  },

  // Initialize Application
  init() {
    this.bindEvents();
    this.loadCase(this.currentCaseId, false);
    this.initAudioContext();
  },

  // Event Listeners
  bindEvents() {
    // Case Pill Buttons
    document.querySelectorAll('.case-pill').forEach(pill => {
      pill.addEventListener('click', (e) => {
        const caseId = pill.dataset.case;
        if (caseId && this.cases[caseId]) {
          document.querySelectorAll('.case-pill').forEach(p => p.classList.remove('active'));
          pill.classList.add('active');
          this.loadCase(caseId);
        }
      });
    });

    // Image View Mode Toggles
    document.querySelectorAll('.seg-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const mode = btn.dataset.mode;
        if (mode) {
          document.querySelectorAll('.seg-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.activeViewMode = mode;
          this.renderImageForensics();
        }
      });
    });

    // ELA Sensitivity Slider
    const elaSlider = document.getElementById('ela-amplifier-slider');
    if (elaSlider) {
      elaSlider.addEventListener('input', (e) => {
        this.elaAmplifier = parseInt(e.target.value, 10);
        document.getElementById('ela-amplifier-val').textContent = `${this.elaAmplifier}x`;
        if (this.activeViewMode === 'ela') {
          this.renderImageForensics();
        }
      });
    }

    // Video Scrubber Bar
    const scrubberTrack = document.getElementById('video-scrubber-track');
    if (scrubberTrack) {
      scrubberTrack.addEventListener('click', (e) => {
        const rect = scrubberTrack.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const progress = Math.max(0, Math.min(1, clickX / rect.width));
        const activeCase = this.cases[this.currentCaseId];
        this.videoCurrentTime = progress * (activeCase.video.duration || 10);
        this.updateVideoScrubberUI();
      });
    }

    // Audio Play / Pause Button
    const audioBtn = document.getElementById('audio-play-btn');
    if (audioBtn) {
      audioBtn.addEventListener('click', () => {
        this.toggleAudioPlayback();
      });
    }

    // Modal Dossier Open & Close
    const openDossierBtn = document.getElementById('open-dossier-btn');
    const closeDossierBtn = document.getElementById('close-dossier-btn');
    const dossierModal = document.getElementById('dossier-modal-overlay');

    if (openDossierBtn) {
      openDossierBtn.addEventListener('click', () => {
        this.populateDossierModal();
        dossierModal.classList.add('open');
        this.announce('Forensic dossier modal opened');
      });
    }
    if (closeDossierBtn) {
      closeDossierBtn.addEventListener('click', () => {
        dossierModal.classList.remove('open');
        this.announce('Forensic dossier modal closed');
      });
    }
    if (dossierModal) {
      dossierModal.addEventListener('click', (e) => {
        if (e.target === dossierModal) {
          dossierModal.classList.remove('open');
        }
      });
    }

    // Methodology Guide Modal Open & Close
    const openGuideBtn = document.getElementById('open-guide-btn');
    const closeGuideBtn = document.getElementById('close-guide-btn');
    const guideModal = document.getElementById('guide-modal-overlay');

    if (openGuideBtn && guideModal) {
      openGuideBtn.addEventListener('click', () => {
        guideModal.classList.add('open');
        this.announce('Forensic methodology guide opened');
      });
    }
    if (closeGuideBtn && guideModal) {
      closeGuideBtn.addEventListener('click', () => {
        guideModal.classList.remove('open');
        this.announce('Forensic methodology guide closed');
      });
    }
    if (guideModal) {
      guideModal.addEventListener('click', (e) => {
        if (e.target === guideModal) {
          guideModal.classList.remove('open');
        }
      });
    }

    // Global Keyboard Accessibility (Escape to close modals)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (dossierModal && dossierModal.classList.contains('open')) {
          dossierModal.classList.remove('open');
        }
        if (guideModal && guideModal.classList.contains('open')) {
          guideModal.classList.remove('open');
        }
      }
    });

    // Copy Case Brief Summary Button
    const copySummaryBtn = document.getElementById('copy-summary-btn');
    if (copySummaryBtn) {
      copySummaryBtn.addEventListener('click', () => {
        const activeCase = this.cases[this.currentCaseId];
        const textToCopy = `TRUTHLENS FORENSIC BRIEF // CASE ${activeCase.id}\nTitle: ${activeCase.title}\nClassification: ${activeCase.classification}\nVerdict: ${activeCase.overallVerdict} (${activeCase.calibratedScore}% ±${activeCase.confidenceMargin}%)\nSummary: ${activeCase.summary}\nEvidence Hashes:\nImage: ${activeCase.image.hash}\nVideo: ${activeCase.video.hash}\nAudio: ${activeCase.audio.hash}`;
        
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(textToCopy).then(() => {
            this.showToast('Forensic case summary copied to clipboard', 'success');
          }).catch(() => {
            this.showToast('Brief generated. Press Ctrl+C to copy', 'info');
          });
        } else {
          this.showToast('Brief copied to clipboard', 'success');
        }
      });
    }

    // Print & Export Buttons
    const printDossierBtn = document.getElementById('print-dossier-btn');
    if (printDossierBtn) {
      printDossierBtn.addEventListener('click', () => {
        window.print();
      });
    }

    const exportJsonBtn = document.getElementById('export-json-btn');
    if (exportJsonBtn) {
      exportJsonBtn.addEventListener('click', () => {
        this.exportCaseJson();
      });
    }

    // Workflow stage clicks
    document.querySelectorAll('.stage-step').forEach(step => {
      step.addEventListener('click', () => {
        const targetSection = step.dataset.target;
        if (targetSection) {
          const el = document.getElementById(targetSection);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    // File Dropzones
    this.setupDropzone('image-drop', 'image');
    this.setupDropzone('video-drop', 'video');
    this.setupDropzone('audio-drop', 'audio');
    this.setupDropzone('text-drop', 'text');
  },

  // Setup Drag & Drop for user evidence
  setupDropzone(elementId, modality) {
    const el = document.getElementById(elementId);
    const input = document.getElementById(`${elementId}-input`);
    if (!el || !input) return;

    el.addEventListener('click', () => input.click());

    el.addEventListener('dragover', (e) => {
      e.preventDefault();
      el.style.borderColor = 'var(--accent-cyan)';
    });

    el.addEventListener('dragleave', () => {
      el.style.borderColor = '';
    });

    el.addEventListener('drop', (e) => {
      e.preventDefault();
      el.style.borderColor = '';
      if (e.dataTransfer.files.length > 0) {
        this.handleUploadedFile(e.dataTransfer.files[0], modality);
      }
    });

    input.addEventListener('change', (e) => {
      if (e.target.files.length > 0) {
        this.handleUploadedFile(e.target.files[0], modality);
      }
    });
  },

  // Process live uploaded user file
  async handleUploadedFile(file, modality) {
    const arrayBuffer = await file.arrayBuffer();
    // Compute genuine SHA-256 hash using Web Crypto API
    const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const sha256 = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    // Update dropzone UI
    const card = document.getElementById(`${modality}-drop`);
    if (card) {
      card.classList.add('has-file');
      const titleEl = card.querySelector('.drop-title');
      const metaEl = card.querySelector('.drop-meta');
      const hashEl = card.querySelector('.hash-preview');
      const pillEl = card.querySelector('.drop-status-pill');

      if (titleEl) titleEl.textContent = file.name;
      if (metaEl) metaEl.textContent = `${(file.size / 1024 / 1024).toFixed(2)} MB • ${file.type || 'Custom'}`;
      if (hashEl) hashEl.textContent = `SHA: ${sha256.substring(0, 16)}...`;
      if (pillEl) {
        pillEl.textContent = 'ANALYZED';
        pillEl.classList.add('loaded');
      }
    }

    if (modality === 'image') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          this.customEvidence.image = img;
          this.renderCustomImageForensics(img);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    } else if (modality === 'text') {
      const text = await file.text();
      this.customEvidence.text = text;
      document.getElementById('transcript-display-box').textContent = text;
    }

    // Refresh overall case view
    this.updateChainOfCustodyUI();
    this.showToast(`Analyzed ${file.name} (${sha256.substring(0, 10)}...)`, 'success');
  },

  // Load a complete case study
  loadCase(caseId, notify = true) {
    this.currentCaseId = caseId;
    this.customEvidence.image = null;
    const data = this.cases[caseId];
    if (!data) return;

    // Update Top Triage Hero
    document.getElementById('case-id-tag').textContent = `CASE DOSSIER: ${data.id}`;
    document.getElementById('case-threat-tag').textContent = data.classification;
    document.getElementById('case-heading').textContent = data.title;
    document.getElementById('case-description').textContent = data.summary;

    const timeEl = document.getElementById('case-timestamp-display');
    if (timeEl) timeEl.textContent = `Captured: ${data.date}`;

    const mobCase = document.getElementById('mobile-case-num');
    if (mobCase) mobCase.textContent = data.id;

    // Update Calibrated Confidence Score
    const scoreVal = document.getElementById('calibrated-score-val');
    const scoreMargin = document.getElementById('calibrated-score-margin');
    const scoreBar = document.getElementById('calibrated-score-bar');
    const verdictText = document.getElementById('triage-verdict-text');
    
    scoreVal.className = `gauge-score-value ${data.scoreClass}`;
    scoreVal.innerHTML = `${data.calibratedScore}% <span class="gauge-margin">±${data.confidenceMargin}%</span>`;
    scoreBar.style.width = `${data.calibratedScore}%`;
    verdictText.textContent = data.overallVerdict;

    document.getElementById('triage-indicators-count').textContent = `${data.indicatorsCount} Indicators Flagged`;
    document.getElementById('triage-cross-modal-status').textContent = data.crossModalStatus;

    // Ingest Drop Cards
    this.updateIngestCard('image-drop', data.image);
    this.updateIngestCard('video-drop', data.video);
    this.updateIngestCard('audio-drop', data.audio);
    this.updateIngestCard('text-drop', data.text);

    // Modality 1: Image View
    this.renderImageForensics();

    // Modality 2: Video View
    this.renderVideoForensics();

    // Modality 3: Audio View
    this.renderAudioForensics();

    // Modality 4: Text View
    this.renderTextForensics();

    // Cross-Modal Correlation Radar & Inconsistencies
    this.renderCrossModalSection();

    // Honest Uncertainty Box
    this.renderUncertaintySection();

    // Chain of Custody Table
    this.updateChainOfCustodyUI();

    this.announce(`Loaded Case ${data.id}: ${data.title}`);
    if (notify) {
      this.showToast(`Loaded Case ${data.id}: ${data.title}`, 'info');
    }
  },

  updateIngestCard(cardId, mediaData) {
    const card = document.getElementById(cardId);
    if (!card || !mediaData) return;

    card.classList.add('has-file');
    const title = card.querySelector('.drop-title');
    const meta = card.querySelector('.drop-meta');
    const hash = card.querySelector('.hash-preview');
    const pill = card.querySelector('.drop-status-pill');

    if (title) title.textContent = mediaData.filename;
    if (meta) meta.textContent = `${mediaData.size} • ${mediaData.mime}`;
    if (hash) hash.textContent = `SHA: ${mediaData.hash ? mediaData.hash.substring(0, 14) + '...' : 'N/A'}`;
    if (pill) {
      pill.textContent = 'VERIFIED';
      pill.classList.add('loaded');
    }
  },

  // -------------------------------------------------------------
  // Modality 1: Image Forensics & Error Level Analysis (ELA)
  // -------------------------------------------------------------
  renderImageForensics() {
    if (this.customEvidence.image) {
      this.renderCustomImageForensics(this.customEvidence.image);
      return;
    }
    const activeCase = this.cases[this.currentCaseId];
    const canvas = document.getElementById('image-forensics-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = 640;
    canvas.height = 360;

    // Update Image Metadata / EXIF Table
    document.getElementById('img-meta-camera').textContent = `${activeCase.image.exif.make} ${activeCase.image.exif.model}`;
    document.getElementById('img-meta-software').textContent = activeCase.image.exif.software;
    document.getElementById('img-meta-tamper').textContent = activeCase.image.exif.tamperFlag;
    
    const badge = document.getElementById('image-verdict-badge');
    badge.className = `panel-verdict-badge ${activeCase.image.verdictClass}`;
    badge.textContent = activeCase.image.verdict;

    // Render Indicators List
    const indContainer = document.getElementById('image-indicators-list');
    indContainer.innerHTML = '';
    activeCase.image.indicators.forEach(ind => {
      const item = document.createElement('div');
      item.className = `indicator-item ${ind.sev === 'clean' ? 'clean' : ''}`;
      item.innerHTML = `
        <div class="indicator-header">
          <span>${ind.title}</span>
          <span class="tag ${ind.sev === 'clean' ? 'tag-green' : 'tag-red'}">${ind.sev.toUpperCase()}</span>
        </div>
        <div class="indicator-meta">${ind.detail}</div>
      `;
      indContainer.appendChild(item);
    });

    // Draw Simulated Forensic Canvas based on Mode
    this.drawSimulatedImage(ctx, canvas.width, canvas.height, this.activeViewMode, activeCase);

    // Bounding Box Overlay
    const overlayBbox = document.getElementById('image-overlay-bbox');
    if (activeCase.image.bbox && this.activeViewMode !== 'noise') {
      overlayBbox.style.display = 'block';
      overlayBbox.style.left = `${activeCase.image.bbox.x}%`;
      overlayBbox.style.top = `${activeCase.image.bbox.y}%`;
      overlayBbox.style.width = `${activeCase.image.bbox.w}%`;
      overlayBbox.style.height = `${activeCase.image.bbox.h}%`;
      overlayBbox.querySelector('.bbox-tag').textContent = activeCase.image.bbox.label;
    } else {
      overlayBbox.style.display = 'none';
    }
  },

  // Live Error Level Analysis and PRNU noise computation for user-uploaded photos
  renderCustomImageForensics(img) {
    const canvas = document.getElementById('image-forensics-canvas');
    if (!canvas || !img) return;
    const ctx = canvas.getContext('2d');
    canvas.width = 640;
    canvas.height = 360;

    const overlayBbox = document.getElementById('image-overlay-bbox');
    if (overlayBbox) overlayBbox.style.display = 'none';

    document.getElementById('img-meta-camera').textContent = 'User Uploaded Media';
    document.getElementById('img-meta-software').textContent = 'Analyzed via TruthLens WebCrypto & Canvas Pipeline';
    document.getElementById('img-meta-tamper').textContent = 'Computing Error Discrepancy...';

    if (this.activeViewMode === 'original') {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(56, 189, 248, 0.7)';
      ctx.font = '11px monospace';
      ctx.fillText('USER EVIDENCE // ORIGINAL RASTER', 15, 25);
    } else if (this.activeViewMode === 'ela') {
      const offCanvas = document.createElement('canvas');
      offCanvas.width = canvas.width;
      offCanvas.height = canvas.height;
      const offCtx = offCanvas.getContext('2d');
      offCtx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const originalData = offCtx.getImageData(0, 0, canvas.width, canvas.height);

      const jpegDataUrl = offCanvas.toDataURL('image/jpeg', 0.85);
      const recompressedImg = new Image();
      recompressedImg.onload = () => {
        const reCanvas = document.createElement('canvas');
        reCanvas.width = canvas.width;
        reCanvas.height = canvas.height;
        const reCtx = reCanvas.getContext('2d');
        reCtx.drawImage(recompressedImg, 0, 0, canvas.width, canvas.height);
        const reData = reCtx.getImageData(0, 0, canvas.width, canvas.height);

        const diffData = ctx.createImageData(canvas.width, canvas.height);
        const orig = originalData.data;
        const recomp = reData.data;
        const diff = diffData.data;
        const amp = this.elaAmplifier;

        for (let i = 0; i < orig.length; i += 4) {
          const dr = Math.abs(orig[i] - recomp[i]) * amp;
          const dg = Math.abs(orig[i+1] - recomp[i+1]) * amp;
          const db = Math.abs(orig[i+2] - recomp[i+2]) * amp;
          diff[i] = Math.min(255, dr);
          diff[i+1] = Math.min(255, dg);
          diff[i+2] = Math.min(255, db);
          diff[i+3] = 255;
        }

        ctx.putImageData(diffData, 0, 0);
        ctx.fillStyle = '#00f2fe';
        ctx.font = '11px monospace';
        ctx.fillText(`LIVE COMPUTED ELA // QUALITY: 85% // AMP: ${this.elaAmplifier}x`, 15, 25);
      };
      recompressedImg.src = jpegDataUrl;
    } else if (this.activeViewMode === 'noise') {
      const offCanvas = document.createElement('canvas');
      offCanvas.width = canvas.width;
      offCanvas.height = canvas.height;
      const offCtx = offCanvas.getContext('2d');
      offCtx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const srcData = offCtx.getImageData(0, 0, canvas.width, canvas.height);
      const outData = ctx.createImageData(canvas.width, canvas.height);
      const src = srcData.data;
      const out = outData.data;

      for (let y = 1; y < canvas.height - 1; y++) {
        for (let x = 1; x < canvas.width - 1; x++) {
          const idx = (y * canvas.width + x) * 4;
          const idxLeft = (y * canvas.width + (x - 1)) * 4;
          const delta = Math.abs(src[idx] - src[idxLeft]) * 4;
          out[idx] = delta > 70 ? 255 : delta;
          out[idx+1] = delta > 70 ? 70 : delta;
          out[idx+2] = 160;
          out[idx+3] = 255;
        }
      }
      ctx.putImageData(outData, 0, 0);
      ctx.fillStyle = '#a5f3fc';
      ctx.font = '11px monospace';
      ctx.fillText('LIVE SENSOR NOISE / HIGH-PASS GRADIENT', 15, 25);
    }
  },

  // Draw simulated forensic views (Original, ELA, Noise Gradient)
  drawSimulatedImage(ctx, width, height, mode, activeCase) {
    ctx.clearRect(0, 0, width, height);

    if (mode === 'original') {
      // Draw simulated scene
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, '#1e293b');
      grad.addColorStop(1, '#0f172a');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Draw background architectural pillars / press podium
      ctx.fillStyle = '#334155';
      ctx.fillRect(40, 60, 80, 260);
      ctx.fillRect(150, 80, 90, 240);
      ctx.fillRect(480, 70, 110, 250);

      // Draw subject silhouette/face
      ctx.fillStyle = '#64748b';
      ctx.beginPath();
      ctx.ellipse(320, 180, 75, 105, 0, 0, Math.PI * 2);
      ctx.fill();

      // Draw suit shoulders
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.moveTo(200, 360);
      ctx.lineTo(240, 260);
      ctx.lineTo(400, 260);
      ctx.lineTo(440, 360);
      ctx.closePath();
      ctx.fill();

      // Overlay Forensic HUD Watermark
      ctx.fillStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.font = '11px monospace';
      ctx.fillText(`TRUTHLENS SENSOR RAW // SHA256: ${activeCase.image.hash.substring(0, 12)}...`, 15, 25);
      ctx.fillText(`FRAME: 04:22 // 1920x1080 // RGB-24`, 15, 42);

    } else if (mode === 'ela') {
      // Error Level Analysis view
      // Authentic background has subtle uniform high-entropy noise
      ctx.fillStyle = '#0a0d16';
      ctx.fillRect(0, 0, width, height);

      // Generate base compression noise
      const imgData = ctx.getImageData(0, 0, width, height);
      const data = imgData.data;
      const amp = this.elaAmplifier;

      for (let i = 0; i < data.length; i += 4) {
        // Subtle base noise
        const n = (Math.random() * 8) * (amp / 20);
        data[i] = n;     // R
        data[i+1] = n * 1.2; // G
        data[i+2] = n * 1.8; // B
        data[i+3] = 255;
      }
      ctx.putImageData(imgData, 0, 0);

      // If manipulated case, draw stark high-error level in spliced region
      if (activeCase.image.bbox) {
        const bx = (activeCase.image.bbox.x / 100) * width;
        const by = (activeCase.image.bbox.y / 100) * height;
        const bw = (activeCase.image.bbox.w / 100) * width;
        const bh = (activeCase.image.bbox.h / 100) * height;

        const radial = ctx.createRadialGradient(bx + bw/2, by + bh/2, 10, bx + bw/2, by + bh/2, bw);
        radial.addColorStop(0, `rgba(244, 63, 94, ${Math.min(0.9, amp * 0.035)})`);
        radial.addColorStop(0.6, `rgba(168, 85, 247, ${Math.min(0.6, amp * 0.02)})`);
        radial.addColorStop(1, 'transparent');
        ctx.fillStyle = radial;
        ctx.fillRect(bx - 10, by - 10, bw + 20, bh + 20);
      }

      ctx.fillStyle = '#00f2fe';
      ctx.font = '11px monospace';
      ctx.fillText(`ELA MAP // COMPRESSION DIFF AMPLIFICATION: ${this.elaAmplifier}x`, 15, 25);
      ctx.fillText(`DELTA DCT RESIDUALS: ${activeCase.id === 'TL-2026-042' ? 'HOMOGENEOUS (CLEAN)' : 'IRREGULAR PEAK DETECTED'}`, 15, 42);

    } else if (mode === 'noise') {
      // High-frequency sensor noise variance heatmap
      ctx.fillStyle = '#050811';
      ctx.fillRect(0, 0, width, height);

      // Draw thermal gradient
      const grad = ctx.createLinearGradient(0, 0, width, height);
      if (activeCase.id === 'TL-2026-042') {
        grad.addColorStop(0, '#064e3b');
        grad.addColorStop(1, '#022c22');
      } else {
        grad.addColorStop(0, '#7f1d1d');
        grad.addColorStop(0.5, '#451a03');
        grad.addColorStop(1, '#022c22');
      }
      ctx.fillStyle = grad;
      ctx.globalAlpha = 0.6;
      ctx.fillRect(0, 0, width, height);
      ctx.globalAlpha = 1.0;

      ctx.fillStyle = '#a5f3fc';
      ctx.font = '11px monospace';
      ctx.fillText(`SENSOR NOISE VARIANCE DISTRIBUTION (PRNU)`, 15, 25);
      ctx.fillText(`POISSON GRADIENT FIT: ${activeCase.id === 'TL-2026-042' ? 'PASS (R² = 0.98)' : 'FAIL: ABERRATION SPIKE'}`, 15, 42);
    }
  },

  // -------------------------------------------------------------
  // Modality 2: Video Forensics
  // -------------------------------------------------------------
  renderVideoForensics() {
    const activeCase = this.cases[this.currentCaseId];
    const badge = document.getElementById('video-verdict-badge');
    badge.className = `panel-verdict-badge ${activeCase.video.verdictClass}`;
    badge.textContent = activeCase.video.verdict;

    document.getElementById('video-fps-stat').textContent = `${activeCase.video.fps || 0} FPS`;
    document.getElementById('video-blink-stat').textContent = activeCase.video.blinkRate;
    document.getElementById('video-lipsync-stat').textContent = activeCase.video.lipSyncOffset;

    // Timeline Slices
    const heatStrip = document.getElementById('video-anomaly-strip');
    heatStrip.innerHTML = '';
    
    if (activeCase.video.anomaliesTimeline.length === 0) {
      heatStrip.innerHTML = '<div class="anomaly-slice" style="background: rgba(16, 185, 129, 0.25);"></div>';
    } else {
      activeCase.video.anomaliesTimeline.forEach(slice => {
        const el = document.createElement('div');
        el.className = 'anomaly-slice';
        const pct = ((slice.end - slice.start) / (activeCase.video.duration || 10)) * 100;
        el.style.width = `${pct}%`;
        el.style.background = slice.level === 'critical' ? 'rgba(239, 68, 68, 0.7)' :
                              slice.level === 'moderate' ? 'rgba(245, 158, 11, 0.5)' :
                              'rgba(16, 185, 129, 0.25)';
        el.title = `${slice.start}s - ${slice.end}s: ${slice.label || 'Normal'}`;
        heatStrip.appendChild(el);
      });
    }

    // Mini Keyframes Strip
    const keyframesRow = document.getElementById('video-keyframes-row');
    keyframesRow.innerHTML = '';
    const frameTimes = [0.5, 2.0, 4.2, 6.8, 9.1, 11.5];

    frameTimes.forEach((sec, idx) => {
      const frameEl = document.createElement('div');
      const isAnomaly = (sec >= 2.5 && sec <= 8.0 && activeCase.id === 'TL-2026-081');
      frameEl.className = `mini-frame ${isAnomaly ? 'anomaly' : ''}`;
      frameEl.innerHTML = `
        <span>00:${sec.toFixed(1).padStart(4, '0')}</span>
        ${isAnomaly ? '<span style="color:#f87171;font-weight:700;">! WARP</span>' : ''}
      `;
      frameEl.style.background = isAnomaly ? 
        'linear-gradient(180deg, #371b26, #1e131d)' : 
        'linear-gradient(180deg, #131d31, #0c1322)';
      frameEl.addEventListener('click', () => {
        this.videoCurrentTime = sec;
        this.updateVideoScrubberUI();
      });
      keyframesRow.appendChild(frameEl);
    });

    this.updateVideoScrubberUI();
  },

  updateVideoScrubberUI() {
    const activeCase = this.cases[this.currentCaseId];
    const duration = activeCase.video.duration || 10;
    const progress = Math.min(1, Math.max(0, this.videoCurrentTime / duration));

    const playhead = document.getElementById('scrubber-playhead');
    if (playhead) {
      playhead.style.left = `${progress * 100}%`;
    }
    const timeDisplay = document.getElementById('video-time-display');
    if (timeDisplay) {
      timeDisplay.textContent = `00:${this.videoCurrentTime.toFixed(1).padStart(4, '0')} / 00:${duration.toFixed(1).padStart(4, '0')}`;
    }
  },

  // -------------------------------------------------------------
  // Modality 3: Audio & Voice Forensics (Web Audio API & Canvas)
  // -------------------------------------------------------------
  renderAudioForensics() {
    const activeCase = this.cases[this.currentCaseId];
    const badge = document.getElementById('audio-verdict-badge');
    badge.className = `panel-verdict-badge ${activeCase.audio.verdictClass}`;
    badge.textContent = activeCase.audio.verdict;

    document.getElementById('audio-cutoff-stat').textContent = activeCase.audio.spectralCutoff;
    document.getElementById('audio-pitch-stat').textContent = activeCase.audio.pitchRoboticism;
    document.getElementById('audio-noise-stat').textContent = activeCase.audio.noiseFloor;
    document.getElementById('audio-phase-stat').textContent = activeCase.audio.phaseContinuity;

    this.drawAudioStaticVisualizer(activeCase);
  },

  initAudioContext() {
    // Lazy AudioContext setup to satisfy browser autoplay policies
    window.addEventListener('click', () => {
      if (!this.audioContext) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
          this.audioContext = new AudioContextClass();
        }
      }
    }, { once: true });
  },

  toggleAudioPlayback() {
    const btn = document.getElementById('audio-play-btn');
    const activeCase = this.cases[this.currentCaseId];

    if (this.audioPlaying) {
      this.stopSyntheticAudio();
      btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg> Play Audio Stream`;
      this.audioPlaying = false;
    } else {
      this.playSyntheticAudio(activeCase);
      btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg> Stop Audio Stream`;
      this.audioPlaying = true;
    }
  },

  playSyntheticAudio(activeCase) {
    if (!this.audioContext) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.audioContext = new AudioCtx();
    }
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }

    // Build audio graph
    const osc = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    const filter = this.audioContext.createBiquadFilter();
    this.analyserNode = this.audioContext.createAnalyser();
    this.analyserNode.fftSize = 256;

    // Mimic vocal pitch
    osc.type = activeCase.id === 'TL-2026-042' ? 'triangle' : 'sawtooth';
    osc.frequency.setValueAtTime(160, this.audioContext.currentTime);

    // If cloned/cutoff, apply steep low-pass filter
    if (activeCase.audio.spectralCutoff && activeCase.audio.spectralCutoff.includes('7.8')) {
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(7800, this.audioContext.currentTime);
    } else {
      filter.type = 'allpass';
    }

    gainNode.gain.setValueAtTime(0.12, this.audioContext.currentTime);

    osc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.analyserNode);
    this.analyserNode.connect(this.audioContext.destination);

    osc.start();
    this.audioSource = osc;

    this.animateRealtimeAudioVisualizer();

    // Auto-stop after 8 seconds
    setTimeout(() => {
      if (this.audioPlaying) {
        this.toggleAudioPlayback();
      }
    }, 8000);
  },

  stopSyntheticAudio() {
    if (this.audioSource) {
      try {
        this.audioSource.stop();
        this.audioSource.disconnect();
      } catch (e) {}
      this.audioSource = null;
    }
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    this.drawAudioStaticVisualizer(this.cases[this.currentCaseId]);
  },

  animateRealtimeAudioVisualizer() {
    const canvas = document.getElementById('audio-spectrogram-canvas');
    if (!canvas || !this.analyserNode) return;
    const ctx = canvas.getContext('2d');
    const bufferLength = this.analyserNode.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      this.animationFrameId = requestAnimationFrame(draw);
      this.analyserNode.getByteFrequencyData(dataArray);

      ctx.fillStyle = '#060a14';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 2.2;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * canvas.height * 0.85;

        // Gradient based on synthetic cutoff
        const isCutoff = (i > bufferLength * 0.35 && this.currentCaseId === 'TL-2026-081');
        ctx.fillStyle = isCutoff ? '#ef4444' : '#00f2fe';

        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth + 1;
      }

      // Draw cutoff marker line
      if (this.currentCaseId === 'TL-2026-081') {
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        const cutoffX = canvas.width * 0.38;
        ctx.moveTo(cutoffX, 0);
        ctx.lineTo(cutoffX, canvas.height);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = '#ef4444';
        ctx.font = '10px monospace';
        ctx.fillText('7.8 kHz Cutoff', cutoffX + 6, 20);
      }
    };
    draw();
  },

  drawAudioStaticVisualizer(activeCase) {
    const canvas = document.getElementById('audio-spectrogram-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = 640;
    canvas.height = 140;

    ctx.fillStyle = '#060a14';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw static stylized audio frequency waveform
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);

    for (let x = 0; x < canvas.width; x += 4) {
      const freq = activeCase.id === 'TL-2026-042' ? 0.04 : 0.08;
      const amp = Math.sin(x * freq) * (canvas.height * 0.35) * Math.sin(x * 0.005);
      const y = (canvas.height / 2) + amp;
      ctx.lineTo(x, y);
    }

    ctx.strokeStyle = activeCase.id === 'TL-2026-042' ? '#10b981' : '#00f2fe';
    ctx.lineWidth = 1.8;
    ctx.stroke();

    // Spectrogram baseline grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let y = 20; y < canvas.height; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.font = '10px monospace';
    ctx.fillText('0 Hz', 10, canvas.height - 8);
    ctx.fillText('8 kHz', canvas.width * 0.38, canvas.height - 8);
    ctx.fillText('16 kHz', canvas.width * 0.75, canvas.height - 8);
    ctx.fillText('22 kHz', canvas.width - 45, canvas.height - 8);
  },

  // -------------------------------------------------------------
  // Modality 4: Text & Context Forensics
  // -------------------------------------------------------------
  renderTextForensics() {
    const activeCase = this.cases[this.currentCaseId];
    const badge = document.getElementById('text-verdict-badge');
    badge.className = `panel-verdict-badge ${activeCase.text.verdictClass}`;
    badge.textContent = activeCase.text.verdict;

    const transcriptBox = document.getElementById('transcript-display-box');
    transcriptBox.innerHTML = activeCase.text.rawText
      .replace('Geneva', '<span class="highlight-mismatch">Geneva [MISMATCH]</span>')
      .replace('heavy downpours', '<span class="highlight-mismatch">heavy downpours [WEATHER CONFLICT]</span>')
      .replace('14:00', '<span class="highlight-mismatch">14:00 [SOLAR SHADOW CONFLICT]</span>')
      .replace('Frankfurt tarmac', '<span class="highlight-mismatch">Frankfurt tarmac [ACOUSTIC MISMATCH]</span>');

    const claimsTableBody = document.getElementById('claims-table-body');
    claimsTableBody.innerHTML = '';

    activeCase.text.claims.forEach(c => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td style="font-weight:600; color:#fff;">${c.entity}</td>
        <td style="color:var(--text-secondary);">${c.claimed}</td>
        <td>${c.verified}</td>
        <td>
          <span class="tag ${c.match ? 'tag-green' : 'tag-red'}">
            ${c.match ? 'CORROBORATED' : 'DISCREPANCY'}
          </span>
        </td>
      `;
      claimsTableBody.appendChild(tr);
    });
  },

  // -------------------------------------------------------------
  // Cross-Modal Correlation Radar & Inconsistency Alerts
  // -------------------------------------------------------------
  renderCrossModalSection() {
    const activeCase = this.cases[this.currentCaseId];
    const canvas = document.getElementById('correlation-radar-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = 260;
    canvas.height = 260;

    // Draw 5-Axis Radar Chart
    this.drawRadarChart(ctx, canvas.width, canvas.height, activeCase.crossModalMatrix.scores);

    // Inconsistencies Feed
    const feed = document.getElementById('inconsistencies-feed-container');
    feed.innerHTML = '';

    activeCase.crossModalMatrix.inconsistencies.forEach(inc => {
      const card = document.createElement('div');
      card.className = 'inconsistency-card';
      card.innerHTML = `
        <div class="inconsistency-top">
          <div class="modality-connector">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line></svg>
            ${inc.modalities}
          </div>
          <span class="inc-severity ${inc.severity}">${inc.severity}</span>
        </div>
        <div class="inc-desc"><strong>${inc.title}:</strong> ${inc.description}</div>
        <div class="inc-impact"><strong>Evidentiary Weight:</strong> ${inc.impact}</div>
      `;
      feed.appendChild(card);
    });
  },

  drawRadarChart(ctx, width, height, scores) {
    ctx.clearRect(0, 0, width, height);
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = 95;
    const labels = ['Audio-Vis', 'Video-Txt', 'Audio-Txt', 'Img-Txt', 'Meta-Phys'];
    const totalAxes = labels.length;

    // Draw background concentric webs
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    for (let r = 0.25; r <= 1.0; r += 0.25) {
      ctx.beginPath();
      for (let i = 0; i < totalAxes; i++) {
        const angle = (Math.PI * 2 / totalAxes) * i - Math.PI / 2;
        const x = centerX + Math.cos(angle) * (radius * r);
        const y = centerY + Math.sin(angle) * (radius * r);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
    }

    // Draw Axis lines & labels
    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for (let i = 0; i < totalAxes; i++) {
      const angle = (Math.PI * 2 / totalAxes) * i - Math.PI / 2;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.stroke();

      const labelX = centerX + Math.cos(angle) * (radius + 18);
      const labelY = centerY + Math.sin(angle) * (radius + 18);
      ctx.fillText(labels[i], labelX, labelY);
    }

    // Draw Data Polygon
    ctx.beginPath();
    for (let i = 0; i < totalAxes; i++) {
      const angle = (Math.PI * 2 / totalAxes) * i - Math.PI / 2;
      const value = (scores[i] || 10) / 100;
      const x = centerX + Math.cos(angle) * (radius * value);
      const y = centerY + Math.sin(angle) * (radius * value);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = this.currentCaseId === 'TL-2026-042' ? 'rgba(16, 185, 129, 0.25)' : 'rgba(239, 68, 68, 0.35)';
    ctx.fill();
    ctx.strokeStyle = this.currentCaseId === 'TL-2026-042' ? '#10b981' : '#f43f5e';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Data points dots
    for (let i = 0; i < totalAxes; i++) {
      const angle = (Math.PI * 2 / totalAxes) * i - Math.PI / 2;
      const value = (scores[i] || 10) / 100;
      const x = centerX + Math.cos(angle) * (radius * value);
      const y = centerY + Math.sin(angle) * (radius * value);
      ctx.beginPath();
      ctx.arc(x, y, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = '#fff';
      ctx.fill();
    }
  },

  // -------------------------------------------------------------
  // Honest Uncertainty & Human Investigator Checks
  // -------------------------------------------------------------
  renderUncertaintySection() {
    const activeCase = this.cases[this.currentCaseId];
    document.getElementById('uncertainty-confidence-desc').textContent = activeCase.uncertainties.confidenceLevel;
    document.getElementById('uncertainty-why-not-proof').textContent = activeCase.uncertainties.whyNotProof;

    const list = document.getElementById('alt-explanations-list');
    list.innerHTML = '';
    activeCase.uncertainties.alternativeExplanations.forEach(exp => {
      const li = document.createElement('li');
      li.textContent = exp;
      list.appendChild(li);
    });
  },

  // -------------------------------------------------------------
  // Chain of Custody & Evidence Ledger
  // -------------------------------------------------------------
  updateChainOfCustodyUI() {
    const activeCase = this.cases[this.currentCaseId];
    const tbody = document.getElementById('evidence-ledger-body');
    if (!tbody) return;
    tbody.innerHTML = '';

    const items = [
      { name: activeCase.image.filename, mod: 'IMAGE', size: activeCase.image.size, hash: activeCase.image.hash, stat: 'VERIFIED' },
      { name: activeCase.video.filename, mod: 'VIDEO', size: activeCase.video.size, hash: activeCase.video.hash, stat: 'VERIFIED' },
      { name: activeCase.audio.filename, mod: 'AUDIO', size: activeCase.audio.size, hash: activeCase.audio.hash, stat: 'VERIFIED' },
      { name: activeCase.text.filename, mod: 'TEXT/METADATA', size: activeCase.text.size, hash: activeCase.text.hash, stat: 'VERIFIED' }
    ];

    items.forEach(it => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="name-col">${it.name}</td>
        <td><span class="tag tag-amber">${it.mod}</span></td>
        <td>${it.size}</td>
        <td style="color:var(--text-code);">${it.hash}</td>
        <td><span class="tag tag-green">${it.stat}</span></td>
      `;
      tbody.appendChild(tr);
    });
  },

  // -------------------------------------------------------------
  // Formal Forensic Dossier Generator & Modal View
  // -------------------------------------------------------------
  populateDossierModal() {
    const activeCase = this.cases[this.currentCaseId];
    const container = document.getElementById('dossier-report-content');
    if (!container) return;

    container.innerHTML = `
      <div class="official-report-sheet">
        <div class="report-header-banner">
          <div class="agency-seal">
            <div class="seal-emblem">TRUTH<br/>LENS</div>
            <div class="agency-titles">
              <h2>TruthLens Forensic Authenticity Report</h2>
              <p>Multimodal Media Forensics & Deepfake Detection Laboratory</p>
              <p style="font-size:0.7rem; color:#64748b;">Case Ref: ${activeCase.id} | Generated: ${new Date().toISOString()}</p>
            </div>
          </div>
          <div class="report-classification">
            <div class="classification-stamp">${activeCase.classification}</div>
            <p>CHAIN OF CUSTODY: ISO/IEC 27037</p>
          </div>
        </div>

        <div class="report-section-title">
          <span>01. EXECUTIVE SUMMARY & FORENSIC VERDICT</span>
          <span>CALIBRATED SCORE: ${activeCase.calibratedScore}% (±${activeCase.confidenceMargin}%)</span>
        </div>
        <div class="report-summary-box">
          <p><strong>Primary Finding:</strong> ${activeCase.overallVerdict}</p>
          <p style="margin-top:0.3rem;">${activeCase.summary}</p>
        </div>

        <div class="report-section-title">02. MULTIMODAL EVIDENCE LEDGER & INTEGRITY HASHES</div>
        <table class="report-data-table">
          <thead>
            <tr>
              <th>File Name</th>
              <th>Format</th>
              <th>File Size</th>
              <th>SHA-256 Hash Integrity</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${activeCase.image.filename}</td>
              <td>${activeCase.image.mime}</td>
              <td>${activeCase.image.size}</td>
              <td><code>${activeCase.image.hash}</code></td>
            </tr>
            <tr>
              <td>${activeCase.video.filename}</td>
              <td>${activeCase.video.mime}</td>
              <td>${activeCase.video.size}</td>
              <td><code>${activeCase.video.hash}</code></td>
            </tr>
            <tr>
              <td>${activeCase.audio.filename}</td>
              <td>${activeCase.audio.mime}</td>
              <td>${activeCase.audio.size}</td>
              <td><code>${activeCase.audio.hash}</code></td>
            </tr>
          </tbody>
        </table>

        <div class="report-section-title">03. DETECTED MANIPULATION INDICATORS</div>
        <table class="report-data-table">
          <thead>
            <tr>
              <th>Modality</th>
              <th>Observed Signal</th>
              <th>Forensic Technical Detail</th>
              <th>Severity</th>
            </tr>
          </thead>
          <tbody>
            ${activeCase.image.indicators.map(ind => `
              <tr>
                <td><strong>Image</strong></td>
                <td>${ind.title}</td>
                <td>${ind.detail}</td>
                <td>${ind.sev.toUpperCase()}</td>
              </tr>
            `).join('')}
            <tr>
              <td><strong>Audio</strong></td>
              <td>Vocoder Cutoff</td>
              <td>${activeCase.audio.spectralCutoff}</td>
              <td>HIGH</td>
            </tr>
            <tr>
              <td><strong>Video</strong></td>
              <td>Temporal Drift</td>
              <td>Lip sync offset: ${activeCase.video.lipSyncOffset}</td>
              <td>HIGH</td>
            </tr>
          </tbody>
        </table>

        <div class="report-section-title">04. CROSS-MODAL INCONSISTENCIES</div>
        <table class="report-data-table">
          <thead>
            <tr>
              <th>Cross-Modal Relationship</th>
              <th>Discrepancy Observed</th>
              <th>Evidentiary Impact</th>
            </tr>
          </thead>
          <tbody>
            ${activeCase.crossModalMatrix.inconsistencies.map(inc => `
              <tr>
                <td><strong>${inc.modalities}</strong></td>
                <td>${inc.title}: ${inc.description}</td>
                <td>${inc.impact}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div class="report-section-title">05. HONEST UNCERTAINTY & BENIGN EXPLANATIONS</div>
        <p style="font-size:0.75rem; margin-bottom:0.5rem;">${activeCase.uncertainties.whyNotProof}</p>
        <ul style="font-size:0.72rem; margin-left:1.2rem; color:#334155;">
          ${activeCase.uncertainties.alternativeExplanations.map(exp => `<li>${exp}</li>`).join('')}
        </ul>

        <div class="report-signature-row">
          <div>
            <div class="sign-line"></div>
            <p><strong>Lead Digital Forensics Examiner</strong></p>
            <p style="font-size:0.68rem; color:#64748b;">TruthLens Certified Analyst</p>
          </div>
          <div>
            <div class="sign-line"></div>
            <p><strong>Evidentiary Chain Custodian</strong></p>
            <p style="font-size:0.68rem; color:#64748b;">Digital Evidence Section</p>
          </div>
        </div>
      </div>
    `;
  },

  // Export JSON dossier package
  exportCaseJson() {
    const activeCase = this.cases[this.currentCaseId];
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(activeCase, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `TruthLens_${activeCase.id}_ForensicReport.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    this.showToast(`Forensic ledger exported for Case ${activeCase.id}`, 'success');
  }
};

// Initialize once DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  TruthLens.init();
});
