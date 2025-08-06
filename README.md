# 🌟 KauryUI Form Builder

> ✨ Créez des formulaires professionnels, interactifs et responsives — sans écrire une seule ligne de code.

[![KauryUI](https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop)](https://www.kauryui.org/)

🔗 **Site officiel** : [www.kauryui.org](https://www.kauryui.org)  
💸 **Soutenir le projet** : [Faire un don](https://buy.stripe.com/5kAaIo03wgAb2S4aEW)

---

## 🧩 Qu'est-ce que KauryUI ?

**KauryUI Form Builder** est un constructeur de formulaires visuel pour React. Il s’adresse aux développeurs qui veulent gagner du temps tout en gardant le contrôle sur leur code.

- ✅ **Open source & gratuit**
- 🖱️ **Drag & drop fluide**
- 📤 **Export multiformats (JSX, Vue, HTML, JSON)**
- 🎨 **Thèmes & animations modernes**
- 🔌 **Connexion Supabase intégrée**

---

## ⚙️ Fonctionnalités clés

- 20+ composants de formulaire
- Interface glisser-déposer intuitive
- Thèmes personnalisables (light, dark, glass, etc.)
- Aperçu responsive pour mobile/tablette
- Création de formulaires multi-étapes
- 16 animations disponibles
- Raccourcis clavier
- Sauvegarde automatique locale
- Vérificateur d’accessibilité WCAG
- Connexion Supabase pour stocker les soumissions

---

## 🛠️ Stack technique

| Tech            | Usage                         |
|-----------------|-------------------------------|
| React 18        | Base du projet                |
| Vite            | Serveur de développement      |
| TypeScript      | Typage complet                |
| Tailwind CSS    | Stylisation rapide            |
| Zustand         | State management léger        |
| Framer Motion   | Animations fluides            |
| React DnD       | Drag & drop                   |
| i18next         | Multi-langue                  |
| Three.js        | Prêt pour effets 3D à venir   |

---

## 🚀 Installation rapide

```bash
git clone https://github.com/theoblondel/KauryUI.git
cd KauryUI
npm install
npm run dev
```

Puis va sur [http://localhost:5173](http://localhost:5173) dans ton navigateur.

---

## ✨ Utilisation

1. **Ajoutez des composants** depuis la bibliothèque
2. **Personnalisez-les** (textes, styles, validations, animations)
3. **Créez plusieurs étapes** de formulaire facilement
4. **Prévisualisez** en responsive et testez l’accessibilité
5. **Exportez** en code JSX / HTML / Vue

---

## 📤 Export disponibles

### JSX (React)

```jsx
<form onSubmit={handleSubmit}>
  {/* Composants générés */}
</form>
```

### Vue 3

```vue
<template>
  <form @submit.prevent="handleSubmit">
    <!-- Composants générés -->
  </form>
</template>
```

### HTML

```html
<form action="/submit">
  <!-- Composants générés -->
</form>
```

### JSON

```json
{
  "form": {
    "steps": [...],
    "components": [...]
  }
}
```

---

## 🧱 Composants inclus

### Champs simples

- Texte, Email, Téléphone
- Mot de passe, Nombre
- Date, Textarea
- Select, Radio, Checkbox

### Champs avancés

- Signature électronique
- Notation (1–10 étoiles)
- Géolocalisation GPS
- Date & Heure
- Upload d’image ou fichier
- Sélecteur de pays
- Editeur de texte enrichi (WYSIWYG)
- Curseur de plage, Sélecteur de couleurs

---

## 🎨 Thèmes et animations

### Thèmes intégrés

- Light / Dark
- Glassmorphism
- Neumorphism
- Outline minimal

### Animations

- Bounce, Slide, Fade
- Scale, Pulse, Glow
- Rotate, Flip, Wobble, Elastic

---

## 🔌 Intégrations

### Supabase

```js
const { data, error } = await supabase
  .from('form_submissions')
  .insert([formData]);
```

### À venir :

- Google Sheets
- Webhooks
- Netlify Forms
- Zapier / Make
- Envoi email automatique

---

## ♿ Accessibilité

KauryUI respecte **WCAG 2.1 AA** :

- Support lecteur d’écran (ARIA)
- Navigation clavier complète
- Contraste automatique
- Gestion du focus

---

## 🧠 Auteur

**Théo Blondel**  
👨‍💻 [theoblondel.ch](https://theoblondel.ch)  
🐙 [@theoblondel](https://github.com/theoblondel)

---

## 🧑‍💻 Contribuer

1. Fork le repo  
2. `git checkout -b feature/nouvelle-fonction`  
3. Code & commit  
4. `git push origin feature/nouvelle-fonction`  
5. Ouvre une **Pull Request**

---

## 🔓 Licence

Ce projet est distribué sous licence **MIT**.  
Utilisation libre pour tous, sauf **revente non autorisée**.

---

## 💖 Soutien

KauryUI est gratuit, mais si tu veux soutenir son développement :

👉 [Faire un don](https://buy.stripe.com/5kAaIo03wgAb2S4aEW)  
🙏 Merci !

---

## 🛣️ Roadmap

### 🔜 Version 2.0

- [ ] Constructeur de logique conditionnelle
- [ ] Tableau de bord analytics
- [ ] Collaboration en équipe
- [ ] Constructeur de composants personnalisés
- [ ] Marketplace de templates

### 🧪 Version 2.1+

- [ ] Support Svelte
- [ ] Intégration Next.js
- [ ] Application mobile (React Native)
- [ ] Optimiseur de performances

---

<div align="center">

🔧 Construit avec ❤️ par un nerd discret, pour les devs créatifs.  
🌐 [www.kauryui.org](https://www.kauryui.org) • ✨ [Faire un don](https://buy.stripe.com/5kAaIo03wgAb2S4aEW)

</div>
