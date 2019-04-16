(function(global, $) {
  // 'new' an object
  let Greetr = function(firstname, lastname, language) {
    return new Greetr.init(firstname, lastname, language);
  };

  // hidden within the scope of the IIFE and never directly accessible
  let supportedLangs = ["en", "es"];

  // informal greetings
  let greetings = {
    en: "Hello",
    es: "Holla"
  };

  // formal greetings
  let formalGreetings = {
    en: "Greetings",
    es: "Saludos"
  };

  // logger messages
  let logMessage = {
    en: "Logged in",
    es: "Inicion sesion"
  };

  // prototype holds methods (to save memory space)
  Greetr.prototype = {
    // 'this' refers to the calling object at execution time
    fullName: function() {
      return this.firstname + " " + this.lastname;
    },

    validate: function() {
      // check that is a valid language
      // references the externally inaccessible 'supportedLangs' within the closure
      if (supportedLangs.indexOf(this.language) === -1) {
        throw "Invalid language";
      }
    },

    // retrieve messages from object by referring to properties using [] syntax
    greeting: function() {
      return greetings[this.language] + " " + this.firstname + "!";
    },

    formalGreeting: function() {
      return formalGreetings[this.language] + " " + this.fullName();
    },

    // chainable methods return their own containing object
    greet: function(formal) {
      let msg;

      // if undefined or null it will be coerced to 'false'
      if (formal) {
        msg = this.formalGreeting();
      } else {
        msg = this.greeting();
      }

      if (console) {
        console.log(msg);
      }

      // 'this' refers to the calling object at execution time
      // makes the method chainable
      return this;
    },

    log: function() {
      if (console) {
        console.log(logMessage[this.language] + ": " + this.fullName());
      }

      return this;
    },

    setLang: function(lang) {
      this.language = lang;

      this.validate();

      return this;
    },

    HTMLGreeting: function(selector, formal) {
      if (!$) {
        throw "jQuery not loaded";
      }
      if (!selector) {
        throw "Missing jQuery selestor";
      }

      // determine the message
      let msg;
      if (formal) {
        msg = this.formalGreeting();
      } else {
        msg = this.greeting();
      }

      // inject the message in the chosen place in the DOM
      $(selector).html(msg);

      return this;
    }
  };

  // the actual object is created here, allowing us to 'new' an object without calling 'new'
  Greetr.init = function(firstname, lastname, language) {
    let self = this;

    self.firstname = firstname || "";
    self.lastname = lastname || "";
    self.language = language || "en";

    self.validate();
  };

  // trick borrowed from jQuery so we don't have to use the 'new' keyword
  Greetr.init.prototype = Greetr.prototype;

  // attach our Greetr to the global object, and provide a shorthand '$G' for ease our poor fingers
  global.Greetr = global.G$ = Greetr;
})(window, jQuery);
