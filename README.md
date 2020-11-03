# MOVIE SERVICE
## Instrucciones
### Instalación del entorno
1. Descargue el proyecto.
2. Importe el fichero movies.postman_collection.json en la apliación Postman.
3. Ejecute el proyecto desde Visual Studio Code escribiendo: nodemod app.js

### Test
1. En la primera ejecución, descomente las líneas para cargar los datos de prueba en la base de datos:
// ldUser.loadUsers().then();
// ldMovie.loadMovies2().then();
2. Pruebe los endpoints incluidos en el archivo de Postman para las distintas entidades:
    - Entidad Usuario:
        - GET Login: ingrese con un email disponible en la base de datos (contraseña y token).
        - GET: muestra una lista de los usuarios de la base de datos.
        - GET + parámetro: muestra el objeto usuario con un parámetro (nombre) dado.
        - PUT: modifica el nombre de un usuario.
        - POST: añade un nuevo usuario en la lista de datos
        - DELETE: elimina un usuario de la base de datos (se debe ser admin).
    - Entidad Pelicula:
        - GET: muestra una lista de las películas de la base de datos.
        - GET + parámetro: muestra los objetos de las películas con parámetros (título, género, director, actores, duración) dados.
        - POST: introduce una película en la base de datos.
    - Entidad Pedido:
        - GET: muestra una lista de los pedidos de la base de datos.
        - POST: introduce un nuevo pedido en la base de datos.
3. Tecnologías utilizadas:
    - ES6
    - NodeJs
    - Express
    - API
    - Postman
    - Mongoose
    - JSON

## Intructions
### Set up
1. Download the project.
2. Import movies.postman_collection.json file into POSTMAN.
3. Run the project by typing: nodemod app.js

### Test