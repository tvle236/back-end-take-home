# Running the application

1. Install node.JS version 10.15.x
2. Install the node packages via `npm install`
3. Set the environment variable via `export NODE_ENV="production"`. If you are having troubling setting the environment variable, make changes to `src/repos/index.ts` to point to `"full"` instead of `"test" at line 8`
4. Build the server via `npm run build`
5. Run the server via `npm start`
6. Make GET requests via `http://localhost:8080/search-route?origin=XXX&destination=YYY`

Alternatively, you can try out the [project here](https://guestlogix-takehome.herokuapp.com/search-route?origin=XXX&destination=YYY)
