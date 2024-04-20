const myPlugin = {
  name: "my-plugin",

  // setup(build) {
  //   // Define plugin behavior here
  //   console.log("Hi");
  //   console.log(build);
  // },
  setup(build) {
    console.log("-----------------------");
    // Run the callback on startup
    // build.onStart && build.onStart();

    // Register a callback for file change events
    // build.onEnd(() => {
    //   build.onChange && build.onChange();
    // });
  },
};

module.exports = myPlugin;
