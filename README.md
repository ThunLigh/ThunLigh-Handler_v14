# 🤖 Discord bot Handler - v14 / MongoDB🤖

***Si usas el handler y tienes dudas sobre su uso o errores, únete al servidor de [soporte](https://discord.gg/4ZrXpYwT3Q) y te ayudaremos.***
<br>

<a href="https://discord.gg/sJ5ChUH9We" style="background-color: purple; color: white; font-weight: bold;padding: 8px;border-radius: 5px">Handler creado por ThunLigh</a>

# 📖 Guía de instalación

## ✅ Requisitos
- Tener instalado [NodeJS](https://nodejs.org/es) 18 o superior.
- Un [cluster de MongoDB](https://www.mongodb.com/es/cloud/atlas/) para la base de datos.
- Se recomienda hostearlo en un VPS o hosting para bots de discord, esto para no tener que depender de que tu pc esté encendida 24/7.

## ⚙️ Configuración
1. `Linea #1` Introducir el [token](https://discord.com/developers/applications) de tu bot en el archivo `.env`.
2. `Linea #2` Colocar la URL del [cluster de MongoDB](https://www.mongodb.com/es/cloud/atlas/).

> ***El archivo `example.env` debe ser renombrado a `.env` y luego aplicar la configuración y recuerda que no debes de compartir el contenido de tu `.env`***

```
TOKEN = "TOKEN-BOT"
MONGO_URL = "MONGO-URL"

STATUS = "dsc.gg/thunlighdev"
STATUS_TYPE = "Watching"
CLIENT_ID = "CLIENT-ID"
OWNER_IDS = "OWNER-IDS"
```

## Creación de comandos

### 📏 Comandos Slash
> ***En el contenido de `/src/commands`, podrás encontrar algunas categorías ya creadas, si deseas crear otra categoría simplemente crea una carpeta dentro de `/src/commands`***.

#### 📋 Por ejemplo:
> `/src/commands/prueba`


> ***Para crear comandos dentro de una categoría, tendrás que crear un archivo con el nombre del comando con formato `.js`.***

#### 📋 Por ejemplo:

> `/src/commands/prueba/ping.js`

A continuación te muestro la estructura de la creación del comando slash

```js
const { SlashCommandBuilder } = require('discord.js')
const Discord = require("discord.js");
const emj = require("../../botconfig/emojis.json");
const emb = require("../../botconfig/embed.json");

module.exports = {
    cmd: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Muestra el ping del bot'),

    async execute(client, interaction) {
        await interaction.reply(`**🏓 Pong!** ${client.ws.ping}ms`)
    }
}
```

## ❤️ ¿Que te parece?
***Gracias por usar este código! Puedes dejar tu reseña del handler en nuestro [servidor de soporte](https://discord.gg/4ZrXpYwT3Q).***

#🇪🇸 © [2023] ThunLigh

Este contenido está disponible públicamente bajo la autoría de ThunLigh. Si bien puedes usar, modificar y distribuir este contenido libremente, te pedimos que reconozcas a ThunLigh como el autor original. 

Aunque no es necesario obtener permiso para utilizar este contenido con fines no comerciales, te agradecemos que atribuyas apropiadamente a ThunLigh y enlaces a la fuente original.

Si deseas utilizar este contenido con fines comerciales o tienes alguna otra consulta relacionada con los derechos de autor, por favor, contacta a: https://discord.gg/4ZrXpYwT3Q

ThunLigh agradece tu respeto a su trabajo creativo y espera que este contenido sea útil para tus proyectos y necesidades.

#🇺🇸 © [2023] ThunLigh

This content is publicly available under the authorship of ThunLigh. While you are free to use, modify and distribute this content, we ask that you acknowledge ThunLigh as the original author.

Although you do not need to obtain permission to use this content for non-commercial purposes, we appreciate proper attribution to ThunLigh and links to the original source.

If you wish to use this content for commercial purposes or have any other copyright related queries, please contact: https://discord.gg/4ZrXpYwT3Q

ThunLigh appreciates your respect for their creative work and hopes that this content is useful for your projects and needs.

<div align="center">
 <a href="https://www.mongodb.com/es/atlas/database" target="_blank"><img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white"></a>
 <a href="https://www.nodejs.org" target="_blank"><img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white"></a>
  <a href="https://discord.gg/4ZrXpYwT3Q" target="_blank"><img src="https://img.shields.io/badge/discord-5865F2?style=for-the-badge&logo=discord&logoColor=white"></a>
</div>
