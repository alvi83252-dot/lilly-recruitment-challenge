# Lilly Technical Challenge - Documentation

## Approach
My approach towards this challenge was to build a project in a structured, step-by-step way.
I had began by creating a step-by-step guide and confirmed it with using AI to see if all steps were accounted for. I then began setting up the FastAPI backend, because having working endpoints first makes it easier to build and test the frontend afterward.

I next connected the front-end to the back-end using 'fetch()' and displayed the /medicines endpoints dynamically on the page. Once the data displayed correctly, I improved the UI design, added responsiveness, and implemented form-based CRUD functions (Create/Read/Update/Delete).

Throughout the process, I used documentation from FastAPI, MDN Web Docs, and general CSS grid references. However, all functionality and design were done manually by me without copying from any templates.

I continuously kept track of my website by testing each step as I built it to ensure the system was stable before moving on.

## Objectives - Innovative Solutions
----Full CRUD Functionality CRUD endpoints:
- GET /medicines
- GET /medicines/{name}
- POST /create
- POST /update
- DELETE /delete
The backend uses JSON file (data.json) to simulate a database.
Each endpoint correctly updates the file and returns useful feedback messages.

----Fully Functional Front-End Connected To Backend
I created a responsive interface that:
- Display all medicines in attractive cards
- Highlights invalid data (e.g. missing name or price)
- Updates automatically after CRUD operations
- Fetches live data from the backend

----Data Validation (Front-End + Display Cleaning)
I implemented strict validation:
- Medicine names must be 2-50 characters, letters, numbers, and spaces only
- Prices must be positive numbers
I also wrote a custom function that cleans back-end data before displaying:
- Missing or invalid names become "Unknown Medicine"
- Missing prices become "Price not available"
- Cards with issues get a yellow warning highlight
This was an innovative way to make the UI more user-friendly even when back-end data isn't clean

----Bonus Feature - Average Price Endpoint
I added:
- A new back-end route: GET /average-price
- Automatic recalculation based on current JSON data
This proves that the system stays updated even as medicines are created, updated, or deleted

----Fully Responsive UI + Custom Styling
I built a modern UI with:
- CSS grid
- Hover animatiom
- Color-coded warning cards
- Mobile/tablets/desktop responsive breakpoints
- Styled form components for CRUD actions
This made the project visually appealing and highly usable for users.


## Problems Faced
----Fetch Errors ("Error Loading Medicine")
At first, the front-end failed because I mistakenly wrote:
- JS: mixmax() instead of minmax() - This was a typo and had messed up the operation, such as not loading the data
- I had wrote filter instead of map, which did not allow the medicines to load in JS.

----Validation Not Worked For Names
Initially, I could still submit gibberish or invalid names.
I solved this by adding a strict regex:
-/^[a-zA-Z0-9 ]{2,50}$/ ---- now only clean names can be accepted

----Front-End Not Showing Medicines
This happened because i forgot to create:
- <div id="medicinesList"></div> ---- after adding it, the cards displayed correctly

----Back-End Average Price Not Showing
I learned that to test a specific endpoint, I had to manually type the URL into the browser:
-http://localhost:8000/average-price ---- This confirmed the endpoint worked correctly

----CORS Issues
The browser blocked requests until I added:
-CORSMiddleware ---- This allowed the front-end and back-end to communicate 


## Evaluation
Overall, I enjoyed the challenge and fekt that it had balanced design, back-end logic, and problem-solving very well. Completing CRUD, validation, data cleaning, and a bonus endpoint gave me a strong understanding of the entire workflow between the front-end and back-end.

Some parts took longer than expected, especially debugging why data wasn't showing and adding validation rules. If I had more time, I would expand the project further with:
- Pagination (Dividing large document or set of results into discrete, numbered pages for easier viewing and navigation)
- Async JSON read/write for performance
- A more sophisticated database such as SQLite or PostgreSQL
- A fully polished UI theme with animations

Overall, this challenge improved my confidence and reinforced my problem-solving mindset in building a complete full-stack project from scratch.

## Bonus - Extra Features Implemented
These are the additonal functionalities that I had implemented while working on the project:
- Data Cleaning System (fixes invalid back-end values before display)
- Visual warnings for corrupted data
- Strict name + Price validation
- Fully responsive card layout
- Hover animations / UI polish
- Front-end forms controlling the back-end CRUD
- Bonus endpoints: /average-price
- Live data refresh after every action
These features strengthen both usability and data integrity
