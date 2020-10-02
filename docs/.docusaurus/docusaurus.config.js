export default {
  "title": "Colors convert",
  "tagline": "A simple color library",
  "url": "https://github.com/ilariaventurini/colors-convert",
  "baseUrl": "/",
  "onBrokenLinks": "throw",
  "favicon": "img/favicon.ico",
  "organizationName": "ilariaventurini",
  "projectName": "colors-convert",
  "themeConfig": {
    "navbar": {
      "title": "Colors convert",
      "logo": {
        "alt": "Color convert logo",
        "src": "img/logo.svg"
      },
      "items": [
        {
          "to": "docs/documentation",
          "activeBasePath": "docs",
          "label": "Documentation",
          "position": "left"
        },
        {
          "to": "docs/api",
          "activeBasePath": "docs",
          "label": "API",
          "position": "left"
        },
        {
          "href": "https://github.com/ilariaventurini/colors-convert",
          "label": "GitHub",
          "position": "right"
        }
      ],
      "hideOnScroll": false
    },
    "footer": {
      "style": "dark",
      "links": [
        {
          "title": "Docs",
          "items": [
            {
              "label": "Style Guide",
              "to": "docs/"
            },
            {
              "label": "Second Doc",
              "to": "docs/doc2/"
            }
          ]
        },
        {
          "title": "Community",
          "items": [
            {
              "label": "Stack Overflow",
              "href": "https://stackoverflow.com/questions/tagged/docusaurus"
            },
            {
              "label": "Discord",
              "href": "https://discordapp.com/invite/docusaurus"
            },
            {
              "label": "Twitter",
              "href": "https://twitter.com/docusaurus"
            }
          ]
        },
        {
          "title": "More",
          "items": [
            {
              "label": "GitHub",
              "href": "https://github.com/ilariaventurini/colors-convert"
            }
          ]
        }
      ],
      "copyright": "Copyright © 2020 Ilaria Venturini, Inc. Built with Docusaurus."
    },
    "colorMode": {
      "defaultMode": "light",
      "disableSwitch": false,
      "respectPrefersColorScheme": false,
      "switchConfig": {
        "darkIcon": "🌜",
        "darkIconStyle": {},
        "lightIcon": "🌞",
        "lightIconStyle": {}
      }
    },
    "metadatas": []
  },
  "presets": [
    [
      "@docusaurus/preset-classic",
      {
        "docs": {
          "sidebarPath": "/Users/ilariaventurini/accurat/colors-convert/docs/sidebars.js",
          "editUrl": "https://github.com/ilariaventurini/colors-convert/"
        },
        "theme": {
          "customCss": "/Users/ilariaventurini/accurat/colors-convert/docs/src/css/custom.css"
        }
      }
    ]
  ],
  "onDuplicateRoutes": "warn",
  "customFields": {},
  "plugins": [],
  "themes": [],
  "titleDelimiter": "|"
};