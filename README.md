### UWAGI:

# Foldery i nazwy plików

- Na komponenty stwórz folder components
- Wszystkie foldery nazywaj z duej litery (tak jak komponenty w nich)
- Z foldaru main wyciągnij plik `App.jsx` i `App.scss` i przenieś do folderu `src`
- Na pliki z Contextem stwórz osobny folder, np. Contexts lub Store i tam przenieś plik z Contextem
- Zmień nazwę pliku z contextem na np. `TodoListContext`, bo tam trzymasz akcje strikte dla TodoListy
- Nie dodawaj spacji pomiędzy importami w plikach. Najlepiej dodaj do projektu prettiera, wtedy sam po savie będzie Ci formatował pliki.

# Style

- Jest to mała apka, więc nie będzie problemu z nazwami klas, ale jak projekt miałby się powiększać to warto ju teraz pomyśleć o zastosowaniu scss modules lub styled components

# AppContext.jsx

- w `case ADD` zrób sprawdzenie czy istnieje `action.newTask`, eby nie dodawać `undefined` do tablicy
- w linii 45 zle nazwałeś funkcje, bo ty nie dostajesz z niej `id` jak wskazuje nazwa, tylko ustawiasz `id`. Zmień na np. `setEditedTaskId` czy coś w tym stylu co bardziej odda jej zadanie.
- Ja bym zmienił logike tak ze zamiast trzymania w kotekscie samego `id` wrzucć tam juz cały obiekt taska, tak zeby pozniej w modalu juz nie szukac w state za kazdym razem tego taska po `id`, tylko od razu masz go dostepnego i nie musisz kilka razy mapować.

### Ogólnie bardzo fajnie zrobione! Duzy plus za uzycie Context API :)

Tylko tak jak juz Ci ostatnio wspominalem od strony UI/UX zmien sposob edytowania taksow, tak zeby mozna je bylo edytowac bezposrednio na liscie.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
