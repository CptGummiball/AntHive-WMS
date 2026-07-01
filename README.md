# AntHive WMS – Eigenständige Projektdokumentation

Statische, in sich geschlossene Dokumentation (HTML/CSS/SVG/JS) **ohne** technische
Abhängigkeit zum Projekt. Es gibt keinen Build-Schritt und keine Netzwerk-Aufrufe.

## Öffnen

`docs-site/index.html` im Browser öffnen (Doppelklick / „Datei öffnen"). Funktioniert
vollständig offline über `file://`.

## Aufbau

| Datei | Bereich |
|---|---|
| `index.html` | Übersicht (Architektur, Zielgruppen, Prozesse, Module) |
| `developer.html` | Entwicklerdokumentation |
| `admin-wms.html` | Administration WMS (Plattform) |
| `admin-tenant.html` | Administration WMS für Mandanten |
| `operator.html` | Operative WMS-Anwender |
| `assets/style.css` | Layout & Design |
| `assets/app.js` | Navigation, aktive-Abschnitt-Hervorhebung, Filter, Mobile-Toggle |
| `assets/img/*.svg` | Diagramme (Architektur, Prozess, Umlagerungsregel, Rollen) + Logo |

## Offene Punkte

Noch offene/teiloffene Themen sind an der passenden Stelle mit
`[OFFEN: … – siehe TODO.md #TODO-XX]` markiert und zentral in `../TODO.md` geführt.
