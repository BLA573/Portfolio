const defaultConfig = {
  hero_tagline: 'Cybersecurity student — practical tools, real results.',
  hero_summary: 'I build security tools, scan networks, and learn by doing.',
  about_text: 'Self-taught in Linux, networking, Python, and cybersecurity fundamentals. Currently deep into CompTIA Security+ prep and building practical tools to solidify concepts. I believe in learning by breaking things (responsibly) and documenting the journey.',
  contact_email: 'hailemichaelsolomon176@gmail.com',
  background_color: '#0d1117',
  surface_color: '#0f1419',
  text_color: '#e8f5e9',
  accent_color: '#2ec158',
  secondary_text_color: '#a8d5ba',
  font_family: 'Inter',
  font_size: 16
};

const dom = {
  root: document.documentElement,
  body: document.body,
  themeToggle: document.getElementById('theme-toggle'),
  themeIconDark: document.getElementById('theme-icon-dark'),
  themeIconLight: document.getElementById('theme-icon-light'),
  year: document.getElementById('year'),
  heroTagline: document.getElementById('hero-tagline'),
  heroSummary: document.getElementById('hero-summary'),
  aboutText: document.getElementById('about-text'),
  contactEmailDisplay: document.getElementById('contact-email-display'),
  contactEmailLink: document.querySelector('a[href^="mailto:"]'),
  contactForm: document.getElementById('contact-form'),
  formStatus: document.getElementById('form-status'),
  certModal: document.getElementById('cert-modal'),
  modalTitle: document.getElementById('modal-title'),
  modalDate: document.getElementById('modal-date'),
  modalDesc: document.getElementById('modal-desc'),
  toast: document.getElementById('toast')
};

const contentBindings = [
  ['heroTagline', 'hero_tagline'],
  ['heroSummary', 'hero_summary'],
  ['aboutText', 'about_text'],
  ['contactEmailDisplay', 'contact_email']
];

let config = { ...defaultConfig };
let isLightMode = false;
let toastTimeoutId;

function getConfigValue(key) {
  return config[key] ?? defaultConfig[key];
}

function setTextContent(element, value) {
  if (element) {
    element.textContent = value;
  }
}

function applyTextContent() {
  contentBindings.forEach(([elementKey, configKey]) => {
    setTextContent(dom[elementKey], getConfigValue(configKey));
  });

  if (dom.contactEmailLink) {
    dom.contactEmailLink.href = `mailto:${getConfigValue('contact_email')}`;
  }
}

function applyThemeColors() {
  if (isLightMode) {
    dom.root.style.removeProperty('--bg-primary');
    dom.root.style.removeProperty('--bg-secondary');
    dom.root.style.removeProperty('--text-primary');
    dom.root.style.removeProperty('--text-secondary');
    dom.root.style.removeProperty('--accent');
    return;
  }

  dom.root.style.setProperty('--bg-primary', getConfigValue('background_color'));
  dom.root.style.setProperty('--bg-secondary', getConfigValue('surface_color'));
  dom.root.style.setProperty('--text-primary', getConfigValue('text_color'));
  dom.root.style.setProperty('--text-secondary', getConfigValue('secondary_text_color'));
  dom.root.style.setProperty('--accent', getConfigValue('accent_color'));
}

function applyTypography() {
  dom.body.style.fontFamily = `'${getConfigValue('font_family')}', 'Inter', sans-serif`;
  dom.body.style.fontSize = `${getConfigValue('font_size')}px`;
}

function updateThemeIcons() {
  dom.themeIconDark?.classList.toggle('hidden', isLightMode);
  dom.themeIconLight?.classList.toggle('hidden', !isLightMode);
}

function applyConfig() {
  applyTextContent();
  applyThemeColors();
  applyTypography();
}

function setModalVisibility(isVisible) {
  dom.certModal?.classList.toggle('hidden', !isVisible);
  dom.certModal?.classList.toggle('flex', isVisible);
}

function openCertModal(title, date, desc) {
  setTextContent(dom.modalTitle, title);
  setTextContent(dom.modalDate, date);
  setTextContent(dom.modalDesc, desc);
  setModalVisibility(true);
}

function closeCertModal() {
  setModalVisibility(false);
}

function showToast(message) {
  if (!dom.toast) {
    return;
  }

  dom.toast.textContent = message;
  dom.toast.classList.remove('hidden');

  window.clearTimeout(toastTimeoutId);
  toastTimeoutId = window.setTimeout(() => {
    dom.toast.classList.add('hidden');
  }, 3000);
}

function toggleTheme() {
  isLightMode = !isLightMode;
  dom.root.classList.toggle('light-mode', isLightMode);
  updateThemeIcons();
  applyThemeColors();
}

function handleAction(action) {
  const actions = {
    'show-demo': () => showToast('Demo runs locally — clone the repo to try it!'),
    'download-resume': () => showToast('Resume download started! (Demo)'),
    'close-cert-modal': closeCertModal
  };

  actions[action]?.();
}

function handleDocumentClick(event) {
  const actionTarget = event.target.closest('[data-action]');
  if (actionTarget) {
    handleAction(actionTarget.dataset.action);
    return;
  }

  const certificateTrigger = event.target.closest('.cert-trigger');
  if (certificateTrigger) {
    const { modalTitle, modalDate, modalDesc } = certificateTrigger.dataset;
    openCertModal(modalTitle, modalDate, modalDesc);
  }
}

function handleContactSubmit(event) {
  event.preventDefault();

  if (!dom.formStatus) {
    return;
  }

  dom.formStatus.textContent = 'Message sent! (Demo — connect a backend for real submissions)';
  dom.formStatus.classList.remove('hidden');
  dom.formStatus.classList.add('text-accent');

  event.target.reset();

  window.setTimeout(() => {
    dom.formStatus.classList.add('hidden');
  }, 4000);
}

function handleKeydown(event) {
  if (event.key === 'Escape' && dom.certModal && !dom.certModal.classList.contains('hidden')) {
    closeCertModal();
  }
}

function initializeElementSdk() {
  if (!window.elementSdk) {
    return;
  }

  window.elementSdk.init({
    defaultConfig,
    onConfigChange: async (newConfig) => {
      config = { ...defaultConfig, ...newConfig };
      applyConfig();
    },
    mapToCapabilities: (sdkConfig) => ({
      recolorables: [
        {
          get: () => sdkConfig.background_color || defaultConfig.background_color,
          set: (value) => {
            sdkConfig.background_color = value;
            window.elementSdk.setConfig({ background_color: value });
          }
        },
        {
          get: () => sdkConfig.surface_color || defaultConfig.surface_color,
          set: (value) => {
            sdkConfig.surface_color = value;
            window.elementSdk.setConfig({ surface_color: value });
          }
        },
        {
          get: () => sdkConfig.text_color || defaultConfig.text_color,
          set: (value) => {
            sdkConfig.text_color = value;
            window.elementSdk.setConfig({ text_color: value });
          }
        },
        {
          get: () => sdkConfig.accent_color || defaultConfig.accent_color,
          set: (value) => {
            sdkConfig.accent_color = value;
            window.elementSdk.setConfig({ accent_color: value });
          }
        },
        {
          get: () => sdkConfig.secondary_text_color || defaultConfig.secondary_text_color,
          set: (value) => {
            sdkConfig.secondary_text_color = value;
            window.elementSdk.setConfig({ secondary_text_color: value });
          }
        }
      ],
      borderables: [],
      fontEditable: {
        get: () => sdkConfig.font_family || defaultConfig.font_family,
        set: (value) => {
          sdkConfig.font_family = value;
          window.elementSdk.setConfig({ font_family: value });
        }
      },
      fontSizeable: {
        get: () => sdkConfig.font_size || defaultConfig.font_size,
        set: (value) => {
          sdkConfig.font_size = value;
          window.elementSdk.setConfig({ font_size: value });
        }
      }
    }),
    mapToEditPanelValues: (sdkConfig) => new Map([
      ['hero_tagline', sdkConfig.hero_tagline || defaultConfig.hero_tagline],
      ['hero_summary', sdkConfig.hero_summary || defaultConfig.hero_summary],
      ['about_text', sdkConfig.about_text || defaultConfig.about_text],
      ['contact_email', sdkConfig.contact_email || defaultConfig.contact_email]
    ])
  });
}

function initializePage() {
  setTextContent(dom.year, new Date().getFullYear());
  updateThemeIcons();
  applyConfig();
  initializeElementSdk();

  dom.themeToggle?.addEventListener('click', toggleTheme);
  dom.contactForm?.addEventListener('submit', handleContactSubmit);
  document.addEventListener('click', handleDocumentClick);
  document.addEventListener('keydown', handleKeydown);
}

initializePage();
