# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

##Para ejecutar con Docker en Windows

En Windows se debe cambiar la configuración de Docker Desktop en Windows:
- Abre Docker Desktop.
- Ve a Settings > General y activa:
- Darle check a "Expose daemon on tcp://localhost:2375 without TLS"
- Aplica los cambios y reinicia Docker.

Luego ejecutar: 
docker-compose build
docker-compose up

En otra terminal ejecutar:
docker exec -it rootnetfrontend-react-native-app-1 sh
npx expo start --tunnel

Al aparecer: Use port 8082 instead? › (Y/n)
Ingresar Y

Pedira instalar  @expo/ngrok@^4.1.0
Ingresar Y

Luego de instalar, se sale de la consola con Ctrl + C
exit


En la terminal donde esta corriendo el contenedor se necesita detener el contendor con:
Ctrl + C

Este proceso se hace la primera vez de ejecutar el docker-compose

Las veces siguientes solo con ejecutar:
docker-compose up
