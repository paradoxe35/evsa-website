export const CMS_API_URL = `http://localhost:8005/`;

export const APP_NAME = "Evsa";

export const default_info = {
  address: "Goma avenue",
  phone: "+243858157555",
  email: "evasecu1@gmail.com",
  company_message: `EVSA est passionnée par des services de qualité rendus avec professionnalisme dans une
    conscience pure et dans une sportivité inégalable. Le travail assure l’indépendance et
    humanise.`,
  golocalisation_lat: -1.6954647515191685,
  golocalisation_lng: 29.240077339681175,
  facebook_link: "#",
  twitter_link: "#",
  background_image: null,
};

export const HEADING = {
  service: {
    h3: "Nous",
    h2: "Nous fournissons des services",
  },
  security: {
    h3: "SÉCURITÉ",
    h2: "NOS GARDES",
  },
};

export const menus = [
  {
    name: "Acceuil",
    link: "/",
    active: true,
  },
  {
    name: "A propos",
    link: "/about",
  },
  {
    name: "Services",
    link: "/service",
  },
  {
    name: "Blog",
    link: "/blog",
  },
  {
    name: "Contact",
    link: "/contact",
  },
];

export const IMAGE_PRESETS = {
  sliders: "sliders",
  systemLargeContain: "system-large-contain",
};

export const CMS_MODELS = {
  sliders: "sliders",
  welcomeDetails: "Welcome_details",
  services: "Services",
  guards: "guards",
  story: "story",
  information: "information",
  messages: "messages",
};
