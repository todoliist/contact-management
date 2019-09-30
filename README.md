# Contact Management

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.8. Make sure you build using the correct CLI version if you were using the global `ng` & reference the right [API version](https://v7.angular.io/api).

## Setup

Clone the repo or fork it into your own account. Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Features

- login page to authenticate the user for further actions. There is be a simulated authentication service to grant/deny the access. 
- Session management: for Admin (username: admin, password:123), refresh the page can stay in current page, while for Regular user(username: user, password: pass), refresh the page will redirect user back to login page.
- Simulation data has been provided, CmContactService will provide it.
- Users should be able to search, edit, delete, revert & save an existing contact, or add a new contact.
- Date picker for birthday, dropdown with typeahead support for companies have been applied as part of form component
- Some bootstrap & fontawsome, pagination， pipes，etc. have been applied to optimize the application UI
- Route resolver was used to provide a clearner visual appearence
- Simple animations and routing events reactions has been added as well.
- Route guard: CanDeactivate has been implemented to protect admin's edidted page before navigating to other page
- Test cases have been created on Contact-edit component, validation has been unit tested, more components' unit testing will be performed soon. Can Run ng test to execute the unit tests via Karma.
- InMemoryWebApiModule was used to provides an in memory data store where you can create and fetch data and simulates a real REST API back-end.
