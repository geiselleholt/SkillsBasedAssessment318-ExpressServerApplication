Bug- in villainRoutes. How does it know if the param is the batmanMovieTitle or the villanID?

Requirements checklist:
- ⭕ Create and use at least two pieces of custom middleware
    - error handling middleware
    - app.use(express.json()) to parse JSON data
- ✅ Create and use error-handling middleware
    - modulized error handing middleware in utilities folder and imported throughout project files
- ✅ Use at least three different data categories (e.g., users, posts, or comments)
    - batmanMovies, reviews, villans
- ✅ Utilize reasonable data structuring practices
    - used simple ojects in JSON format for data structures
- ✅ Create GET routes for all data that should be exposed to the client
    - all 3 catagories have get all and get by id
- ✅ Create POST routes for data, as appropriate. At least one data category should allow for client creation via a POST request
- ✅ Create PATCH or PUT routes for data, as appropriate. At least one data category should allow for client manipulation via a PATCH or PUT request
    - all 3 catagories have patch routes by id
- ✅ Create DELETE routes for data, as appropriate. At least one data category should allow for client deletion via a DELETE request
    - all 3 catagories have delete by id
    - villanRoutes has delete all villans by movie title and delete all villans by movie title
- ⭕ Include query parameters for data filtering, where appropriate. At least one data category should allow for additional filtering through the use of query parameters
    - 
- ✅ Note: DO NOT use API keys; this makes it more difficult for instructors to grade finished projects efficiently
- ✅ Utilize route parameters, where appropriate
    - villanRoutes uses /:batmanMovieTitles to get or delete all villans by movies title
- ⭕ Adhere to the guiding principles of REST 
- ⭕ Create and render at least one view using a view template and template engine. This can be a custom template engine or a third-party engine
- ⭕ Create and render at least one view using a view template and template engine. This can be a custom template engine or a third-party engine
- ⭕ Include a form within a rendered view that allows for interaction with your RESTful API
- ✅ Utilize reasonable code organization practices
    - separte folders for data, routes, utilities, and views
- ⭕✅ Ensure that the program runs without errors (comment out things that do not work, and explain your blockers - you can still receive partial credit)
    - all routes work with no errors
    - ⭕ view port runs with no errors
- ✅ Commit frequently to the git repository
    - lots of commits
- ✅ Include a README file that contains a description of your application
- ✅ Level of effort displayed in creativity, presentation, and user experience
    - Batman is cool 🦇🦹😎
BONUS REQUIREMENTS
- ⭕ Include a practical usage of regular expressions within route paths
- ✅ Research and effectively use at least one third-party Node package for practical, sensible purposes
    - chalk for styling console.logs and errors
    