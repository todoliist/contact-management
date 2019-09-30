# Contact Management

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.8. Make sure you build using the correct CLI version if you were using the global `ng` & reference the right [API version](https://v7.angular.io/api).

## Setup

Clone the repo or fork it into your own account. Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Features

- login page to authenticate the user for further actions. There is be a authentication service to grant/deny the access. 
- Depending on the role of the current logged in user, as user, they can only see the list; as admin, upon clicking of the row/card of the contact, users can see the details of the contact on the right-hand-side, so they can edit, revert & save an existing contact. They can also add a new contact.
- All users can sort/filter/search to locate a contact easily.
- All users are able to logout & be redirected to login.
- The simulation data will not be written, any changes will be reverted on page refresh.
- Session management: for Admin (username: admin, password:123), refresh the page can stay in current page, while for Regular user(username: user, password: pass), refresh the page will redirect user back to login page.
- Simulation data and all required services have been provided as need.
- Given the number of users is fairly large, the grid/list is paged and virtually scrolled.
- Date picker for birthday, dropdown with typeahead support for companies have been applied as part of form component
- Bootstrap & fontawsome styles，pipes，etc. have been applied to optimize the application UI
- Test cases have been created on Contact edit and create component, validation has been unit tested, more components' unit testing will be performed soon. Can Run npm run test:watch to execute the unit tests via Karma.


## Extras

- Form validation has been provided to better data input accuracy
- Basic animation and routing event reaction (e.g.spinner) have been added to improve UX.
- Route resolver is used to produce a clearner visual appearence
- CanDeactivate guard has been implemented to protect edidted but unsaved page
- InMemoryWebApiModule provides an in memory data store and simulates a real REST API back-end.
- Chart in assets folder shows structure of this app; Let viewers get a better understanding