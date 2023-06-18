# Challenge Simulación check-in Aerolínea

Bienvenidos! Aqui una breve descripcion del backend de mi app

## Ejecución de la API

### Ejecución local

Si deseas ejecutar la API de manera local, sigue estos pasos:

1. Descarga el repositorio del proyecto.
2. Instala las dependencias de desarrollo y genera la carpeta BUILD ejecutando el siguiente comando:

```bash
  npm install && tsc
  
```
```bash
  npm run start
```
3. Una vez completada la instalación y generación de la carpeta BUILD, inicia el servidor local ejecutando el siguiente comando:


4. La API se iniciará en el puerto 3030 de tu máquina local.

### Despliegue en Render

La API también está disponible en Render. Puedes acceder a ella mediante la siguiente URL: [https://api-airlines.onrender.com/flights/27/passengers](https://api-airlines.onrender.com/flights/27/passengers)

    
## Explicacion de la solucion

#### Primera etapa: Conexion

Primero configurar el entorno de desarrollo, previamente tenia un modelo propio de este, solo tuve que establecer la configuracion de mi ORM.

Decidi usar una arquitectura de capas donde tenemos Router, Controller y Services.

Luego de esto realice llamadas a la DB para poder obtener informacion sobre el boleto de avion (purchaseData) e implementando el uso de interfaces para validar que los tipos de datos recibidos son los esperados.

#### Segunda etapa: Vuelo y Pasajeros

Para recibir la informacion de los vuelos era cuestion de solicitar en la tabla flight sobre el vuelo en especifico relacionado (flight_id) al boleto de avion.
Al igual que la informacion de cada vuelo, los pasajeros era cuestion de consultar en la base de datos, el problema era anidar esa informacion como un array de 'passengers' dentro de "data". 
Para esto se debia estructurar los detalles de vuelo y dentro de ellos un array de 'passengers'

#### Una importante herramienta: snakeToCamel

Uno de los puntos del desafio era devolver todos los campos con la tipografia 'camelCase', para evitar tener que crear nuevos campos y rellenar con los datos en cada llamado a la API pensé que la mejor solucion era tener un modulo que se encargara de esto por mi.

#### Tercera etapa: Asientos y Asignacion

Para poder asignar los asientos a cada pasajero era importante conocer que asientos estan disponibles y cuales son. Para esto la funcion 'getSeatsData' solicitaba a la tabla "seat" el listado total de asientos de un avion, incluyendo un campo muy importante para esto. El boarding_pass, ya que con este podiamos diferenciar asientos libres de ocupados.

A la hora de asignar asientos teniamos dos casos, aquellos grupo de pasajeros en los cuales todos los 'seatId' eran nulos, y en los que habia por lo menos un asiento. (Ambas buscan asientos segun el seatTypeId de cada grupo)
Para estos ultimos tenemos una funcion unica ('findAdjacentSeatsBySeatId') la cual apartir de ese asiento encuentra asientos libres adyacentes en un rango de 4X4
Luego la funcion para el otro caso es findAdjacentSeatSForGroup buscaba en un radio de 4X4 asientos adyacentes y libres para el grupo de pasajeros, en caso de no haber dicha cantidad pasaba al siguiente asiento y realizaba la misma busqueda.

Aclaracion: Si ejecutamos las mismas funciones con el mismo grupo devolvera diferentes asientos pero todos lo mas cercano posible.



## Algunas tecnologias usadas son:

1) Typescript: Este lenguaje es el superset mas popular para JavaScript. Ademas de permitir detectar y corregir errores durante la compilacion el uso de interfaces y clases me ayudó mucho a controlar mi codigo y mantener un clean code.

2) Prisma: Un ORM que facilita la interaccion con bases de datos, generar modelos automaticos y proporcionar mayor informacion acerca de errores.

3) Babel: Babel permite utilizar características de JavaScript que aún no son compatibles en todos los navegadores o entornos de ejecución, al compilar y transformar el código a una versión compatible

4) ESLint: ESLint permite definir reglas personalizadas y verificar el cumplimiento de las mejores prácticas de codificación. Ayuda a mantener un código limpio, consistente y libre de errores.

5) Prettier: Automatiza el formateo del código según las reglas predefinidas, lo que facilita el trabajo colaborativo y mejora la legibilidad del código

6) Nodemon: Una herramienta que supervisa los cambios en los archivos y reinicia automáticamente el servidor en desarrollo. Es especialmente útil durante el desarrollo para agilizar el ciclo de desarrollo y evitar tener que reiniciar manualmente el servidor cada vez que se realizan cambios



## Planteamiento inicial y cambio de diseño 

En mis commits podran ver algunos que tratan sobre un modelo de avion y su interfaz.
Mi primera idea era mantener un codigo reutilizable usando un modelado de avion mediante matrices y objetos. Asi si uno quiere eliminar, editar o agregar un avion nuevo solo bastaba con consultar en el archivo airplaneModels.

¿El problema? Poder generar e iterar correctamente sobre cada avion, asi llenar cada asiento de la informacion que le corresponde y asignar pasajeros a ellos. Me costó mucho implementar un metodo logico para lograr esto, y sobre todo no tener saltos de asientos muy bruscos ya que habia casos donde los asientos que deberian ser asignados quedaban muy lejos unos de otros.

Sigo pensando que este planteamiento puede llegar a ser mas escalable y reutilizable para una aerolinea de verdad, pero que requiere mucho trabajo, prueba y error.
