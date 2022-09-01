# Proyecto Express y NodeJS

## **Diagrama Entidad-Relacion**

![](spotify.png)

&nbsp;

## **Tablas REST**

1. ### **Auth**
   |     url     | método |       body        |        descripcion         |
   | :---------: | :----: | :---------------: | :------------------------: |
   | /api/signup |  POST  |      {user}       | Registrar un nuevo usuario |
   | /api/login  |  POST  | {email, password} |        Hacer login         |

&nbsp;

2. ### **Users**
   |      url       | método |       headers        |  body  |        descripcion         |
   | :------------: | :----: | :------------------: | :----: | :------------------------: |
   |   /api/users   |  GET   | x-auth-token (admin) |   -    | Obtener todos los usuarios |
   | /api/users/:id |  GET   |     x-auth-token     |   -    |   Obtener usuario por ID   |
   | /api/users/:id |  PUT   |     x-auth-token     | {user} |     Actualizar por ID      |
   | api/users/:id  | DELETE | x-auth-token (admin) |   -    |       Borrar por ID        |

&nbsp;

3. ### **Playlists**

   |            url             | método |   headers    |         body         |            descripcion             |
   | :------------------------: | :----: | :----------: | :------------------: | :--------------------------------: |
   |    /api/playlists/:user    |  POST  | x-auth-token |      {playlist}      |           Crear playlist           |
   |       /api/playlists       |  GET   | x-auth-token |          -           |    Obtener todas las playlists     |
   |     /api/playlists/:id     |  GET   | x-auth-token |          -           |      Obtener playlist por ID       |
   |  /api/playlists/:user/fav  |  GET   | x-auth-token |          -           | Obtener playlist por ID de usuario |
   |  /api/playlists/:user/:id  |  PUT   | x-auth-token |      {playlist}      |     Actualizar playlist por ID     |
   |     api/playlists/:id      | DELETE | x-auth-token |          -           |           Borrar por ID            |
   |  /api/playlists/add-song   |  PUT   | x-auth-token | {songID, playlistID} |     Añadir cancion a playlist      |
   | /api/playlists/remove-song |  PUT   | x-auth-token | {songID, playlistID} |  Eliminar cancion de la playlist   |
   |   /api/playlists/random    |  GET   | x-auth-token |          -           |  Obtener 10 playlists aleatorias   |

&nbsp;

4. ### **Songs**
   |            url            | método |       headers        |  body  |         descripcion         |
   | :-----------------------: | :----: | :------------------: | :----: | :-------------------------: |
   |        /api/songs         |  POST  | x-auth-token (admin) | {song} |    Añadir nueva cancion     |
   |        /api/songs         |  GET   |     x-auth-token     |   -    | Obtener todas las canciones |
   |      /api/songs/:id       |  GET   |     x-auth-token     |   -    |   Obtener cancion por ID    |
   |      /api/songs/:id       |  PUT   | x-auth-token (admin) | {song} |  Actualizar cancion por ID  |
   |       api/songs/:id       | DELETE | x-auth-token (admin) |   -    |        Borrar por ID        |
   |   api/songs/:user/liked   |  GET   |     x-auth-token     |   -    |   Obtener todas las likes   |
   | api/songs/:user/liked/:id |  PUT   |     x-auth-token     |   -    |       Like / Dislike        |

&nbsp;

5. ### **Search**
   |                url                 | método |   headers    | body |             descripcion              |
   | :--------------------------------: | :----: | :----------: | :--: | :----------------------------------: |
   | /api/search?query=&lt;busqueda&gt; |  GET   | x-auth-token |  -   | Buscar cancion / playlist por nombre |
