function test(req, res, next) {
  console.log("test");
  //   console.log("test");
  if (!req && !res && !next) {
    const currentTimeFormatter = new Intl.DateTimeFormat("en", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
    const currentTime = currentTimeFormatter.format(new Date());
    console.log("(init) request time: ", currentTime);
    return;
  }
  let data = false;

  //check if req referer container @vite
  if (req.headers.referer) {
    if (req.headers.referer.includes("@vite")) {
      data = true;
    } else {
      data = false;
      //   console.log("non vite referer!", req.headers.referer);
    }
  }

  if (data === true) {
    const currentTimeFormatter = new Intl.DateTimeFormat("en", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
    const currentTime = currentTimeFormatter.format(new Date());
    console.log("request time: ", currentTime);
  }
  next();
}

//initialize middleware
test();

export default (req, res, next) => {
  test(req, res, next);
};
