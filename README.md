# DJS05 Project: Building a Redux-Inspired ```Store``` for a Tally App

## Project Brief 

### Overview

This is a generic state ```Store``` for a functional programming approach. It keeps track of changes to application state, dispatches modification functions, notifies interested observers and allows naviagtion through state history.


### Using this Library

The user of this library must define their application ```State``` object, its required properties, as well as any functions that modifies its properties called a ```Dispatcher``` function. The ```State``` object may be a basic ```Object``` object, or any user-defined object that has ```Object``` in its prototype chain.

Though not enforced, it is advised to not remove or add properties to these ```State``` objects dynamically through ```Dispatcher``` functions, but define all its properties statically from the start (even if set to ```null``` or ```undefined```). This approach makes it easier to anticipate state changes and follow program logic.
It allows ```Subscribers``` to "know" properties are present without having to run the standard ```Object.prototype.hasOwn``` method to check.

### Store Initialization

A ```Store``` is created via the ```createStore``` factory function, by passing to it the initial user-defined ```State``` object. It is recommended to have only one ```Store``` object per application.


### Modifying State

A ```Dispatcher``` is a function that modifies the properties of the ```State``` object in some way. The user is responsible for defining these functions.

```Dispatcher``` functions are passed to the ```Store``` through its ```dispatch``` method, and must accept only a ```State``` object as its parameter, and must return a new ```State``` object. Any additional parameters the function needs can be bound to it via the ```Function.prototype.bind``` method before being passed to ```dispatch```.

Note that the passed ```State``` object is always immutable. It should be cloned verbatim into a new Object, and only then modify what properties it needs to change before returning the new ```State``` object.


### Observing State Changes

Changes to the ```State``` object is observed through registering a ```Subscriber``` callback function with the ```Store``` via its ```subscribe``` method. When ```dispatch``` is called, the ```Store``` will run the ```Subscriber``` callback function, and pass to it the new ```State``` that is returned by the ```Dispatcher``` as the first parameter, and the previous ```State``` as the second parameter.

Passing the ```Subscriber``` to the ```unsubscribe``` method will remove it. It will return ```true``` if succesfully removed, and ```false``` if the ```Subscriber``` is not recognized. 

The ```subscribe``` method returns a callback that is the ```unsubscribe``` method with the ```Subscriber``` bound to it. This is useful for removing anonymous ```Subscribers``` with no other reference point in the program.


### Navigating State History

Two methods on the ```Store``` object exist to navigate through its ```State``` history: ```rewind```, to move backwards, and ```forward```, to move forwards. This is essentially a simulation of the browser's back and forward functions, without having to navigate away from the page.

On such navigation, ```Subscribers``` are notified of the "state update" as if the ```dispatch``` method was called, and the current ```State``` is set to this "point in time".

If a ```dispatch``` is called while the user has navigated away from the most recent ```State``` update (defined as the last time ```dispatch``` was called), all ```State``` objects forward from the current ```State``` is discarded. Then the current ```State``` will be passed to the ```Dispatcher```, effectively overwriting the ```State``` history.