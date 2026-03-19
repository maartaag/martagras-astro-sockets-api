# Whatsapp

Aquest projecte és una aplicació de xat en temps real feta amb **Node.js + Express + Socket.IO** la part de servidor i **Astro** per al client.

Permet:

- Connectar-se amb un nom d’usuari.
- Veure en temps real quins usuaris estan connectats.
- Enviar i rebre missatges en temps real.
- Veure quan un usuari està escrivint.
- Detectar desconnexions i actualitzar la llista d’usuaris automàticament.

---

## 📂 URL contingut

- **Servidor**: [\[URL del repositori del servidor\]](http://localhost:3000)
- **Client**: [\[URL del repositori del client\]](http://localhost:4321/)

---

## ⚙️ Instruccions per executar el servidor i client

1. Clona el repositori del servidor i client:

- Servidor: https://github.com/maartaag/martagras-astro-sockets-api.git
- Client: https://github.com/maartaag/martagras-astro-sockets.git

2. Executa les comandes en la carpeta del servidor on esta src, public,...

```bash
npm install
npm run dev
```

## Problemes trobats i solucions

1. Usuari esta escrivint
   Al escriure un usuari, per cada tecla premuda s'enviava un missatge que esta escrivint.
   Ara he fet que quan escriu canvia un petit text sobre del input i quan para d'escriure (no prems tecles) s'espera 1s i envia que has parat d'escriure i el petit text es torna blanc.

2. Disconnect multiple
   Al desconectarse un usuari enviava el missatge 3 vegades, això és perquè es fa run al script quan es crea un component. Per això només ho ensenyo quan aquest disconnect té assignat un nopm (un if si el nom no es null)

3. Obligatori posar nom
   Perque sigui obligatori posar nom surt un form i la resta no es clickable. És el primer que apareix. Quan poses nom i envies, s'actualitza al server i es deiza de veure el form.

4. Usaris connectats
   Quan demanava veure els usuaris connectats, veia els actuals pero també els de fa dies conectats. Per això he creat dues llistes al server, una de currentUsers i l'altre la llista de persones la qual té l'històric.
